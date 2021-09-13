const months: { [k: string]: string } = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

export function dateParser(content: string): string {
  const match = content.match(/^(\w+) (\d{1,2})\s?\/\s?(\d{4})/);

  if (!match) {
    throw new Error(`Could not parse date from '${content}'`);
  }

  const date = match[2].padStart(2, "0");
  const month = months[match[1].toLocaleLowerCase()];
  const year = match[3];

  return `${year}-${month}-${date}T05:00:00.000Z`;
}
