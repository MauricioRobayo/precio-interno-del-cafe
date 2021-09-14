import axios from "axios";
import fs from "fs/promises";

enum StatusCode {
  success = 200,
  notModified = 304,
}

const fileUrl =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

export class FileDownloader {
  constructor(private eTag: string | null, private destFile: string) {}

  async downloadFile(): Promise<StatusCode> {
    const headers: { [k: string]: string } = {};

    if (this.eTag) {
      headers["If-None-Match"] = this.eTag;
    }

    try {
      const { data } = await axios.get<ArrayBuffer>(fileUrl, {
        responseType: "arraybuffer",
        headers,
      });

      fs.writeFile(this.destFile, Buffer.from(data));

      return StatusCode.success;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 304) {
        return StatusCode.notModified;
      }

      throw new Error(`downloadFile: get request failed ${err}`);
    }
  }

  async downloadFileWithExponentialBackOff(
    maxExecutionTime = 8 * 60 * 60 * 1000
  ): Promise<string | null> {
    let delayMs = 0;
    let retries = 0;
    const startTime = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const status = await this.downloadFile();

      if (status === StatusCode.success) {
        return this.destFile;
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
