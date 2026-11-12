
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getProductById } from '../../services/productService';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError('');
      setProduct(null);

      try {
        const data = await getProductById(productId);

        if (active) {
          setProduct(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load product.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <p className="py-16 text-center text-gray-500">
        Loading product...
      </p>
    );
  }

  if (error || !product) {
    return (
      <main className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">
          Product not found
        </h1>

        <Link to="/products" className="text-green-700">
          Back to Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/products"
        className="mb-8 inline-block text-green-700 hover:underline"
      >
        ← Back to Catalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          className={styles.productImage}
        />

        <div>
          <p className="mb-3 text-sm text-gray-500">
            {product.categories?.name || 'Uncategorized'}
          </p>

          <h1 className="mb-5 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mb-6 text-3xl font-bold text-green-700">
            €{Number(product.price).toFixed(2)}
          </p>

          <p className="mb-6 leading-7 text-gray-600">
            {product.description || 'No description available.'}
          </p>

          <p className="mb-6 text-sm">
            {product.stock > 0 ? (
              <span className="font-semibold text-green-700">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="font-semibold text-red-600">
                Out of Stock
              </span>
            )}
          </p>

          <button
            type="button"
            disabled
            className="rounded-lg bg-green-800 px-8 py-3 font-semibold text-white opacity-60"
            title="Shopping cart coming soon"
          >
            Add to Cart — Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}
