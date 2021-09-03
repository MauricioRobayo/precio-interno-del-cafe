import camelCase from "lodash/camelCase";

export type RefPrice = [string, number];

type RefPriceParser = (content: string) => RefPrice;
type ExtendedRefPriceParser = (content: string) => [string, RefPrice[]];

const premiumRefPriceRegExp =
  /Precio\s+total\s+por\s+carga.*?(\d{0,3},?\d{3},\d{3})/;
const lowQualityRefPriceRegExp =
  /Precio\s+total\s+de\s+pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/;

export function createRefPriceParser(
  name: string,
  regExp: RegExp
): RefPriceParser {
  return function refPriceParser(content: string): RefPrice {
    const match = content.match(regExp);

    if (!match) {
      throw new Error(
        `${name}: Could not find reference price in content: ${content}`
      );
    }

    const refPrice = Number(match[1].replace(/,/g, ""));

    return [camelCase(name), refPrice];
  };
}

export const getPremiumRefPrice: RefPriceParser = createRefPriceParser(
  "premium",
  premiumRefPriceRegExp
);

export const getLowQualityRefPrice: RefPriceParser = createRefPriceParser(
  "lowQuality",
  lowQualityRefPriceRegExp
);

export const getCitiesRefPrice: ExtendedRefPriceParser = (
  content: string
): [string, RefPrice[]] => {
  const accentInsensitive = (city: string): string =>
    city
      .normalize("NFD")
      .replace(/([aeiou])(\p{Diacritic})/gu, "[$1$1$2]")
      .normalize();
  const cities = [
    "armenia",
    "bogotá",
    "bucaramanga",
    "buga",
    "chinchiná",
    "cúcuta",
    "manizales",
    "medellín",
    "neiva",
    "pamplona",
    "pasto",
    "pereira",
    "popayán",
    "santa marta",
    "valledupar",
  ].map(accentInsensitive);
  const regExp = new RegExp(
    `(${cities.join("|")})\\s+?(\\d{0,3}[,.]?\\d{3}[,.]\\d{3})`,
    "gi"
  );
  const refPriceByCityMatch = content.matchAll(regExp);

  const refPriceByCity: RefPrice[] = [...refPriceByCityMatch].map((match) => {
    const refPrice = Number(match[2].replace(/,/g, ""));
    const cityName = camelCase(match[1]);
    if (Number.isNaN(refPrice)) {
      throw new Error(
        `IcpParser.getRefPriceByCity: could not parse refPrice '${match[2]}' for city '${match[1]}'`
      );
    }

    return [cityName, refPrice];
  });
  return ["cities", refPriceByCity];
};
