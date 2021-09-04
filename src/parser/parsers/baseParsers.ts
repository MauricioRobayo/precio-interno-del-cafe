function createBaseRefPriceParser(regExp: RegExp) {
  return function (content: string): number {
    const match = content.match(regExp);

    if (!match) {
      throw new Error(
        `Failed to find pattern '${regExp.source} in content '${content}`
      );
    }

    return Number(match[1].replace(/,/g, ""));
  };
}

export const premiumRefPriceParser = createBaseRefPriceParser(
  /Precio total por carga.*?(\d{0,3},?\d{3},\d{3})/
);

export const lowQualityRefPriceParser = createBaseRefPriceParser(
  /Precio total de pasilla.*?(\d{0,3},?\d{0,3},?\d{3})/
);

export const lowQualityRefPricePerPointParser = createBaseRefPriceParser(
  /Precio por punto producido.*?(\d{0,3},?\d{3})/
);
