import { citiesRefPriceParser } from ".";
import { exampleContent } from "../exampleContent";

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
  const citiesRefPrice = citiesRefPriceParser(exampleContent);

  expect(citiesRefPrice).toEqual(expected);
});

it("should get reference price for each city if accent is missing", () => {
  const testContentWithouAccents = exampleContent
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
  const citiesRefPrice = citiesRefPriceParser(testContentWithouAccents);

  expect(citiesRefPrice).toEqual(expected);
});
