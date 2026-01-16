/**
 * src/routes/products.ts
 * Endpoint para consultar productos por código de barras
 */

import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

/**
 * GET /api/products/:ean
 */
router.get("/:ean", async (req: Request, res: Response) => {
  const ean = req.params.ean;

  try {
    const result = await pool.query(
      `SELECT
          codbarras,
          referencia,
          codigo,
          descripcion,
          talla,
          color,
          departamento,
          seccion,
          marca,
          linea,
          temporada,
          genero,
          concepto,
          estilo_de_vida,
          clasificacion_produc,
          caracteristica_fit,
          estilo_silueta,
          tipo_estampado,
          bruto,
          obs_simon,
          observacion,
          descuento,
          imagenes
       FROM productos_excel
       WHERE codbarras = $1`,
      [ean]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error consultando producto:", error);
    res.status(500).json({ error: "Error al consultar producto" });
  }
});

export default router;
