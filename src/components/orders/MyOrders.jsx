
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getMyOrders } from '../../services/ordersService';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="py-20 text-center">
        Loading orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-20 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-6 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="rounded-lg bg-green-800 px-6 py-3 text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map(order => {
            const total = (order.order_items || []).reduce(
              (sum, item) =>
                sum + Number(item.unit_price) * item.quantity,
              0
            );

            return (
              <article
                key={order.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold capitalize text-green-800">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 border-t pt-4">
                  <p className="text-gray-600">
                    Products: {order.order_items?.length || 0}
                  </p>

                  <p className="mt-3 text-xl font-bold text-green-800">
                    Total: €{total.toFixed(2)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
