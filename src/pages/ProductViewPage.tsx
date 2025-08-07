import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsThunks';
import { setSortKey, SortKey } from '../features/products/productsSlice';
import { ProductList } from '../features/products/components/ProductList';
import { Product } from '../types/models';
import { AddEditProductModal } from '../features/products/components/AddEditProductModal';
import { DeleteConfirmModal } from '../features/products/components/DeleteConfirmModal';

export const ProductsListPage = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, sortKey } = useAppSelector((state) => state.products);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortKey === 'name') {
        const nameComparison = a.name.localeCompare(b.name);
        if (nameComparison !== 0) return nameComparison;
      }
      return a.count - b.count;
    });
  }, [products, sortKey]);

  if (status === 'loading') return <p>Завантаження...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Список Продуктів</h1>
        <div>
          <label>Сортувати за: </label>
          <select value={sortKey} onChange={(e) => dispatch(setSortKey(e.target.value as SortKey))}>
            <option value="name">Назвою</option>
            <option value="count">Кількістю</option>
          </select>
          <button onClick={() => setAddModalOpen(true)} style={{ marginLeft: '10px', backgroundColor: '#2ecc71', color: 'white' }}>
            Додати Продукт
          </button>
        </div>
      </div>
      
      <ProductList products={sortedProducts} onDelete={(product) => setProductToDelete(product)} />

      {isAddModalOpen && <AddEditProductModal onClose={() => setAddModalOpen(false)} />}
      
      {productToDelete && (
        <DeleteConfirmModal
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
};