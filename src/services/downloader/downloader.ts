import axios from "axios";
import fs from "fs/promises";

export enum StatusCode {
  success = 200,
  notModified = 304,
}

const fileUrl =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

export class FileDownloader {
  constructor(private etag: string | null, private destFile: string) {}

  async downloadFile(): Promise<{
    status: StatusCode;
    etag: string;
    lastModified: string;
  } | null> {
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

      fs.writeFile(this.destFile, Buffer.from(data));

      console.log({ etag, lastModified });

      return { status: StatusCode.success, etag, lastModified };
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
  ): Promise<{
    status: StatusCode;
    etag: string;
    lastModified: string;
  } | null> {
    let delayMs = 0;
    let retries = 0;
    const startTime = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await this.downloadFile();

      if (response?.status === StatusCode.success) {
        return response;
      }

      const elapseTime = Date.now() - startTime;
      if (elapseTime >= maxExecutionTime) {
        console.log(`Max execution time reached. Tried for ${elapseTime}ms`);
        return null;
      }

      retries = retries + 1;

      const randomDeltaMs = randBetween(60 * 1000, 120 * 1000);
      delayMs = (delayMs + randomDeltaMs) * 2;

      console.log({ delayMs, retries });

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
