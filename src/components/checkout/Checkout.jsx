
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { createOrder } from '../../services/ordersService';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { cart, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);

  async function handleCheckout() {
    if (loading || orderId !== null) return;

    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);

    try {
      const newOrderId = await createOrder(cart);

      setOrderId(newOrderId);
      clearCart();
    } catch (err) {
      setError(err.message || 'Failed to create order.');
    } finally {
      setLoading(false);
    }
  }

  if (orderId !== null) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="mb-5 text-3xl font-bold text-green-800">
          Order Placed Successfully!
        </h1>

        <p className="mb-3 text-gray-600">
          Thank you for your order.
        </p>

        <p className="mb-8 text-xl font-semibold">
          Order Number: #{orderId}
        </p>

        <Link
          to="/products"
          className="rounded-lg bg-green-800 px-6 py-3 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Checkout
      </h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">
          Order Summary
        </h2>

        {cart.map(product => (
          <div
            key={product.id}
            className="flex justify-between border-b py-4"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                Quantity: {product.quantity}
              </p>
            </div>

            <p className="font-semibold">
              €{(Number(product.price) * product.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="mt-6 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-green-700">
            €{cartTotal.toFixed(2)}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Final prices and availability are verified when
          you place the order.
        </p>

        {error && (
          <p role="alert" className="mt-5 text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading || cart.length === 0}
          className="mt-8 w-full rounded-lg bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </main>
  );
}
