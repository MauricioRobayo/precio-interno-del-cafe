import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import { getEnvVars } from "../../../shared";

dotenv.config();

const bucketName = "ref-price";
const gcpEnvVars = getEnvVars([
  "GCP_CREDENTIAL_TYPE",
  "GCP_CREDENTIAL_PROJECT_ID",
  "GCP_CREDENTIAL_PRIVATE_KEY_ID",
  "GCP_CREDENTIAL_PRIVATE_KEY",
  "GCP_CREDENTIAL_CLIENT_EMAIL",
  "GCP_CREDENTIAL_CLIENT_ID",
  "GCP_CREDENTIAL_AUTH_URI",
  "GCP_CREDENTIAL_TOKEN_URI",
  "GCP_CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL",
  "GCP_CREDENTIAL_CLIENT_X509_CERT_URL",
]);

const storage = new Storage({
  credentials: Object.fromEntries(
    Object.entries(gcpEnvVars).map(([key, value]) => [
      key.replace("GCP_CREDENTIAL_", "").toLowerCase(),
      value,
    ])
  ),
});

export async function toGCS(data: Buffer, destName: string): Promise<void> {
  try {
    await storage.bucket(bucketName).file(destName).save(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    process.exit(1);
  }
}
