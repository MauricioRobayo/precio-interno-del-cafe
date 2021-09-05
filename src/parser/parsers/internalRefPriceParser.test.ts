import { internalRefPriceParser } from "./internalRefPriceParser";
import { exampleContent } from "../exampleContent";
import { InternalRefPrice } from "../../models/RefPriceStorage";

it("should return internal reference price", () => {
  const parsed = internalRefPriceParser(exampleContent);
  const expected: InternalRefPrice = {
    premium: 1735000,
    lowQuality: 7000,
    lowQualityPerPoint: 850,
    baseYieldFactor: 94,
  };

  expect(parsed).toEqual(expected);
});
