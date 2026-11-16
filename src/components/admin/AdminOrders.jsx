
import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/ordersService';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


const [updatingId, setUpdatingId] = useState(null);

async function handleStatusChange(orderId, newStatus) {
  setUpdatingId(orderId);
  setError('');

  try {
    await updateOrderStatus(orderId, newStatus);

    setOrders(previousOrders =>
      previousOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  } catch (err) {
    setError(err.message);
  } finally {
    setUpdatingId(null);
  }
}


  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getAllOrders();
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

  // Show errors inside the page instead of replacing the entire page.

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Manage Orders
      </h1>

      {error && (
         <p role="alert" className="mb-5 text-red-600">
       {error}
         </p>
    ) }

      {orders.length === 0 ? (
        <p className="text-gray-500">
          No orders found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse bg-white text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Customer ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => {
                const items = order.order_items || [];

                const total = items.reduce(
                  (sum, item) =>
                    sum +
                    Number(item.unit_price) * item.quantity,
                  0
                );

                return (
                  <tr
                    key={order.id}
                    className="border-t border-gray-200"
                  >
                    <td className="p-4 font-semibold">
                      #{order.id}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {order.user_id.slice(0, 8)}...
                    </td>

                    <td className="p-4">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString('en-GB')}
                    </td>

                    <td className="p-4">
                      {items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </td>

                    <td className="p-4 font-semibold">
                      €{total.toFixed(2)}
                    </td>

                    
            <td className="p-4">
              <select
                  value={order.status}
                  disabled={updatingId !== null}
                  onChange={event =>
                     handleStatusChange(order.id, event.target.value)}
                 className="rounded-lg border border-gray-300 bg-white px-3 py-2">
    <option value="pending">Pending</option>
    <option value="confirmed">Confirmed</option>
    <option value="shipped">Shipped</option>
    <option value="delivered">Delivered</option>
    <option value="cancelled">Cancelled</option>
  </select>
</td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
