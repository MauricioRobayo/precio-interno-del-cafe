const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function dateParser(content: string): number {
  const match = content.match(/^(\w+) (\d{1,2})\s?\/\s?(\d{4})/);

  if (!match) {
    throw new Error(`Could not parse date from '${content}'`);
  }

  const month = months.indexOf(match[1].toLocaleLowerCase());
  const date = Number(match[2]);
  const year = Number(match[3]);

  return Date.UTC(year, month, date);
}
