
import { Link } from 'react-router';
import { useCart } from '../../contexts/CartContext';


export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-800">
          Your Cart
        </h1>

        <p className="mb-8 text-gray-500">
          Your shopping cart is empty.
        </p>

        <Link
          to="/products"
          className="rounded-lg bg-green-800 px-6 py-3 text-white"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-green-800">
        Shopping Cart ({cartCount})
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          {cart.map(product => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-5 rounded-xl border border-gray-200 bg-white p-5"
            >
              <img
                src={product.image_url || '/placeholder.png'}
                alt={product.name}
                className="h-24 w-24 rounded-lg object-contain"
              />

              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${product.id}`}
                  className="text-lg font-semibold hover:text-green-700"
                >
                  {product.name}
                </Link>

                <p className="mt-2 font-bold text-green-700">
                  €{Number(product.price).toFixed(2)}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Available: {product.stock}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(product.id, product.quantity - 1)
                  }
                  disabled={product.quantity <= 1}
                  className="rounded border px-3 py-1 disabled:opacity-40"
                >
                  −
                </button>

                <span className="min-w-5 text-center">
                  {product.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                  disabled={product.quantity >= product.stock}
                  className="rounded border px-3 py-1 disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-bold">
            Order Summary
          </h2>

          <div className="mb-6 flex justify-between">
            <span className="text-gray-600">
              Items ({cartCount})
            </span>

            <span className="font-medium">
              €{cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="mb-6 border-t pt-5">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>

              <span className="text-xl font-bold text-green-700">
                €{cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

         <Link
  to="/checkout"
  className="block rounded-lg bg-green-800 px-5 py-3 text-center font-semibold text-white hover:bg-green-700"
>
  Proceed to Checkout
</Link>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm text-green-700 hover:underline"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
