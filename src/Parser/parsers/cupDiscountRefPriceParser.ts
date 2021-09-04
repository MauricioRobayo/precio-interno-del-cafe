import { CupDiscount, CupDiscountResult } from "../models/RefPriceStorage";
import { exampleContent } from "../exampleContent";

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
    matchArray.map(([, key, value]) => {
      const resultValues = value.split(" ").map(Number);

      const cupDiscountResult: CupDiscountResult = {
        "1/8": resultValues[0],
        "2/8": resultValues[1],
        "3/8": resultValues[2],
        "4/8": resultValues[3],
        "5/8": resultValues[4],
        "6/8": resultValues[5],
        "7/8": resultValues[6],
        "8/8": resultValues[7],
      };

      return [cupDiscountMap[key], cupDiscountResult];
    })
  ) as CupDiscount;
}

console.log(cupDiscountRefPriceParser(exampleContent));
