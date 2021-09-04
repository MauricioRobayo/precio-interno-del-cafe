import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";
import { RefPriceStorage } from "./models/RefPriceStorage";
import * as parser from "./parsers"

export async function IcpParser(pdfPath: string): Promise<RefPriceStorage> {
    const content = await getContent(pdfPath);
    return {
      cities: parser.citiesRefPrice(content),
      cupDiscount: "" as any,
      external: parser.externalRefPrice(content),
      internal: parser.internalRefPrice(content),
      lowQualityPerPoint: parser.lowQualityRefPricePerPoint(content)
    }
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
}
