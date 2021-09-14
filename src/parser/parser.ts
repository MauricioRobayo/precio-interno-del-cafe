import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";
import { RefPriceStorage } from "../models/ref-price-model";
import {
  citiesParser,
  cupDiscountParser,
  dateParser,
  externalParser,
  internalParser,
} from "./parsers";
import { PDFDocumentProxy } from "pdfjs-dist/types/display/api";
import { Metadata } from "pdfjs-dist/types/display/metadata";

export async function parser(
  pdfPath: string
): Promise<{ metadata: Metadata; parsedContent: RefPriceStorage["refPrice"] }> {
  const pdfDocumentProxy = await getPdfDocumentProxy(pdfPath);
  const { metadata, info } = await getMetadata(pdfDocumentProxy);
  console.log({ metadata, info });
  const content = await getContent(pdfDocumentProxy);
  return {
    metadata,
    parsedContent: {
      date: dateParser(content),
      cities: citiesParser(content),
      cupDiscount: cupDiscountParser(content),
      external: externalParser(content),
      internal: internalParser(content),
    },
  };
}

export async function getContent(
  pdfDocumentProxy: PDFDocumentProxy
): Promise<string> {
  const pageNumbers = Array.from({ length: 2 }, (_, i) => i + 1);
  const contentsPromises = pageNumbers.map(async (pageNumber) => {
    const page = await pdfDocumentProxy.getPage(pageNumber);
    const content = await page.getTextContent();
    return content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join("");
  });

  const contents = await Promise.all(contentsPromises);
  return contents.join("").replace(/\s+/g, " ");
}

function getMetadata(pdfDocumentProxy: PDFDocumentProxy) {
  return pdfDocumentProxy.getMetadata();
}

async function getPdfDocumentProxy(pdfPath: string): Promise<PDFDocumentProxy> {
  const arraybuffer = await fs.readFile(pdfPath);

  const pdf = getDocument(arraybuffer);
  return pdf.promise;
}
