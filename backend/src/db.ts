import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })
  : new Pool({
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "permoda",
      password: process.env.DB_PASSWORD || "admin1234",
      port: Number(process.env.DB_PORT || 5432),
    });

// Test de conexión
pool.connect()
  .then(client => {
    console.log("Conectado a PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("Error conectando a PostgreSQL:", err);
  });
