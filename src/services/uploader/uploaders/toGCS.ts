import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import { getEnvVars } from "../../../shared";

dotenv.config();

const bucketName = "precio-interno-del-cafe";
const envVarPrefix = "GCP_CREDENTIAL_";
const credentialProperties = [
  "type",
  "project_id",
  "private_key_id",
  "private_key",
  "client_email",
  "client_id",
  "auth_uri",
  "token_uri",
  "auth_provider_x509_cert_url",
  "client_x509_cert_url",
];
const requiredEnvVars = credentialProperties.map((property) =>
  `${envVarPrefix}${property}`.toUpperCase()
);
const credentials = getEnvVars(requiredEnvVars);
const storage = new Storage({ credentials });

export async function toGCS(fileName: string, destName = ""): Promise<void> {
  try {
    await storage.bucket(bucketName).upload(fileName, {
      destination: destName || fileName,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    process.exit(1);
  }
}
