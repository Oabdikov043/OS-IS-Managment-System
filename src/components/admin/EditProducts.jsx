
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import {
  getProductById,
  updateProduct,
} from '../../services/productService';

import { getAllCategories } from '../../services/categoriesService';

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [product, categoryList] = await Promise.all([
          getProductById(productId),
          getAllCategories(),
        ]);

        if (!active) return;

        setForm({
          name: product.name ?? '',
          description: product.description ?? '',
          price: String(product.price ?? ''),
          stock: String(product.stock ?? ''),
          image_url: product.image_url ?? '',
          category_id: product.category_id ?? '',
        });

        setCategories(categoryList);
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load product.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [productId]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (
      !form.name.trim() ||
      form.price === '' ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0 ||
      form.stock === '' ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      setError('Please enter valid product details.');
      return;
    }

    setSaving(true);

    try {
      await updateProduct(productId, {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image_url: form.image_url.trim() || null,
        category_id: form.category_id || null,
      });

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to update product.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="py-16 text-center">
        Loading product...
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link to="/admin" className="mb-6 inline-block text-green-700">
        ← Back to Dashboard
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Edit Product
      </h1>

      {error && (
        <p role="alert" className="mb-5 text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-2 block font-medium">
            Price (€)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-2 block font-medium">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="mb-2 block font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="mb-2 block font-medium">
            Product Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full rounded-lg border bg-white p-3"
          >
            <option value="">Select Category</option>

            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving || Boolean(error)}
          className="rounded-lg bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
