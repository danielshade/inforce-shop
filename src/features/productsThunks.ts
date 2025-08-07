// Асинхронні дії (Thunks) для роботи з API продуктів
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/models';

const API_URL = 'http://localhost:5001/products';

type NewProductData = Omit<Product, 'id' | 'comments'>;
type UpdateProductData = Partial<NewProductData> & { id: number };

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(API_URL);
  return (await response.json()) as Product[];
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData: NewProductData) => {
  const newProduct = { ...productData, comments: [] };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  return (await response.json()) as Product;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: number) => {
  await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });
  return productId;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (productData: UpdateProductData) => {
    const response = await fetch(`${API_URL}/${productData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return (await response.json()) as Product;
  }
);