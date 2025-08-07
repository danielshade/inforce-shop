import React from 'react';
import { Product } from '../../../types/models';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  products: Product[];
  onDelete: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};