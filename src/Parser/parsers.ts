import slugify from "slugify";
import { RefPrice, RefPriceParser } from "./Parser";

export function createRefPriceParser(name: string, regExp: RegExp) {
  return function (content: string): RefPrice {
    const match = content.match(regExp);

    if (!match) {
      throw new Error(
        `${name}: Could not find reference price in content: ${content}`
      );
    }

    const refPrice = Number(match[1].replace(/,/g, ""));

    return [name, refPrice];
  };
}

const premiumRefPriceRegExp =
  /Precio\s+total\s+por\s+carga.*?(\d{0,3},?\d{3},\d{3})/;
export const getPremiumRefPrice: RefPriceParser = createRefPriceParser(
  "premium",
  premiumRefPriceRegExp
);
const lowQualityRefPriceRegExp =
  /Precio\s+total\s+de\s+pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/;
export const getLowQualityRefPrice: RefPriceParser = createRefPriceParser(
  "lowQuality",
  lowQualityRefPriceRegExp
);

export const getCitiesRefPrice: RefPriceParser = (
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
