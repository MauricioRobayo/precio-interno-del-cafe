import axios from "axios";
import fs from "fs/promises";

type SuccessFulResponse = {
  status: 200;
  data: ArrayBuffer;
};
type NotModifiedResponse = {
  status: 304;
  data: null;
};

const fileUrl =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

export class FileDownloader {
  constructor(private eTag: string | null) {}

  async getFile(): Promise<SuccessFulResponse | NotModifiedResponse> {
    const headers: { [k: string]: string } = {};

    if (this.eTag) {
      headers["If-None-Match"] = this.eTag;
    }

    try {
      const { data } = await axios.get<ArrayBuffer>(fileUrl, {
        responseType: "arraybuffer",
        headers,
      });

      return { status: 200, data };
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 304) {
        return { status: 304, data: null };
      }

      throw new Error(`downloadFile: get request failed ${err}`);
    }
  }

  async getFileWithExponentialBackOff(
    maxExecutionTime = 8 * 60 * 60 * 1000
  ): Promise<ArrayBuffer | null> {
    let delayMs = 0;
    let retries = 0;
    const startTime = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await this.getFile();

      if (isSuccessFulResponse(response)) {
        return response.data;
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

function isSuccessFulResponse(
  response: SuccessFulResponse | NotModifiedResponse
): response is SuccessFulResponse {
  return response.status === 200;
}

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const fd = new FileDownloader('"1a53c-5cbe534fe8477"');
fd.getFileWithExponentialBackOff();
