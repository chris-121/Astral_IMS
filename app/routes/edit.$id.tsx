import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { Button, Page, TextField, FormLayout, Text } from '@shopify/polaris';
import {
  getProduct,
  createProduct,
  deleteAllProducts,
} from '../services/productServices';
import { Product } from '../types/product';

export function loader({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  return getProduct(id);
}

export default function ProductForm() {
  const navigate = useNavigate();
  const productData: Product = useLoaderData();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [error, setError] = useState('');

  const reset = useCallback(() => {
    setError('');
    if (!productData?.id) return;

    setName(productData.name);
    setQuantity(productData.quantity);
    setProductId(productData.id);
  }, [productData]);

  useEffect(() => {
    reset();
  }, [productData, reset]);

  const handleSave = async () => {
    setError('');
    if (!productId) return;

    const body = new URLSearchParams();
    body.append('name', name);
    body.append('quantity', quantity.toString());

    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      body,
    });

    if (response.ok) {
      navigate('/');
    } else {
      const error = await response.json();
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    setError('');
    const deleteConfirmation = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!deleteConfirmation || !productId) return;

    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      navigate('/');
    } else {
      const error = await response.json();
      console.error(error);
    }
  };

  return (
    <Page title={'Edit Product'}>
      {!!productId ? (
        <FormLayout>
          {!isTitleEditable ? (
            <div
              onDoubleClick={() => setIsTitleEditable(true)}
              style={{ cursor: 'pointer' }}
            >
              Product: {name}
            </div>
          ) : (
            <TextField
              label={'Product'}
              value={name}
              onChange={(value) => setName(value)}
            />
          )}

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(value) => setQuantity(parseInt(value, 10))}
          />
          {!!error && <Text tone={'critical'}>Error: {error}</Text>}
          {productId && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button tone="critical" destructive onClick={handleDelete}>
                Delete
              </Button>
              <div>
                <Button onClick={reset}>Reset</Button>
                <Button primary onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </FormLayout>
      ) : (
        <>Product does not exists</>
      )}
    </Page>
  );
}
