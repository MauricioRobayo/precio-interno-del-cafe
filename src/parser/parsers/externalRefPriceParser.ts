import { ExternalRefPrice } from "../models/RefPriceStorage";
import camelCase from "lodash/camelCase";

const contractsMap: { [k: string]: string } = {
  primera: "nyCFirst",
  segunda: "nyCSecond",
  tercera: "nyCThird",
};
const regExp =
  /Cierre (primera|segunda|tercera) posici[oó]n.*?(\d{1,3}\.\d{2})/gi;

export function externalRefPriceParser(content: string): ExternalRefPrice {
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

      return [contractsMap[key], value];
    })
  ) as ExternalRefPrice;
}
