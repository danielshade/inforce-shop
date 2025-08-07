import React from 'react';
import { Product } from '../../../types/models';
import { ProductListItem } from './ProductListItem';
import styles from './ProductList.module.css'; // <-- 1. Імпортуємо стилі

interface ProductListProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    // 2. Застосовуємо клас до нашого div
    <div className={styles.productList}> 
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};
