
import { supabase } from '../utils/requests';

// GET ALL PRODUCTS
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

// GET SINGLE PRODUCT
export async function getProductById(productId) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('id', productId)
    .single();

  if (error) throw error;

  return data;
}

// CREATE PRODUCT - ADMIN ONLY
export async function createProduct(productData) {
  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error('Authentication required.');

  const { data, error } = await supabase
    .from('products')
    .insert({
      ...productData,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// UPDATE PRODUCT - ADMIN ONLY
export async function updateProduct(productId, productData) {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// DELETE PRODUCT - ADMIN ONLY

export async function deleteProduct(productId) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .select('id');

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error('Product not deleted. Check your permissions.');
  }
}
