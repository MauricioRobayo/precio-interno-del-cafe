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

export async function getFile(
  eTag?: string | null
): Promise<SuccessFulResponse | NotModifiedResponse> {
  const headers: { [k: string]: string } = {};

  if (eTag) {
    headers["If-None-Match"] = eTag;
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

function isSuccessFulResponse(
  response: SuccessFulResponse | NotModifiedResponse
): response is SuccessFulResponse {
  return response.status === 200;
}

export async function downloader(): Promise<ArrayBuffer | null> {
  let delayMs = 0;
  let retries = 0;
  const maxExecutionTime = 8 * 60 * 60 * 1000;
  const startTime = Date.now();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await getFile('"1a53c-5cbe534fe8477"'); // '"1a53c-5cbe534fe8477"'

    if (isSuccessFulResponse(response)) {
      return response.data;
    }

    const elapseTime = Date.now() - startTime;
    if (elapseTime >= maxExecutionTime) {
      console.log(`Max execution time reached. Tried for ${elapseTime}ms`);
      return null;
    }

    retries = retries + 1;
    delayMs = (delayMs + Math.floor(Math.random() * 60 * 1000)) * 2;
    console.log({ delayMs, retries });
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}
