# Precio interno del café

Downloads, parses, and saves [_Precio Interno de Referencia_](https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf) pdf files from the [Federación Nacional de Cafeteros](https://federaciondecafeteros.org).

#### Download

Download the file using exponential back-off and ETag `If-Not-Modified` header.

#### Parse

Extracts relevant information and saves it in a MongoDb document.

#### Save

Save the downloaded document on the cloud.

## LICENSE

[MIT](LICENSE)
