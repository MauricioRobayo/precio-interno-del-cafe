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
    `Could not parse date from '${testContent}'`
  );
});
