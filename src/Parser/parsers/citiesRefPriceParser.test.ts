import { citiesRefPriceParser } from ".";

const testContent =
  "Tabla de preciosPERGAMINO $ALMACAFE Carga (1) (2) Kilo Arroba" +
  "ARMENIA 1,735,500 13,884 173,550" +
  "BOGOTÁ 1,734,250 13,874 173,425" +
  "BUCARAMANGA 1,733,875 13,871 173,388" +
  "BUGA 1,736,250 13,890 173,625" +
  "CHINCHINÁ 1,735,375 13,883 173,538" +
  "CÚCUTA 1,733,375 13,867 173,338" +
  "IBAGUÉ 1,734,625 13,877 173,463" +
  "MANIZALES 1,735,375 13,883 173,538" +
  "MEDELLÍN 1,734,625 13,877 173,463" +
  "NEIVA 1,733,750 13,870 173,375" +
  "PAMPLONA 1,733,500 13,868 173,350" +
  "PASTO 1,733,500 13,868 173,350" +
  "PEREIRA 1,735,375 13,883 173,538" +
  "POPAYÁN 1,735,625 13,885 173,563" +
  "SANTA MARTA 1,737,125 13,897 173,713" +
  "VALLEDUPAR 1,734,750 13,878 173,475" +
  "PRECIO DE REFERENCIA PASILLA DE FINCAPrecio por punto producido 850 COP 51.000 42.500 34.000 25.500 60504030" +
  "Bogotá - Colombiawww.federaciondecafeteros.org";

const expected = [
  "cities",
  [
    ["armenia", 1735500],
    ["bogota", 1734250],
    ["bucaramanga", 1733875],
    ["buga", 1736250],
    ["chinchina", 1735375],
    ["cucuta", 1733375],
    ["manizales", 1735375],
    ["medellin", 1734625],
    ["neiva", 1733750],
    ["pamplona", 1733500],
    ["pasto", 1733500],
    ["pereira", 1735375],
    ["popayan", 1735625],
    ["santaMarta", 1737125],
    ["valledupar", 1734750],
  ],
];

it("should get reference price for each city", () => {
  const citiesRefPrice = citiesRefPriceParser(testContent);

  expect(citiesRefPrice).toEqual(expected);
});

it("should get reference price for each city if accent is missing", () => {
  const testContentWithouAccents = testContent
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
  const citiesRefPrice = citiesRefPriceParser(testContentWithouAccents);

  expect(citiesRefPrice).toEqual(expected);
});
