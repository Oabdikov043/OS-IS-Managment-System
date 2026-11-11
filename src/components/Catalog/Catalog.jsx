
import ProductCard from '../../components/productcard/ProductCard';
import { mockProducts } from '../../data/mockProducts';

export default function Catalog() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
