import { createBaseRefPriceParser } from "./createRefPriceParser";

export const premiumRefPriceParser = createBaseRefPriceParser(
  /Precio total por carga.*?(\d{0,3},?\d{3},\d{3})/
);

export const lowQualityRefPriceParser = createBaseRefPriceParser(
  /Precio total de pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/
);

export const lowQualityRefPricePerPointParser = createBaseRefPriceParser(
  /Precio por punto producido.*?(\d{0,3},?\d{3})/
);

export const baseYieldFactorParser = createBaseRefPriceParser(
  /Para café pergamino con factor de rendimiento (\d{2}.\d{2}(?!\.))/
);
