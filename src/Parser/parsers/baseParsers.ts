import { createRefPriceParser } from "./createRefPriceParser";

export const premiumRefPriceParser = createRefPriceParser(
  "premium",
  /Precio total por carga.*?(\d{0,3},?\d{3},\d{3})/
);

export const lowQualityRefPriceParser = createRefPriceParser(
  "lowQuality",
  /Precio total de pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/
);

export const lowQualityRefPricePerPointParser = createRefPriceParser(
  "lowQualityPerPoint",
  /Precio por punto producido.*?(\d{0,3},?\d{3})/
);
