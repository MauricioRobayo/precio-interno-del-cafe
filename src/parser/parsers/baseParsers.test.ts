import {
  lowQualityRefPriceParser,
  premiumRefPriceParser,
  lowQualityRefPricePerPointParser,
} from "./baseParsers";

const placeholder = "{{placeholder}}";
const premiumRefPriceTestCases = [12_345_678, 1_234_567, 123_456].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const lowQualityRefPriceTestCases = [123_456, 12_345, 1_234, 123].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const lowQualityRefPricePerPointTestCases = [12_234, 1_234, 123].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const genericRefPriceParsers = [
  {
    name: "premium",
    parser: premiumRefPriceParser,
    cases: premiumRefPriceTestCases,
    testContent:
      "PRECIO INTERNO DE REFERENCIA" +
      `Precio total por carga de 125 Kg de pergamino seco ${placeholder} COP` +
      "Precio total de pasilla contenida en el pergamino 7,000 COP",
  },
  {
    name: "lowQuality",
    parser: lowQualityRefPriceParser,
    cases: lowQualityRefPriceTestCases,
    testContent:
      "Precio total por carga de 125 Kg de pergamino seco 1,735,000 COP" +
      `Precio total de pasilla contenida en el pergamino ${placeholder} COP ` +
      "Tabla de preciosPERGAMINO $ALMACAFE Carga (1) (2) Kilo Arroba",
  },
  {
    name: "lowQualityPerPoint",
    parser: lowQualityRefPricePerPointParser,
    cases: lowQualityRefPricePerPointTestCases,
    testContent:
      "PRECIO DE REFERENCIA PASILLA DE FINCA" +
      `Precio por punto producido ${placeholder}` +
      "COP 51.000 42.500 34.000 25.500 60504030",
  },
];

describe.each(genericRefPriceParsers)(
  "$name",
  ({ parser, cases, testContent }) => {
    it.each(cases)("should parse %s as %s", (refPrice, parsedRefPrice) => {
      const parsed = parser(testContent.replace(placeholder, String(refPrice)));

      expect(parsed).toEqual(parsedRefPrice);
    });

    it("should throw if can not parse refPrice", () => {
      expect(() => parser("")).toThrowError();
    });
  }
);