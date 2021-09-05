import camelCase from "lodash/camelCase";
import { RefPrice } from "../models/RefPriceStorage";

export function createBaseRefPriceParser(regExp: RegExp) {
  return function (content: string): RefPrice {
    const match = content.match(regExp);

    if (!match) {
      throw new Error(
        `Failed to find pattern '${regExp.source} in content '${content}`
      );
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
      throw new Error(
        `Failed to find pattern '${regExp.source} in content '${content}`
      );
    }

    return Object.fromEntries(
      matchArray.map(([, key, value]) => [
        camelCase(key),
        Number(value.replace(/,/g, "")),
      ])
    ) as T;
  };
}
