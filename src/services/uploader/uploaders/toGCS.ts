import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucket = storage.bucket("ref-price");

export async function toGCS(data: Buffer, destName: string): Promise<void> {
  const file = bucket.file(destName);

  const [fileExists] = await file.exists();

  if (fileExists) {
    console.log(`toGCP: file '${destName}' already exists, skipping upload.`);
    return;
  }

  await file.save(data);
}
