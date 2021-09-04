import camelCase from "lodash/camelCase";

export type ExtendedRefPrice = Record<string, number>;
export type BaseRefPriceParser = (content: string) => number;
export type ExtendedRefPriceParser = (
  content: string
) => Record<string, number>;
export type RefPriceParser = BaseRefPriceParser | ExtendedRefPriceParser;

export function createBaseRefPriceParser(regExp: RegExp): BaseRefPriceParser {
  return function (content: string) {
    const match = content.match(regExp);
    regExp.source;
    if (!match) {
      throw new Error(
        `Could not find pattern '${regExp.source}' in content '${content}''`
      );
    }

    return Number(match[1].replace(/,/g, ""));
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
