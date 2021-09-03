import { createRefPriceParser } from "./createRefPriceParser";

const premiumRefPriceRegExp =
  /Precio\s+total\s+por\s+carga.*?(\d{0,3},?\d{3},\d{3})/;

export const premiumRefPriceParser = createRefPriceParser(
  "premium",
  premiumRefPriceRegExp
);
