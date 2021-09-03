import camelCase from "lodash/camelCase";

export type RefPrice = [string, number];
export type ExtendedRefPriceParser = (content: string) => [string, RefPrice[]];
export type BaseRefPriceParser = (content: string) => RefPrice;
export type RefPriceParser = BaseRefPriceParser | ExtendedRefPriceParser;

export function createRefPriceParser(
  name: string,
  regExp: RegExp
): BaseRefPriceParser {
  return function refPriceParser(content: string): RefPrice {
    const match = content.match(regExp);

    if (!match) {
      throw new Error(
        `${name}: Could not find reference price in content: ${content}`
      );
    }

    const refPrice = Number(match[1].replace(/,/g, ""));

    return [camelCase(name), refPrice];
  };
}
