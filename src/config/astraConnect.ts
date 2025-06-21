import { DataAPIClient } from "@datastax/astra-db-ts";

// Initialize the client
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN as string);
const db = client.db(process.env.ASTRA_DB_ENDPOINT as string, {
    namespace: process.env.ASTRA_DB_KEYSPACE as string
});
