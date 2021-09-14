import { externalParser } from ".";
import { exampleContent } from "../../exampleContent";
import { ExternalRefPrice } from "../../../models/ref-price-model";

it("should return external reference price", () => {
  const parsed = externalParser(exampleContent);
  const expected: ExternalRefPrice = {
    nyCFirst: 191.9,
    nyCSecond: 194.35,
    nyCThird: 197.05,
  };
  expect(parsed).toEqual(expected);
});
