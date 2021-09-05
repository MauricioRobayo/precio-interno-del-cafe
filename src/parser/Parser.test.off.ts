import path from "path";
import { IcpParser } from "./parser";
import {
  BaseRefPriceParser,
  ExtendedRefPriceParser,
} from "./parsers/createParser";
import { exampleContent } from "./exampleContent";

const pdfFile = path.join(__dirname, "example.pdf");

it("should return the correct object for a base parser", async () => {
  const mockBaseParser: BaseRefPriceParser = () => {
    return 1;
  };
  const icpParser = new IcpParser([mockBaseParser]);
  const parsedContent = await icpParser.parse(pdfFile);

  expect(parsedContent).toEqual({ baseParser: 1 });
});

it("should properly combine two base parsers", async () => {
  const mockBaseParser1: BaseRefPriceParser = () => {
    return 1;
  };
  const mockBaseParser2: BaseRefPriceParser = () => {
    return 2;
  };
  const icpParser = new IcpParser([mockBaseParser1, mockBaseParser2]);
  const parsedContent = await icpParser.parse(pdfFile);

  expect(parsedContent).toEqual({ baseParser1: 1, baseParser2: 2 });
});

it("should return the correct object for an extended parser", async () => {
  const mockBaseParser: BaseRefPriceParser = () => {
    return ["baseParser", 1];
  };
  const mockExtendedParser: ExtendedRefPriceParser = () => {
    return [
      "extendedParser",
      [
        ["a", 1],
        ["b", 2],
      ],
    ];
  };
  const icpParser = new IcpParser([mockBaseParser, mockExtendedParser]);
  const parsedContent = await icpParser.parse(pdfFile);

  expect(parsedContent).toEqual({
    baseParser: 1,
    extendedParser: {
      a: 1,
      b: 2,
    },
  });
});

it("should properly combinean base and extended parsers", async () => {
  const mockExtendedParser: ExtendedRefPriceParser = () => {
    return [
      "extendedParser",
      [
        ["a", 1],
        ["b", 2],
      ],
    ];
  };
  const icpParser = new IcpParser([mockExtendedParser]);
  const parsedContent = await icpParser.parse(pdfFile);

  expect(parsedContent).toEqual({
    extendedParser: {
      a: 1,
      b: 2,
    },
  });
});

it("should get the text content of a pdf file replacing multiple spaces with one space", async () => {
  const content = await IcpParser.getContent(pdfFile);

  expect(content).toBe(exampleContent);
});
