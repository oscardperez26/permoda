/**
 * src/server.ts
 * Servidor Express que expone endpoint para productos
 */

import express from "express";
import cors from "cors";
import productsRouter from "./routes/products";

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "https://oscardperez26.github.io",
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
})); // permite todas las conexiones       // Permite que el frontend acceda a la API
app.use(express.json()); // Parseo de JSON automáticamente

app.get("/", (req, res) => {
  res.status(200).send("API Permoda OK  Usa /api/products");
});


// Rutas
app.use("/api/products", productsRouter);

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
