**Moved to [cafetal](https://github.com/MauricioRobayo/cafetal)**

# Precio interno del café

[![coffee reference price](https://github.com/MauricioRobayo/precio-interno-del-cafe/actions/workflows/processRefPrice.yml/badge.svg)](https://github.com/MauricioRobayo/precio-interno-del-cafe/actions/workflows/processRefPrice.yml)
[![build and test](https://github.com/MauricioRobayo/precio-interno-del-cafe/actions/workflows/main.yml/badge.svg)](https://github.com/MauricioRobayo/precio-interno-del-cafe/actions/workflows/main.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/mauriciorobayo/precio-interno-del-cafe/badge)](https://www.codefactor.io/repository/github/mauriciorobayo/precio-interno-del-cafe)

Downloads, parses, and saves [_Precio Interno de Referencia_](https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe-1.pdf) pdf files from the [Federación Nacional de Cafeteros](https://federaciondecafeteros.org).

#### Download

Download the file using exponential back-off and ETag `If-Not-Modified` header.

#### Parse

Extracts relevant information and saves it in a MongoDb document.

#### Save

Save the downloaded document on the cloud.

## LICENSE

[MIT](LICENSE)
