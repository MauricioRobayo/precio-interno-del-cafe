import path from "path";
import { getContent, parser } from "./parser";
import { exampleContent } from "./exampleContent";

const pdfPath = path.join(__dirname, "example.pdf");

it("should return a reference price object", async () => {
  const refPrice = await parser(pdfPath);

  expect(refPrice.date).toBe(new Date("2021-09-02").getTime());

  expect(refPrice.internal).toEqual(
    expect.objectContaining({
      lowQuality: expect.any(Number),
      lowQualityPerPoint: expect.any(Number),
      premium: expect.any(Number),
      baseYieldFactor: 94,
    })
  );

  expect(refPrice.external).toEqual(
    expect.objectContaining({
      nyCFirst: expect.any(Number),
      nyCSecond: expect.any(Number),
      nyCThird: expect.any(Number),
    })
  );

  expect(refPrice.cities).toEqual(
    expect.objectContaining({
      armenia: expect.any(Number),
      bogota: expect.any(Number),
      bucaramanga: expect.any(Number),
      buga: expect.any(Number),
      chinchina: expect.any(Number),
      cucuta: expect.any(Number),
      ibague: expect.any(Number),
      manizales: expect.any(Number),
      medellin: expect.any(Number),
      neiva: expect.any(Number),
      pamplona: expect.any(Number),
      pasto: expect.any(Number),
      pereira: expect.any(Number),
      popayan: expect.any(Number),
      santaMarta: expect.any(Number),
      valledupar: expect.any(Number),
    })
  );

  Object.values(refPrice.cupDiscount).forEach((value) => {
    expect(value.length).toBe(8);
  });
  expect(refPrice.cupDiscount).toEqual(
    expect.objectContaining({
      typeIQ1: expect.arrayContaining([expect.any(Number)]),
      typeIIQ2: expect.arrayContaining([expect.any(Number)]),
      typeIIIQ3: expect.arrayContaining([expect.any(Number)]),
    })
  );
});

it("should get the text content of a pdf file replacing multiple spaces with one space", async () => {
  const content = await getContent(pdfPath);

  expect(content).toBe(exampleContent);
});
