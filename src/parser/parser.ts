import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";
import { RefPriceStorage } from "../models/ref-price";
import {
  citiesParser,
  cupDiscountParser,
  dateParser,
  externalParser,
  internalParser,
} from "./parsers";

export async function parser(
  pdfPath: string
): Promise<RefPriceStorage["refPrice"]> {
  const content = await getContent(pdfPath);
  return {
    date: dateParser(content),
    cities: citiesParser(content),
    cupDiscount: cupDiscountParser(content),
    external: externalParser(content),
    internal: internalParser(content),
  };
}

export async function getContent(pdfPath: string): Promise<string> {
  const arraybuffer = await fs.readFile(pdfPath);

  const pdf = getDocument(arraybuffer);
  const doc = await pdf.promise;

  const pageNumbers = Array.from({ length: 2 }, (_, i) => i + 1);
  const contentsPromises = pageNumbers.map(async (pageNumber) => {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    return content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join("");
  });

  const contents = await Promise.all(contentsPromises);
  return contents.join("").replace(/\s+/g, " ");
}
