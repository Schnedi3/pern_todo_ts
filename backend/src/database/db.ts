import { Pool } from "pg";

import {
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
} from "../config/config";

export const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT as unknown as number,
  database: PG_DATABASE,
});
