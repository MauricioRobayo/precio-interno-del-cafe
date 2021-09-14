import {
  premiumRefPriceParser,
  lowQualityRefPriceParser,
  lowQualityRefPricePerPointParser,
  baseYieldFactorParser,
} from "../baseParsers";
import { InternalRefPrice } from "../../../models/ref-price-model";

export function internalParser(content: string): InternalRefPrice {
  return {
    premium: premiumRefPriceParser(content),
    lowQuality: lowQualityRefPriceParser(content),
    lowQualityPerPoint: lowQualityRefPricePerPointParser(content),
    baseYieldFactor: baseYieldFactorParser(content),
  };
}
