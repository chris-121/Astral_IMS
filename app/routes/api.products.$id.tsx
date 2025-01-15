import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productServices';

export let action: ActionFunction = async ({ request, params }) => {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get('name');
  const quantity = parseInt(formData.get('quantity') || '1', 10);
  const id = parseInt(params.id, 10);

  if (request.method === 'POST' && !id) {
    if (!quantity || quantity <= 0)
      return json(
        { message: 'Quantity should be greater than 0' },
        { status: 400 }
      );

    const newProduct = await createProduct(name, quantity);
    return json(newProduct);
  }

  if (request.method === 'PUT' && id) {
    if (!name || !quantity || quantity < 0) {
      return json(
        { message: 'Name and quantity are required' },
        { status: 400 }
      );
    }

    const updatedProduct = await updateProduct(id, name, quantity);
    return json(updatedProduct);
  }

  if (request.method === 'DELETE' && id) {
    await deleteProduct(id);
    return json({ success: true });
  }

  return json({ message: 'Invalid request' }, { status: 400 });
};
