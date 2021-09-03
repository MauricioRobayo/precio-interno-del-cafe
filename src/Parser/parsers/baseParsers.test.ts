import { lowQualityRefPriceParser, premiumRefPriceParser } from "./baseParsers";

const placeholder = "{{placeholder}}";
const premiumRefPriceTestCases = [12_345_678, 1_234_567, 123_456].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const lowQualityRefPriceTestCases = [123_456, 12_345, 1_234, 123].map(
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
];

describe.each(genericRefPriceParsers)(
  "$name",
  ({ name, parser, cases, testContent }) => {
    it.each(cases)("should parse %s as %s", (refPrice, parsedRefPrice) => {
      const parsed = parser(testContent.replace(placeholder, String(refPrice)));

      expect(parsed).toEqual([name, parsedRefPrice]);
    });

    it("should throw if can not parse refPrice", () => {
      expect(() => parser("")).toThrowError(
        `${name}: Could not find reference price in content: `
      );
    });
  }
);
