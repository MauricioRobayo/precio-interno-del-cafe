import camelCase from "lodash/camelCase";
import { RefPriceParserError } from "../RefPriceParserError";
import { RefPrice } from "../models/RefPriceStorage";

export type ExtendedRefPrice = Record<string, RefPrice>;
export type BaseRefPriceParser = (content: string) => number;
export type ExtendedRefPriceParser<T> = (
  content: string
) => Record<keyof T, RefPrice>;
export type RefPriceParser =
  | BaseRefPriceParser
  | ExtendedRefPriceParser<ExtendedRefPrice>;

export function createBaseRefPriceParser(regExp: RegExp): BaseRefPriceParser {
  return function (content: string) {
    const match = content.match(regExp);

    if (!match) {
      throw new RefPriceParserError(regExp.source, content);
    }

    return Number(match[1].replace(/,/g, ""));
  };
}

export function createExtendedRefPriceParser<T extends { [k: string]: number }>(
  regExp: RegExp
) {
  return function (content: string): T {
    const matchArray = [...content.matchAll(regExp)];

    if (matchArray.length === 0) {
      throw new RefPriceParserError(regExp.source, content);
    }

    return Object.fromEntries(
      matchArray.map((match) => {
        const key = camelCase(match[1]);
        const value = Number(match[2].replace(/,/g, ""));

        return [key, value];
      })
    ) as T;
  };
}
