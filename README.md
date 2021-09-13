# Precio interno del café

## Downloader

Start at a predefined hour, let's say at 1:00pm.

Retrieve ETag from MongoDB.

Request file using ETag validation, we should get 302 (not modified) response while the pdf is the same as the latest previous ETag.

Loop until we get a 200 response, reached max number of retries, or reached certain time

## Parser

Implemented.

## Uploader

https://www.coralnodes.com/amazon-s3-alternatives/

Should export a single method `uploadToStorage(file)` which is a wrapper over a single storage:

```
function uploadToStorage(file) {
  return toGCS(file)
}
```

```
uploader
├── index.ts // exports `upload` function
├── uploadToStorage.ts // wrapper over the multiple uploaders
└── uploaders
    ├── index.ts
    ├── toGCS.ts
    ├── toS3
    └── ...
```

## refPriceRepository

- getETag
- save

```

```
