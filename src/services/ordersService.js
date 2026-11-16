
import { supabase } from '../utils/requests';

// Get orders for the logged-in user
export async function getMyOrders() {
  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error('You must be logged in.');

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      created_at,
      order_items (
        id,
        quantity,
        unit_price,
        product_id
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

// Get all orders - Admin only (enforced by RLS)
export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      status,
      created_at,
      order_items (
        id,
        quantity,
        unit_price,
        product_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

// Change order status - Admin only (enforced by RLS)

export async function updateOrderStatus(orderId, status) {
  const { error } = await supabase.rpc('update_order_status', {
    p_order_id: orderId,
    p_status: status,
  });

  if (error) {
    throw error;
  }
}




export async function createOrder(cart) {
  if (!cart.length) {
    throw new Error('Your cart is empty.');
  }

  const items = cart.map(product => ({
    product_id: product.id,
    quantity: product.quantity,
  }));

  const { data, error } = await supabase.rpc(
    'create_order',
    { p_items: items }
  );

  if (error) {
    throw error;
  }

  return data;
}



