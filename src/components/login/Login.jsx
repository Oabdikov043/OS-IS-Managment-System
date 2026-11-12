
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../../services/authService';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function changeHandler(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      await login(form.email.trim(), form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-green-50 px-4 py-12">
      <div className={styles.card}>
        <h1 className="mb-2 text-center text-3xl font-bold text-green-800">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to your OS&IS Market account
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              className={styles.input}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              className={styles.input}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-green-700">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
