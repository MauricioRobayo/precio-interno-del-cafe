import { Storage } from "@google-cloud/storage";
import { getEnvVars } from "../../../shared";

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

const credentials = Object.fromEntries(
  Object.entries(gcpEnvVars).map(([key, value]) => [
    key.replace("GCP_CREDENTIAL_", "").toLowerCase(),
    value,
  ])
);

const storage = new Storage({ credentials });

export async function toGCS(data: Buffer, destName: string): Promise<void> {
  const fileExists = await storage.bucket(bucketName).file(destName).exists();

  if (fileExists) {
    console.log(
      `toGCP: File '${destName}' already in bucket, skipping upload.`
    );
    return;
  }

  await storage.bucket(bucketName).file(destName).save(data);
}

(async () => {
  const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
  toGCS(buf, "test").catch(console.log);
})();
