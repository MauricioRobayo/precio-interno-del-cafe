import { premiumRefPriceParser, lowQualityRefPriceParser } from "./baseParsers";
import { ExtendedRefPrice } from "./createRefPriceParser";

export function internalRefPriceParser(content: string): ExtendedRefPrice {
  return [
    "internal",
    [premiumRefPriceParser(content), lowQualityRefPriceParser(content)],
  ];
}
