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
export type InternalRefPrice = Record<
  "lowQuality" | "lowQualityPerPoint" | "premium",
  RefPrice
>;
export type CitiesRefPrice = Record<Cities, RefPrice>;
export type CupDiscount = Record<
  "typeIQ1" | "typeIIQ2" | "typeIIIQ3",
  number[]
>;
export interface RefPriceStorage {
  external: ExternalRefPrice;
  internal: InternalRefPrice;
  cities: CitiesRefPrice;
  cupDiscount: CupDiscount;
}
