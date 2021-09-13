# Precio interno del café

## Downloader

Start at a predefined hour, let's say at 1:00pm.

Retrieve ETag from MongoDB.

Request file using ETag validation, we should get 302 (not modified) response while the pdf is the same as the latest previous ETag.

Loop until we get a 200 response, reached max number of retries, or reached certain time

# Precio interno del café

- [x] Parser
- [x] Uploader
- [ ] refPriceRepository

## refPriceRepository

This should implement two methods:

- `getLatest(): Promise<RefPriceStorage>`
- `save(refPrice: RefPriceStorage): Promise<id>`

`Etag` should work as an external Id.

```

```
