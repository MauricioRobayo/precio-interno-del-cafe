import { CupDiscount } from "../models/RefPriceStorage";

const regExp = /tipo (i q1|ii q2|iii q3) ([\d. ]+) /gi;

const cupDiscountMap: { [k: string]: string } = {
  "I Q1": "typeIQ1",
  "II Q2": "typeIIQ2",
  "III Q3": "typeIIIQ3",
};

export function cupDiscountRefPriceParser(content: string): CupDiscount {
  const matchArray = [...content.matchAll(regExp)];

  if (!matchArray) {
    throw new Error("Could not parse content!");
  }

  return Object.fromEntries(
    matchArray.map(([, key, value]) => [
      cupDiscountMap[key],
      value.split(" ").map(Number),
    ])
  ) as CupDiscount;
}
