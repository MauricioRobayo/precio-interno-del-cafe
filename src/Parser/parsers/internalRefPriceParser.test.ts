import { internalRefPriceParser } from "./internalRefPriceParser";
import { exampleContent } from "../exampleContent";

it("should return an extended internal reference price", () => {
  const parsed = internalRefPriceParser(exampleContent);

  expect(parsed).toEqual([
    "internal",
    [
      ["premium", 1735000],
      ["lowQuality", 7000],
    ],
  ]);
});
