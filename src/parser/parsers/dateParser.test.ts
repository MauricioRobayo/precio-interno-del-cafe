import { dateParser } from "./dateParser";

it("Should throw an error if no match", () => {
  const testContent = "";

  expect(() => dateParser(testContent)).toThrowError(
    `Could not parse date from '${testContent}'`
  );
});

const cases = [
  ["Septiembre 02 / 2021", "2021-09-02"],
  ["Septiembre 02/2021", "2021-09-02"],
  ["Septiembre 2/2021", "2021-09-02"],
  ["Enero 30 / 2020", "2020-01-30"],
];

it.each(cases)(
  "should return the correct date for %s",
  (localDate, expectedDate) => {
    const testContent = `${localDate}La Federación Nacional de Cafeteros de Colombia ofrece`;
    const date = dateParser(testContent);

    expect(date).toBe(new Date(expectedDate).getTime());
  }
);
