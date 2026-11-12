
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';
import styles from './Header.module.css';

export default function Header() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  

  const [logoutError, setLogoutError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  async function logoutHandler() {
    setLogoutError('');
    setLoggingOut(true);

    try {
      await logout();
      navigate('/');
    } catch (err) {
      setLogoutError(err.message || 'Logout failed.');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className={`${styles.header} bg-white shadow-sm`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className={styles.logo}>
          OS&IS Market
        </Link>

        <nav className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          <Link to="/products" className={styles.navLink}>
            Catalog
          </Link>
          <Link to="/profile" className={styles.navLink}>
            My Profile
          </Link>

          {isAdmin && (
           <Link to="/admin" className={styles.navLink}>
              Admin Dashboard
            </Link>
)}

          

          {!loading && (
            user ? (
              <>
                <span className="max-w-48 truncate text-sm text-gray-600">
                  {user.email}
                </span>

                <button
                  type="button"
                  onClick={logoutHandler}
                  disabled={loggingOut}
                  className={styles.logoutButton}
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>
                  Login
                </Link>

                <Link to="/register" className={styles.registerButton}>
                  Register
                </Link>
              </>
            )
          )}
        </nav>
      </div>

      {logoutError && (
        <p role="alert" className="px-6 pb-3 text-center text-sm text-red-600">
          {logoutError}
        </p>
      )}
    </header>
  );
}
