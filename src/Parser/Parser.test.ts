import { IcpParser } from "./Parser";
import path from "path";
import { exampleContent } from "./exampleContent";

describe("Internal coffee price parser", () => {
  it("should get the text content of a pdf file replacing multiple spaces with one space", async () => {
    const pdfFile = path.join(__dirname, "example.pdf");
    const content = await IcpParser.getContent(pdfFile);

    expect(content).toBe(exampleContent);
  });
});
