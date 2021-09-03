import { createRefPriceParser } from "./createRefPriceParser";

const lowQualityRefPriceRegExp =
  /Precio\s+total\s+de\s+pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/;

export const lowQualityRefPriceParser = createRefPriceParser(
  "lowQuality",
  lowQualityRefPriceRegExp
);
