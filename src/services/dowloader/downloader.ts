import axios from "axios";
import fs from "fs/promises";

const fileUrl =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

export async function downloadFile(
  destFile: string,
  eTag: string
): Promise<void> {
  try {
    const { data } = await axios.get<ArrayBuffer>(fileUrl, {
      responseType: "arraybuffer",
      headers: {
        "If-None-Match": eTag,
      },
    });

    fs.writeFile(destFile, Buffer.from(data));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 304) {
      console.log("Not modified");
      return;
    }
    throw new Error(`downloadFile: get request failed ${err}`);
  }
}
