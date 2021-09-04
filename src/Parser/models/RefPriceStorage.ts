export type RefPrice = number;
type Cities =
  | "armenia"
  | "bogota"
  | "bucaramanga"
  | "buga"
  | "chinchina"
  | "cucuta"
  | "ibague"
  | "manizales"
  | "medellin"
  | "neiva"
  | "pamplona"
  | "pasto"
  | "pereira"
  | "popayan"
  | "santaMarta"
  | "valledupar";
export type ExternalRefPrice = Record<
  "nyCFirst" | "nyCSecond" | "nyCThird",
  RefPrice
>;
export type InternalRefPrice = Record<"lowQuality" | "premium", RefPrice>;
export type CitiesRefPrice = Record<Cities, RefPrice>;
export type CupDiscountResult = Record<
  "1/8" | "2/8" | "3/8" | "4/8" | "5/8" | "6/8" | "7/8" | "8/8",
  RefPrice
>;
export type CupDiscount = Record<
  "typeIQ1" | "typeIIQ2" | "typeIIIQ3",
  CupDiscountResult
>;
export interface RefPriceStorage {
  external: ExternalRefPrice;
  internal: InternalRefPrice;
  cities: CitiesRefPrice;
  lowQualityPerPoint: RefPrice;
  cupDiscount: CupDiscount;
}
