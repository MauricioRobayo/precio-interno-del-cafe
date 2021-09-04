import { premiumRefPriceParser, lowQualityRefPriceParser } from "./baseParsers";
import { InternalRefPrice } from "../models/RefPriceStorage";

export function internalRefPriceParser(content: string): InternalRefPrice {
  return {
    premium: premiumRefPriceParser(content),
    lowQuality: lowQualityRefPriceParser(content),
  };
}
