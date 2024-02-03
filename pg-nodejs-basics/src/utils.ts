import { Client } from "pg";
import "dotenv/config";

export const getClient = async () => {
  const client = new Client(
    `postgresql://${process.env.NEON_DB_USERNAME}:${process.env.NEON_DB_PASSWORD}@ep-polished-violet-a1jx6qj3.ap-southeast-1.aws.neon.tech/test?sslmode=require`
  );
  await client.connect();
  return client;
};
