import { FileDownloader, uploadFile } from "../../services";
import { RefPriceRepository } from "../../repositories";
import { parser } from "../../parser";

const repo = new RefPriceRepository();

async function processRefPrice(): Promise<void> {
  try {
    const latestRefPrice = await repo.getLatest();
    const fd = new FileDownloader(latestRefPrice?.etag);
    const downloadResult = await fd.downloadFileWithExponentialBackOff();
    const { retries, elapseTimeMs, status } = downloadResult;

    console.log("getRefPrice: downloadResult", {
      elapseTimeMs,
      retries,
      status,
    });

    if (FileDownloader.isSuccessfulExponentialBackOffResult(downloadResult)) {
      const { data, etag, lastModified } = downloadResult;
      let fileName = "";

      try {
        const parsedData = await parser(data);
        fileName = `${parsedData.parsedContent.date.slice(0, 10)}.pdf`;

        await repo.save({
          etag: etag,
          lastModified: lastModified,
          createdAt: Date.now(),
          fileName,
          pdfInfo: parsedData.pdfInfo,
          refPrice: parsedData.parsedContent,
        });
      } catch (err) {
        console.log("getRefPrice: parsing pdf file failed", err);
      }

      await uploadFile(data, fileName);

      console.log("getRefPrice: Process completed", {
        etag,
        fileName,
        lastModified,
      });

      process.exit();
    }
  } catch (err) {
    console.log("getRefPrice: failed", err);
  }

  process.exit(1);
}

processRefPrice();
