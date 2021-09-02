import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const bucketName = "precio-interno-del-cafe";
const credentialEnvVarPrefix = "GCP_CREDENTIAL_";
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

const credentials: Record<string, string> = {};
const missing = [];
for (const property of credentialProperties) {
  const envVarName = `${credentialEnvVarPrefix}${property}`.toUpperCase();
  const envVar = process.env[envVarName];
  if (!envVar) {
    missing.push(envVarName);
    continue;
  }
  credentials[property] = envVar;
}

if (missing.length > 0) {
  console.log("ERROR! Missing env vars:");
  for (const missingEnvVar of missing) {
    console.log(`\t${missingEnvVar}`);
  }
  process.exit(1);
}

const storage = new Storage({ credentials });

export async function uploadFile(
  fileName: string,
  destName: string
): Promise<void> {
  try {
    await storage.bucket("bucketName").upload(fileName, {
      destination: destName,
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
