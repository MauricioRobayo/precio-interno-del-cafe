import {
  getCitiesRefPrice,
  getLowQualityRefPrice,
  getPremiumRefPrice,
} from "./parsers";

const premiumRefPricePlaceholder = "{{premiumRefPrice}}";
const lowQualityRefPricePlaceholder = "{{lowQualityRefPrice}}";
const testContent = `Septiembre 02 / 2021La Federación Nacional de Cafeteros de Colombia ofrece a todos los cafeteros la garantía de compra,  mediante lapublicación de un precio base de mercado que se calcula  de acuerdo con la cotización de cierre en la Bolsa de Nueva Yorkdel día, la tasa de cambio del día y el diferencial o prima de referencia para el café colombiano.Se adicionarán las bonificaciones para programas de cafés especiales.PRECIO EXTERNOCierre primera posición contrato C Nueva York   191.90 USCent/lbCierre segunda posición contrato C Nueva York   194.35 USCent/lbCierre tercera posición contrato C Nueva York   197.05 USCent/lbPRECIO INTERNO DE REFERENCIAPrecio total por carga de 125 Kg de pergamino seco ${premiumRefPricePlaceholder} COPPrecio total  de pasilla contenida en el pergamino    ${lowQualityRefPricePlaceholder} COP               Tabla de preciosPERGAMINO $ALMACAFE Carga (1) (2) Kilo ArrobaARMENIA 1,735,500 13,884 173,550BOGOTÁ 1,734,250 13,874 173,425BUCARAMANGA 1,733,875 13,871 173,388BUGA 1,736,250 13,890 173,625CHINCHINÁ 1,735,375 13,883 173,538CÚCUTA 1,733,375 13,867 173,338IBAGUÉ 1,734,625 13,877 173,463MANIZALES 1,735,375 13,883 173,538MEDELLÍN 1,734,625 13,877 173,463NEIVA 1,733,750 13,870 173,375PAMPLONA 1,733,500 13,868 173,350PASTO 1,733,500 13,868 173,350PEREIRA 1,735,375 13,883 173,538POPAYÁN 1,735,625 13,885 173,563SANTA MARTA 1,737,125 13,897 173,713VALLEDUPAR 1,734,750 13,878 173,475PRECIO DE REFERENCIA PASILLA DE FINCAPrecio por punto producido    850           COP         51.000          42.500          34.000          25.500 60504030Precio por ArrobaPuntos1.  Para café pergamino  con factor de rendimiento 94.002.  Las cooperativas de caficultores cubrirán, con cargo al precio, todos los costos relacionados con el servicio de acopio de café al productor.Federación Nacional de Cafeteros de Colombia - Oficina de prensaCalle 73 No. 8-13 Torre B Piso 12 - Teléfono: 3136600 ext. 1790-1752 Directo:2352262Bogotá - Colombiawww.federaciondecafeteros.orgSeptiembre 02 / 2021TABLA DE PRECIOS DE REFERENCIASTABLA DE PRECIOS DE REFERENCIA SEGUN FACTOR DE RENDIMIENTO EN TRILLAFactor de rendimiento Pesos por carga de125 kilosde café pergaminoPesos porarroba de cafépergaminoPesos por kilo decafé pergamino89           1,798,750             179,875              14,39090           1,784,750             178,475              14,27891           1,770,875             177,088              14,16792           1,759,000             175,900              14,07293           1,747,625             174,763              13,98194           1,735,000             173,500              13,88095           1,722,875             172,288              13,78396           1,708,625             170,863              13,66997           1,698,000             169,800              13,58498           1,687,000             168,700              13,49699           1,678,000             167,800              13,424DESCUENTOS POR TAZAResultado recibos en AlmacaféFrecuencia (tazasdefectuosas / tazasmuestra) 1/8 2/8 3/8 4/8 5/8 6/8 7/8 8/8DefectoTIPO I Q1 88.000 88.000 88.000 88.000 88.000 88.000 88.000 88.000 TIPO II Q2 20.000 20.000 20.000 20.000 60.000 60.000 60.000 60.000 TIPO III Q3 20.000 20.000 20.000 20.000 20.000 20.000 20.000 20.000 Valores expresados en pesos por cargaLos tipos de defecto en taza a que hacen mención las tablas anteriores son:Tipo I: Químico, fenol, "stinker", mohoTipo II: Fermento, vinagreTipo III: ReposoFederación Nacional de Cafeteros de Colombia - Oficina de prensaCalle 73 No. 8-13 Torre B Piso 12 - Teléfono: 3136600 ext. 1790-1752 Directo:2352262Bogotá - Colombiawww.federaciondecafeteros.org`;
const premiumRefPriceTestCases = [12_345_678, 1_234_567, 123_456].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const lowQualityRefPriceTestCases = [123_456, 12_345, 1_234, 123].map(
  (refPrice) => [refPrice.toLocaleString("en-US"), refPrice]
);
const genericRefPriceParsers = [
  {
    name: "premium",
    parser: getPremiumRefPrice,
    cases: premiumRefPriceTestCases,
    placeholder: premiumRefPricePlaceholder,
  },
  {
    name: "lowQuality",
    parser: getLowQualityRefPrice,
    cases: lowQualityRefPriceTestCases,
    placeholder: lowQualityRefPricePlaceholder,
  },
];

describe.each(genericRefPriceParsers)(
  "$name",
  ({ name, parser, cases, placeholder }) => {
    it.each(cases)("should parse %s as %s", (refPrice, parsedRefPrice) => {
      const parsed = parser(testContent.replace(placeholder, String(refPrice)));

      expect(parsed).toEqual([name, parsedRefPrice]);
    });

    it.each(cases)(
      "should parse %s as %s when there are extra spaces",
      (refPrice, parsedRefPrice) => {
        const parsed = parser(
          testContent
            .replace(/\s/g, "  ")
            .replace(placeholder, String(refPrice))
        );

        expect(parsed).toEqual([name, parsedRefPrice]);
      }
    );

    it("should throw if can not parse refPrice", () => {
      expect(() => parser("")).toThrowError(
        `${name}: Could not find reference price in content: `
      );
    });
  }
);

it.todo("should get cities ref price");
