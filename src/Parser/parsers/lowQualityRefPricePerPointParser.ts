import { createRefPriceParser } from "./createRefPriceParser";

const lowQualityRefPricePerPointParserRegExp =
  /Precio\s+por\s+punto\s+producido.*?(\d{0,3},?\d{3})/;

export const lowQualityRefPricePerPointParser = createRefPriceParser(
  "premium",
  lowQualityRefPricePerPointParserRegExp
);
