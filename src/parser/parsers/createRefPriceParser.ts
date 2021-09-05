import camelCase from "lodash/camelCase";

export function createBaseRefPriceParser(regExp: RegExp) {
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

function defaultValueParser(value: string) {
  return Number(value.replace(/,/g, ""));
}

export function createExtendedRefPriceParser<
  T extends { [k: string]: unknown }
>(
  regExp: RegExp,
  {
    keyMapper = camelCase,
    valueParser = defaultValueParser,
  }: {
    keyMapper?: (key: string) => string;
    valueParser?: (value: string) => unknown;
  } = {}
) {
  return function (content: string): T {
    const matchArray = [...content.matchAll(regExp)];

    if (matchArray.length === 0) {
      throw new Error(
        `Failed to find pattern '${regExp.source} in content '${content}`
      );
    }

    return Object.fromEntries(
      matchArray.map(([, key, value]) => [keyMapper(key), valueParser(value)])
    ) as T;
  };
}
