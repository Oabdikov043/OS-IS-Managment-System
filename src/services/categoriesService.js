
import { supabase } from '../utils/requests';

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
