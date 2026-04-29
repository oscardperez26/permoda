import React from 'react';

interface Product {
  CODBARRAS: string;
  REFERENCIA: string;
  COLOR: string;
  TALLA: string;
  DESCRIPCION: string;
  LINEA: string;
  GENERO: string;
  imagenes: string;
  observacion: string;
  bruto: string;
}

interface Props {
  product: Product | null;
  notFound?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, notFound }) => {
  if (notFound) {
    return (
      <div className="not-found">
        <div className="not-found-icon">🔍</div>
        <p>No se encontró ningún producto con ese código.<br />Verifica e intenta de nuevo.</p>
      </div>
    );
  }

  if (!product) return null;

  const formatPrice = (raw: string) => {
    const n = Number(String(raw).replace(/[^\d]/g, ''));
    if (isNaN(n)) return raw;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);
  };

  const fields = [
    { label: 'Descripción', value: product.DESCRIPCION },
    { label: 'Color',       value: product.COLOR },
    { label: 'Talla',       value: product.TALLA },
    { label: 'Línea',       value: product.LINEA },
    { label: 'Género',      value: product.GENERO },
    { label: 'Código',      value: product.CODBARRAS },
  ];

  return (
    <div className="product-card">
      {/* Header negro con referencia */}
      <div className="product-card-header">
        <span className="product-badge">Producto encontrado</span>
        <span className="product-ref">{product.REFERENCIA}</span>
      </div>

      {/* Cuerpo: imagen + info */}
      <div className="product-body">
        <div className="product-image-wrap">
          {product.imagenes ? (
            <img src={product.imagenes} alt={product.REFERENCIA} />
          ) : (
            <div className="product-image-placeholder">📦</div>
          )}
        </div>
        <div className="product-info">
          {fields.map(({ label, value }) =>
            value ? (
              <div className="info-item" key={label}>
                <span className="info-label">{label}</span>
                <span className="info-value">{value}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Barra de precio */}
      <div className="product-price-bar">
        <span className="price-label">Precio bruto</span>
        <span className="price-value">{formatPrice(product.bruto)}</span>
      </div>

      {/* Observación */}
      {product.observacion && (
        <div className="product-obs">
          <strong>Observación:</strong> {product.observacion}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
