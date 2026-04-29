import React, { useState } from 'react';
import Header from './components/Header';
import ScannerInput from './components/ScannerInput';
import ProductCard from './components/ProductCard';
import { getProductBycod } from './services/api';

const App: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (code: string) => {
    setNotFound(false);
    setProduct(null);
    try {
      const data = await getProductBycod(code);
      if (data) {
        setProduct(data);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <ScannerInput onSearch={handleSearch} />
        <ProductCard product={product} notFound={notFound} />
      </main>
    </>
  );
};

export default App;
