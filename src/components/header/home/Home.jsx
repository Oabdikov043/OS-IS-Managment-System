
import { Link } from 'react-router';
import styles from './Home.module.css';

const categories = [
  { id: 1, name: 'Fruits & Vegetables', emoji: '🥦' },
  { id: 2, name: 'Dairy Products', emoji: '🥛' },
  { id: 3, name: 'Bakery', emoji: '🥐' },
];

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-4 font-semibold text-green-700">
            WELCOME TO OS&IS MARKET
          </p>

          <h1 className="mb-6 max-w-2xl text-5xl font-bold text-green-950">
            Fresh groceries, better everyday living.
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Quality products for your home, all in one place.
          </p>

          <Link to="/products" className={styles.shopButton}>
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-8 text-3xl font-bold">
          Shop by Category
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map(category => (
            <div key={category.id} className={styles.categoryCard}>
              <span className="text-5xl">{category.emoji}</span>
              <h3 className="mt-4 text-xl font-semibold">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
