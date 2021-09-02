import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";

async function getPdfContent(arraybuffer: Buffer) {
  try {
    const pdf = getDocument(arraybuffer);
    const doc = await pdf.promise;

    const pageNumbers = Array.from({ length: 2 }, (_, i) => i + 1);
    const contentsPromises = pageNumbers.map(async (pageNumber) => {
      const page = await doc.getPage(pageNumber);
      const content = await page.getTextContent();
      return content.items.map((item: any) => item.str);
    });
    const contents = await Promise.all(contentsPromises);

    console.log(contents.join(""));
  } catch (err) {
    console.log("parse error", err);
  }
}
