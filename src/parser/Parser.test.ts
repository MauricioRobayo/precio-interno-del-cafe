import path from "path";
import { getContent } from "./parser";
import { exampleContent } from "./exampleContent";

const pdfFile = path.join(__dirname, "example.pdf");

it("should get the text content of a pdf file replacing multiple spaces with one space", async () => {
  const content = await getContent(pdfFile);

  expect(content).toBe(exampleContent);
});
