import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";

async function getPdfContent(arraybuffer: Buffer): Promise<string> {
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
    console.log("parse error", err);
    process.exit(1);
  }
}

function contentToJson(content: string) {
  const premiumRefPriceRegExp =
    /Precio\s+total\s+por\s+carga.*?(\d{0,3}[,.]?\d{3}[,.]\d{3})/;
  const lowQualityRefPriceRegExp =
    /Precio\s+total\s+de\s+pasilla.*?(\d{0,3}[,.]?\d{0,3}[,.]?\d{3})/;
  const refPriceByCityRegExp =
    /(armenia|bogot[aá]|bucaramanga|buga|chinchin[aá]|c[uú]cuta|igagu[eé]|manizales|medell[ií]n|neiva|pamplona|pasto|pereira|popay[aá]n|santa marta|valledupar)\s+(\d{0,3}[,.]?\d{3}[,.]\d{3})/gi;

  const premiumRefPriceMatch = content.match(premiumRefPriceRegExp);
  const lowQualityRefPriceMatch = content.match(lowQualityRefPriceRegExp);
  if (!premiumRefPriceMatch) {
    console.log("Could not find precio total por carga!");
    process.exit(1);
  }

  if (!lowQualityRefPriceMatch) {
    console.log("Could not find precio total de pasilla!");
    process.exit(1);
  }

  const refPriceByCityMatch = content.matchAll(refPriceByCityRegExp);

  const refPriceByCity = [...refPriceByCityMatch].map((match) => ({
    cityName: match[1]
      .toLowerCase()
      .replace(/(^|\s)\S/g, (c) => c.toUpperCase()),
    refPrice: match[2].replace(/[^\d]/g, ""),
  }));

  const json = {
    refPrice: {
      premium: premiumRefPriceMatch[1].replace(/[^\d]/g, ""),
      lowQuality: lowQualityRefPriceMatch[1].replace(/[^\d]/g, ""),
    },
    refPriceByCity: refPriceByCity,
  };

  console.log(json);
}

fs.readFile("./pdf.pdf")
  .then((arraybuffer) => getPdfContent(arraybuffer))
  .then((content) => {
    contentToJson(content);
  });
