import { FileDownloader, uploadFile } from "../../services";
import { RefPriceRepository } from "../../repositories";
import { parser } from "../../parser";

const repo = new RefPriceRepository();

async function getRefPrice(): Promise<void> {
  const latestRefPrice = await repo.getLatest();

  const fd = new FileDownloader(
    Math.random() > 0 ? undefined : latestRefPrice?.etag
  );

  const downloadResult = await fd.downloadFileWithExponentialBackOff();

  console.log(downloadResult);

  if (FileDownloader.isSuccessfulExponentialBackOffResult(downloadResult)) {
    const { data, etag, lastModified } = downloadResult;

    const parsedData = await parser(data);

    const fileName = `${parsedData.parsedContent.date.slice(0, 10)}.pdf`;

    await uploadFile(data, fileName);

    await repo.save({
      etag: etag,
      lastModified: lastModified,
      createdAt: Date.now(),
      fileName,
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
