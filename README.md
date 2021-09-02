# Precio interno del café

Exponential backoff to retrieve pdf file from https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf

Use ETAG validation on each request until we get a 200 response, keep trying using exponential backoff while we get a 304 response.

Save downloaded file to GCP storage.

Parse downloaded file, get as much information as possible and convert it to JSON.

Use MongoDb to save parsed info as JSON, as well as ETAG, modified time, execution time, and retries.
