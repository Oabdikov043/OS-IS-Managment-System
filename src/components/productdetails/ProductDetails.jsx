
import { Link, useParams } from 'react-router';
import { mockProducts } from '../../data/mockProducts';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { productId } = useParams();

  const product = mockProducts.find(
    product => product.id === Number(productId)
  );

  if (!product) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-2xl font-bold">
          Product not found
        </h1>
        <Link to="/products" className="text-green-700">
          Back to Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className={styles.container}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
        />

        <div>
          <p className="mb-3 text-gray-500">
            {product.category}
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mb-6 text-3xl font-bold text-green-700">
            €{Number(product.price).toFixed(2)}
          </p>

          <p className="mb-8 text-gray-600">
            {product.description}
          </p>

          <Link to="/products" className={styles.backButton}>
            Back to Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
