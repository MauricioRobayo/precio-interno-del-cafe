import { Collection, InsertOneResult, MongoClient } from "mongodb";
import { RefPriceStorage } from "../models/ref-price";
import { getEnvVars } from "../shared";

const { MONGODB_URI, MONGODB_DB_NAME, MONGODB_COLLECTION } = getEnvVars([
  "MONGODB_URI",
  "MONGODB_DB_NAME",
  "MONGODB_COLLECTION",
]);
const client = new MongoClient(MONGODB_URI);

export class RefPriceRepository {
  private client: Promise<MongoClient>;
  constructor(private collection: string) {
    this.client = client.connect();
  }

  async getLatest(): Promise<RefPriceStorage> {
    const collection = await this.getCollection();

    const refPriceResult = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    return refPriceResult[0];
  }

  async save(
    refPrice: RefPriceStorage
  ): Promise<InsertOneResult<RefPriceStorage>> {
    const collection = await this.getCollection();

    return collection.insertOne(refPrice);
  }

  protected async getCollection(): Promise<Collection<RefPriceStorage>> {
    const client = await this.client;
    const db = client.db(MONGODB_DB_NAME);
    return db.collection<RefPriceStorage>(MONGODB_COLLECTION);
  }
}
