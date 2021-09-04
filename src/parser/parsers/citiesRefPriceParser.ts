import camelCase from "lodash/camelCase";
import { CitiesRefPrice } from "../models/RefPriceStorage";

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
  "Ibagué",
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
export function citiesRefPriceParser(content: string): CitiesRefPrice {
  const matchArray = [...content.matchAll(regExp)];

  if (matchArray.length === 0) {
    throw new Error(
      `Failed to find pattern '${regExp.source}' in content '${content}'`
    );
  }

  return Object.fromEntries(
    matchArray.map((match) => {
      const key = camelCase(match[1]);
      const value = Number(match[2].replace(/,/g, ""));

      return [key, value];
    })
  ) as CitiesRefPrice;
}
