
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getAllProducts } from '../../services/productService';
import { deleteProduct } from '../../services/productService';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getAllProducts();

        if (active) setProducts(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const inStock = products.filter(p => p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock <= 0).length;

  if (loading) {
    return <p className="py-16 text-center">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="py-16 text-center text-red-600">{error}</p>;
  }


async function handleDelete(productId, productName) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${productName}"?`
  );

  if (!confirmed) return;

  setDeletingId(productId);
  setError('');

  try {
    await deleteProduct(productId);

    setProducts(prev =>
      prev.filter(product => product.id !== productId)
    );
  } catch (err) {
    setError(err.message || 'Failed to delete product.');
  } finally {
    setDeletingId(null);
  }
}


  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-500">
            Manage your store products
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="rounded-lg bg-green-800 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="mb-10 grid gap-5 sm:grid-cols-3">
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="In Stock" value={inStock} />
        <StatCard title="Out of Stock" value={outOfStock} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-green-50 text-green-900">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t border-gray-200">
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">€{Number(product.price).toFixed(2)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="font-medium text-green-700 hover:underline"
                    >
                      Edit
                    </Link>

                    
                 <button
                  type="button"
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={deletingId !== null}
                  className="font-medium text-red-600 hover:underline disabled:opacity-50">
                  {deletingId === product.id ? 'Deleting...' : 'Delete'}
                 </button>

                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-2 text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-green-800">{value}</p>
    </div>
  );
}
