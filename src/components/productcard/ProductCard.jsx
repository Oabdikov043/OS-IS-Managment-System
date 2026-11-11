
import { Link } from 'react-router';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.image}
      />

      <div className="p-5">
        <p className="mb-2 text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="mb-3 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mb-4 text-xl font-bold text-green-700">
          €{Number(product.price).toFixed(2)}
        </p>

        <Link
          to={`/products/${product.id}`}
          className={styles.detailsButton}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
