import { Storage } from "@google-cloud/storage";
import { getEnvVars } from "../../../shared";

const { GCS_BUCKET_NAME } = getEnvVars(["GCS_BUCKET_NAME"]);

const storage = new Storage();
const bucket = storage.bucket(GCS_BUCKET_NAME);

export async function toGCS(data: Buffer, destName: string): Promise<void> {
  const file = bucket.file(destName);

  const [fileExists] = await file.exists();

  if (fileExists) {
    console.log(`toGCP: file '${destName}' already exists, skipping upload.`);
    return;
  }

  await file.save(data);
}
