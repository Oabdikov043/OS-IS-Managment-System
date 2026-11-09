
import { useEffect, useState } from 'react';
import { supabase } from './utils/requests.js';


function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');

        if (error) {
          throw error;
        }

        setCategories(data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>OS&IS Market</h1>
      <h2>Categories from Supabase:</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map((category) => (
          <div key={category.id}>
            <h3>{category.name}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
