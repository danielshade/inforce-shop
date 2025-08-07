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

interface CommentPayload {
  productId: number;
  comment: {
    description: string;
  };
}

export const addComment = createAsyncThunk(
  'products/addComment',
  async ({ productId, comment }: CommentPayload, { getState }) => {
    // Отримуємо поточний стан продукту, щоб додати до нього коментар
    const response = await fetch(`${API_URL}/${productId}`);
    const productToUpdate: Product = await response.json();

    const newComment = {
      ...comment,
      id: Date.now(), // Простий спосіб генерації унікального ID
      productId: productId,
      date: new Date().toLocaleString(),
    };

    const updatedProduct = {
      ...productToUpdate,
      comments: [...productToUpdate.comments, newComment],
    };

    // Відправляємо оновлений продукт на сервер
    const updateResponse = await fetch(`${API_URL}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    return (await updateResponse.json()) as Product;
  }
);

interface DeleteCommentPayload {
  productId: number;
  commentId: number;
}

export const deleteComment = createAsyncThunk(
  'products/deleteComment',
  async ({ productId, commentId }: DeleteCommentPayload) => {
    const response = await fetch(`${API_URL}/${productId}`);
    const productToUpdate: Product = await response.json();

    const updatedProduct = {
      ...productToUpdate,
      comments: productToUpdate.comments.filter(c => c.id !== commentId),
    };

    const updateResponse = await fetch(`${API_URL}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    return (await updateResponse.json()) as Product;
  }
);