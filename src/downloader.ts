import axios from "axios";

const url =
  "https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf";

export async function downloader(): Promise<{etag: string, lastModified: string, arraybuffer: Buffer}> {
  try {
    const { data, headers} = await axios.get<Buffer>(url, {
      responseType: "arraybuffer",
    });

    const {
      etag,
      "last-modified": lastModified,
    }: { etag: string; "last-modified": string } = headers;

    return { etag, lastModified, arraybuffer: data });
  } catch (err) {
      console.log(err);
    process.exit(1);
  }
}
