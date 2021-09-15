export function getEnvVars(vars: string[]): string[] {
  const missingEnvVars: string[] = [];
  const envVars: string[] = [];

  for (const envVar of vars) {
    const value = process.env[envVar];

    if (value === undefined || value === "") {
      missingEnvVars.push(envVar);
    } else {
      envVars.push(value);
    }
  }

  if (missingEnvVars.length > 0) {
    console.error("ERROR! Missing env vars:", missingEnvVars.join("\n\t"));
    process.exit(1);
  }

  return envVars;
}
