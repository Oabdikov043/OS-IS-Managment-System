
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '../../services/authService';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  function changeHandler(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.email.trim()) {
      setError('Email is required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await register(
        form.email.trim(),
        form.password
      );

      if (data.session) {
        navigate('/');
      } else {
        setSuccess(
          'Registration successful! Check your email to confirm your account.'
        );
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-green-50 px-4 py-12">
      <div className={styles.card}>
        <h1 className="mb-2 text-center text-3xl font-bold text-green-800">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Join OS&IS Market today
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
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={changeHandler}
              className={styles.input}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-700">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
