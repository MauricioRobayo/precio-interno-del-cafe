import axios from "axios";
import fs from "fs/promises";

export enum StatusCode {
  success = 200,
  notModified = 304,
}

const fileUrl =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

interface DownloadResult {
  status: StatusCode;
  etag: string;
  lastModified: string;
  fileName: string;
}

export class FileDownloader {
  constructor(private etag: string | null) {}

  async downloadFile(): Promise<DownloadResult | null> {
    const headers: { [k: string]: string } = {};

    if (this.etag) {
      headers["If-None-Match"] = this.etag;
    }

    try {
      const {
        data,
        headers: { etag, "last-modified": lastModified },
      } = await axios.get<ArrayBuffer>(fileUrl, {
        responseType: "arraybuffer",
        headers,
      });

      const fileName = `${etag.replace(/"/g, "")}.pdf`;
      fs.writeFile(fileName, Buffer.from(data));

      return {
        etag,
        fileName,
        lastModified,
        status: StatusCode.success,
      };
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response?.status === StatusCode.notModified
      ) {
        return null;
      }

      throw new Error(`downloadFile: get request failed ${err}`);
    }
  }

  async downloadFileWithExponentialBackOff(
    maxExecutionTime = 8 * 60 * 60 * 1000
  ): Promise<
    | (DownloadResult & {
        retries: number;
        elapseTimeMs: number;
      })
    | null
  > {
    let delayMs = 0;
    let retries = 0;
    const startTime = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const downloadResult = await this.downloadFile();
      const elapseTimeMs = Date.now() - startTime;

      if (downloadResult?.status === StatusCode.success) {
        return {
          ...downloadResult,
          retries,
          elapseTimeMs,
        };
      }

      if (elapseTimeMs >= maxExecutionTime) {
        console.warn(`Max execution time reached. Tried for ${elapseTimeMs}ms`);
        return null;
      }

      retries = retries + 1;

      const randomDeltaMs = randBetween(60 * 1000, 4 * 60 * 1000);
      delayMs = (delayMs + randomDeltaMs) * 2;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
