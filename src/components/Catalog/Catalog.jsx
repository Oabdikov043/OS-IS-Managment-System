
import { useEffect, useState } from 'react';
import ProductCard from '../productcard/ProductCard';
import { getAllProducts } from '../../services/productService';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const data = await getAllProducts();

        if (active) {
          setProducts(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="py-16 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="py-16 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Our Products
      </h1>

      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
