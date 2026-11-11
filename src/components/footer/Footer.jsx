
import { Link } from 'react-router';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* About */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              OS&IS Market
            </h2>

            <p className="text-green-100">
              Quality products and great prices
              for your everyday shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <nav className="flex flex-col gap-3">
              <Link to="/" className={styles.link}>
                Home
              </Link>

              <Link to="/products" className={styles.link}>
                Catalog
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-green-100">
              <p>
                📍 Gotse Delchev, Bulgaria
                <span className="block">
                  59 Gotse Delchev Blvd.
                </span>
              </p>

              <p>
                👤 Osman Abdikov
              </p>

              <a
                href="tel:+359896086976"
                className={styles.link}
              >
                📞 089 608 6976
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Follow Us
            </h3>

            <p className="text-green-100">
              Facebook — OS&IS Market
            </p>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} OS&IS Market.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
