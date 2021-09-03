import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";
import {
  getLowQualityRefPrice,
  getPremiumRefPrice,
  getCitiesRefPrice,
  RefPriceParser,
} from "./parsers";

export class IcpParser {
  async parse(
    pdfPath: string,
    parsers: RefPriceParser[]
  ): Promise<Record<string, number | Record<string, number>>> {
    const content = await IcpParser.getContent(pdfPath);
    console.log(content);

    return Object.fromEntries(
      parsers.map((parser) => {
        const [key, value] = parser(content);
        return [key, Array.isArray(value) ? Object.fromEntries(value) : value];
      })
    );
  }

  static async getContent(pdfPath: string): Promise<string> {
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
    return contents.join("");
  }
}

const parser = new IcpParser();

const parsers = [getLowQualityRefPrice, getPremiumRefPrice, getCitiesRefPrice];
parser.parse("./pdf.pdf", parsers).then((json) => console.log(json));
