import dotenv from "dotenv";
dotenv.config();

import { FileDownloader, uploadFile } from "../../services";
import { RefPriceRepository } from "../../repositories";
import { parser } from "../../parser";

const repo = new RefPriceRepository();

async function getRefPrice(): Promise<void> {
  const latestRefPrice = await repo.getLatest();

  const fd = new FileDownloader(latestRefPrice?.etag);

  const downloadResult = await fd.downloadFileWithExponentialBackOff();

  if (FileDownloader.isSuccessfulExponentialBackOffResult(downloadResult)) {
    const { fileName, etag, lastModified } = downloadResult;

    await uploadFile(fileName);

    const parsedData = await parser(fileName);

    await repo.save({
      etag: etag,
      lastModified: lastModified,
      createdAt: Date.now(),
      fileName: downloadResult.fileName,
      pdfInfo: parsedData.pdfInfo,
      refPrice: parsedData.parsedContent,
    });
  }
}

getRefPrice()
  .then(() => process.exit())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
