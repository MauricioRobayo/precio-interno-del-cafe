import { toGCS } from "./uploaders";

export type Uploader = (fileName: string, destName: string) => Promise<void>;

export async function uploadFile(
  fileName: string,
  destName = ""
): Promise<void> {
  await toGCS(fileName, destName);
}
