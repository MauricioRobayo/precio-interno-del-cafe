import { createExtendedRefPriceParser } from "./createRefPriceParser";
import { ExternalRefPrice } from "../models/RefPriceStorage";

const contractsMap: { [k: string]: string } = {
  primera: "nyCFirst",
  segunda: "nyCSecond",
  tercera: "nyCThird",
};
const parser = createExtendedRefPriceParser(
  /Cierre (primera|segunda|tercera) posici[oó]n.*?(\d{1,3}\.\d{2})/gi
);

export function externalRefPriceParser(content: string): ExternalRefPrice {
  const parsed = parser(content);

  return Object.fromEntries(
    Object.entries(parsed).map(([key, value]) => [contractsMap[key], value])
  ) as ExternalRefPrice;
}
