import React, { useMemo } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { Button, Page, Card, DataTable, Text } from '@shopify/polaris';
import { getAllProducts } from '../services/productServices';
import { Product } from '../types/product';

export function loader() {
  return getAllProducts();
}

function Home() {
  const navigate = useNavigate();
  const products: Product[] = useLoaderData();

  const rows = useMemo(() => {
    return products.map((product) => [
      <Text variation="strong" key={`name-${product.id}`}>
        {product.name}
      </Text>,
      <Text variation="strong" key={`quantity-${product.id}`}>
        {product.quantity}
      </Text>,
      <Link to={`/edit/${product.id}`} key={`edit-${product.id}`}>
        <Button primary>Edit</Button>
      </Link>,
    ]);
  }, [products]);

  const createProduct = async () => {
    const body = new URLSearchParams();
    body.append('name', '');
    body.append('quantity', '1');

    try {
      const response = await fetch(`/api/products/0`, {
        method: 'POST',
        body,
      });

      if (response.ok) {
        const { id } = await response.json();
        navigate(`/edit/${id}`);
      } else {
        const error = await response.json();
        console.error('Error creating product:', error);
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <Page>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', margin: 8 }}
      >
        <Text variant={'headingLg'} as={'h6'}>
          Inventory
        </Text>
        <Button onClick={createProduct} primary>
          Create
        </Button>
      </div>
      <Card>
        <DataTable
          columnContentTypes={['text', 'numeric', 'text']}
          headings={['Name', 'Quantity', 'Action']}
          rows={rows}
        />
      </Card>
    </Page>
  );
}

export default Home;
