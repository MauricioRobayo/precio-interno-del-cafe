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
  number
>;
export type InternalRefPrice = Record<
  "lowQuality" | "lowQualityPerPoint" | "premium" | "baseYieldFactor",
  number
>;
export type CitiesRefPrice = Record<Cities, number>;
export type CupDiscount = Record<
  "typeIQ1" | "typeIIQ2" | "typeIIIQ3",
  number[]
>;
export interface RefPriceStorage {
  etag: string;
  lastModified: string;
  createdAt: number;
  pdfCreationDate: number;
  fileName: string;
  refPrice: {
    date: string;
    external: ExternalRefPrice;
    internal: InternalRefPrice;
    cities: CitiesRefPrice;
    cupDiscount: CupDiscount;
  };
}
