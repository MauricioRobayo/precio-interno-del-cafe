import { ExternalRefPrice } from "../models/RefPriceStorage";
import { createExtendedRefPriceParser } from "./createRefPriceParser";

function keyMapper(key: string) {
  return (
    {
      primera: "nyCFirst",
      segunda: "nyCSecond",
      tercera: "nyCThird",
    }[key] || key
  );
}

const regExp =
  /Cierre (primera|segunda|tercera) posici[oó]n.*?(\d{1,3}\.\d{2})/gi;

export const externalRefPriceParser =
  createExtendedRefPriceParser<ExternalRefPrice>(regExp, keyMapper);
