import { createBaseRefPriceParser } from "./createRefPriceParser";

export const premiumRefPriceParser = createBaseRefPriceParser(
  "premium",
  /Precio total por carga.*?(\d{0,3},?\d{3},\d{3})/
);

export const lowQualityRefPriceParser = createBaseRefPriceParser(
  "lowQuality",
  /Precio total de pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/
);

export const lowQualityRefPricePerPointParser = createBaseRefPriceParser(
  "lowQualityPerPoint",
  /Precio por punto producido.*?(\d{0,3},?\d{3})/
);
