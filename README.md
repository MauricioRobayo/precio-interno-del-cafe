# Precio interno del café

- [x] Parser
- [x] Uploader
- [x] Downloader
- [ ] refPriceRepository

## refPriceRepository

Should implement two methods:

- `getLatest(): Promise<RefPriceStorage>`
- `save(refPrice: RefPriceStorage): Promise<id>`

`Etag` should work as an external Id.

Use MongoDb.

---

```
const {eTag} = repo.getLatest();
downloader(eTag, 'destFile.pdf')
uploader('destFile.pdf')
const data = parser('destFile.pdf')
repo.save(data);
```
