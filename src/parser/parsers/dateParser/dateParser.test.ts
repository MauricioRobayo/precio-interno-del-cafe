import { dateParser } from "./dateParser";

const expectedDate = "2021-09-02T00:00:00.000-05:00";
const cases = [
  "Septiembre 02 / 2021",
  "Septiembre 02/2021",
  "Septiembre 2/2021",
];

it.each(cases)("should return the correct date for %s", (date) => {
  const testContent = `${date}La Federación Nacional de Cafeteros de Colombia ofrece`;
  const parsed = dateParser(testContent);

  expect(parsed).toBe(new Date(expectedDate).toISOString());
});

it("Should throw an error if no match", () => {
  const testContent = "";

  expect(() => dateParser(testContent)).toThrowError(
    `dateParser: Could not parse date from '${testContent}'`
  );
});

it("Should throw an error if cannot map to a month", () => {
  const testMonth = "error";
  const testContent = `${testMonth} 02 / 2021`;

  expect(() => dateParser(testContent)).toThrowError(
    `dateParser: Could not map '${testMonth}' to a month`
  );
});

it("Should throw an error if cannot parse date", () => {
  const testContent = "Noviembre 45 / 9999";

  expect(() => dateParser(testContent)).toThrowError(
    "dateParser: Invalid time value '9999-11-45'"
  );
});
