import { Collection, MongoClient } from "mongodb";
import { getEnvVars } from "../shared";

const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION } = getEnvVars([
  "MONGODB_URL",
  "DB_NAME",
]);
const client = new MongoClient(MONGODB_URL);

export class RefPriceRepository {
  private client: Promise<MongoClient>;
  constructor(private collection: string) {
    this.client = client.connect();
  }

  protected async getCollection(): Promise<Collection<Document>> {
    const client = await this.client;
    const db = client.db(MONGODB_DB_NAME);
    return db.collection(MONGODB_COLLECTION);
  }
}
