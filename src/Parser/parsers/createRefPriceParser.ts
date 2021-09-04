import camelCase from "lodash/camelCase";

export type RefPrice = [string, number];
export type ExtendedRefPrice = [string, RefPrice[]];
export type BaseRefPriceParser = (content: string) => RefPrice;
export type ExtendedRefPriceParser = (content: string) => ExtendedRefPrice;
export type RefPriceParser = BaseRefPriceParser | ExtendedRefPriceParser;

export function createBaseRefPriceParser(
  name: string,
  regExp: RegExp
): BaseRefPriceParser {
  return function (content: string): RefPrice {
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

export function createExtendedRefPriceParser(
  name: string,
  regExp: RegExp
): ExtendedRefPriceParser {
  return function (content: string): ExtendedRefPrice {
    const match = content.matchAll(regExp);

    const refPrice: RefPrice[] = [...match].map((match) => {
      const key = camelCase(match[1]);
      const value = Number(match[2].replace(/,/g, ""));
      if (Number.isNaN(value)) {
        throw new Error(
          `IcpParser.getRefPriceByCity: could not parse reference price '${match[2]}' for city '${match[1]}'`
        );
      }

      return [key, value];
    });
    return [name, refPrice];
  };
}
