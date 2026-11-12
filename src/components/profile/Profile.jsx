
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-green-800">
        My Profile
      </h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="mb-3">
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>User ID:</strong> {user.id}
        </p>
      </div>
    </main>
  );
}
