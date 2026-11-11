
import { Link } from 'react-router';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} bg-white shadow-sm`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className={styles.logo}>
          OS&IS Market
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          <Link to="/products" className={styles.navLink}>
            Catalog
          </Link>

          <Link to="/login" className={styles.navLink}>
            Login
          </Link>

          <Link to="/register" className={styles.registerButton}>
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
