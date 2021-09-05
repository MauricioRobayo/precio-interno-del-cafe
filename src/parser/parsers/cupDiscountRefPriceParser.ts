import { CupDiscount } from "../models/RefPriceStorage";
import { createExtendedRefPriceParser } from "./createRefPriceParser";

const regExp = /tipo (i q1|ii q2|iii q3) ([\d. ]+) /gi;

function keyMapper(key: string) {
  return (
    {
      "I Q1": "typeIQ1",
      "II Q2": "typeIIQ2",
      "III Q3": "typeIIIQ3",
    }[key] || key
  );
}

function valueParser(value: string) {
  return value.split(" ").map(Number);
}

export const cupDiscountRefPriceParser =
  createExtendedRefPriceParser<CupDiscount>(regExp, keyMapper, valueParser);
