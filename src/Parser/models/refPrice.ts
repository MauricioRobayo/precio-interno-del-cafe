interface External {
  nyCFirst: number;
  nyCSecond: number;
  nyCThird: number;
}
interface Internal {
  lowQuality: number;
  premium: number;
}
interface Cities {
  armenia: number;
  bogota: number;
  bucaramanga: number;
  buga: number;
  chinchina: number;
  cucuta: number;
  ibague: number;
  manizales: number;
  medellin: number;
  neiva: number;
  pamplona: number;
  pasto: number;
  pereira: number;
  popayan: number;
  santaMarta: number;
  valledupar: number;
}
interface CupDiscountResult {
  "1/8": number;
  "2/8": number;
  "3/8": number;
  "4/8": number;
  "5/8": number;
  "6/8": number;
  "7/8": number;
  "8/8": number;
}
interface CupDiscount {
  typeIQ1: CupDiscountResult;
  typeIIQ2: CupDiscountResult;
  typeIIIQ3: CupDiscountResult;
}
export interface RefPrice {
  external: External;
  internal: Internal;
  cities: Cities;
  lowQualityPerPoint: number;
  cupDiscount: CupDiscount;
}
