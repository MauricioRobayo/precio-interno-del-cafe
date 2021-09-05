import { externalRefPriceParser } from "./externalRefPriceParser";
import { exampleContent } from "../exampleContent";
import { ExternalRefPrice } from "../../models/RefPriceStorage";

it("should return external reference price", () => {
  const parsed = externalRefPriceParser(exampleContent);
  const expected: ExternalRefPrice = {
    nyCFirst: 191.9,
    nyCSecond: 194.35,
    nyCThird: 197.05,
  };
  expect(parsed).toEqual(expected);
});
