
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createProduct } from '../../services/productService';
import { getAllCategories } from '../../services/categoriesService';

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    category_id: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Load categories from Supabase
  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const data = await getAllCategories();

        if (active) {
          setCategories(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load categories.');
        }
      } finally {
        if (active) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

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

    setLoading(true);

    try {
      await createProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image_url: form.image_url.trim() || null,
        category_id: form.category_id || null,
      });

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Product Name"
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
            placeholder="Description"
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
            required
            value={form.price}
            onChange={handleChange}
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
            required
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="mb-2 block font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://example.com/product.jpg"
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
            disabled={categoriesLoading}
            className="w-full rounded-lg border bg-white p-3"
          >
            <option value="">
              {categoriesLoading
                ? 'Loading categories...'
                : 'Select Category'}
            </option>

            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || categoriesLoading}
          className="rounded-lg bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Create Product'}
        </button>
      </form>
    </main>
  );
}
