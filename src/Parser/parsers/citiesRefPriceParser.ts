import camelCase from "lodash/camelCase";
import { RefPrice, ExtendedRefPriceParser } from "./createRefPriceParser";

export const citiesRefPriceParser: ExtendedRefPriceParser = (
  content: string
): [string, RefPrice[]] => {
  const accentInsensitive = (str: string): string =>
    str
      .normalize("NFD")
      .replace(/([aeiou])(\p{Diacritic})/gu, "[$1$1$2]")
      .normalize();
  const cities = [
    "Armenia",
    "Bogotá",
    "Bucaramanga",
    "Buga",
    "Chinchiná",
    "Cúcuta",
    "Manizales",
    "Medellín",
    "Neiva",
    "Pamplona",
    "Pasto",
    "Pereira",
    "Popayán",
    "Santa Marta",
    "Valledupar",
  ].map(accentInsensitive);
  const regExp = new RegExp(
    `(${cities.join("|")}) (\\d{0,3}[,.]?\\d{3}[,.]\\d{3})`,
    "gi"
  );
  const refPriceByCityMatch = content.matchAll(regExp);

  const refPriceByCity: RefPrice[] = [...refPriceByCityMatch].map((match) => {
    const refPrice = Number(match[2].replace(/,/g, ""));
    const cityName = camelCase(match[1]);
    if (Number.isNaN(refPrice)) {
      throw new Error(
        `IcpParser.getRefPriceByCity: could not parse reference price '${match[2]}' for city '${match[1]}'`
      );
    }

    return [cityName, refPrice];
  });
  return ["cities", refPriceByCity];
};
