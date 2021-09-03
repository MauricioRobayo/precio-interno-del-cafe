import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";
import slugify from "slugify";

type RefPrice = [string, number];
type RefPriceParser = (content: string) => RefPrice | [string, RefPrice[]];

const getPremiumRefPrice: RefPriceParser = (content: string): RefPrice => {
  const premiumRefPriceRegExp =
    /Precio\s+total\s+por\s+carga.*?(\d{0,3},?\d{3},\d{3})/;
  const premiumRefPriceMatch = content.match(premiumRefPriceRegExp);

  if (!premiumRefPriceMatch) {
    console.log("Could not find precio total por carga!");
    process.exit(1);
  }

  return ["premium", Number(premiumRefPriceMatch[1].replace(/,/g, ""))];
};

const getLowQualityRefPrice: RefPriceParser = (content: string): RefPrice => {
  const lowQualityRefPriceRegExp =
    /Precio\s+total\s+de\s+pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/;
  const lowQualityRefPriceMatch = content.match(lowQualityRefPriceRegExp);
  if (!lowQualityRefPriceMatch) {
    console.log("Could not find precio total de pasilla!");
    process.exit(1);
  }
  return ["lowQuality", Number(lowQualityRefPriceMatch[1].replace(/,/g, ""))];
};

const getCitiesRefPrice: RefPriceParser = (
  content: string
): [string, RefPrice[]] => {
  const refPriceByCityMatch = content.matchAll(
    /(armenia|bogot[aá]|bucaramanga|buga|chinchin[aá]|c[uú]cuta|igagu[eé]|manizales|medell[ií]n|neiva|pamplona|pasto|pereira|popay[aá]n|santa marta|valledupar)\s+?(\d{0,3}[,.]?\d{3}[,.]\d{3})/gi
  );

  const refPriceByCity: RefPrice[] = [...refPriceByCityMatch].map((match) => {
    const refPrice = Number(match[2].replace(/,/g, ""));
    const cityName = slugify(match[1], { lower: true });
    if (Number.isNaN(refPrice)) {
      throw new Error(
        `IcpParser.getRefPriceByCity: could not parse refPrice '${match[2]}' for city '${match[1]}'`
      );
    }

    return [cityName, refPrice];
  });
  return ["cities", refPriceByCity];
};

export class IcpParser {
  async parse(
    pdfPath: string,
    parsers: RefPriceParser[]
  ): Promise<Record<string, number | Record<string, number>>> {
    const content = await IcpParser.getContent(pdfPath);

    return Object.fromEntries(
      parsers.map((parser) => {
        const [key, value] = parser(content);
        return [key, Array.isArray(value) ? Object.fromEntries(value) : value];
      })
    );
  }

  static async getContent(pdfPath: string): Promise<string> {
    const arraybuffer = await fs.readFile(pdfPath);

    try {
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
    } catch (err) {
      console.log("IcpParser.getContent error", err);
      process.exit(1);
    }
  }
}

const parser = new IcpParser();

const parsers = [getLowQualityRefPrice, getPremiumRefPrice, getCitiesRefPrice];
parser.parse("./pdf.pdf", parsers).then((json) => console.log(json));
