import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/models';

interface ProductListItemProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product);
  };
    
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', width: '250px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
      <h3 style={{ height: '40px' }}>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p>Кількість: {product.count}</p>
      <button onClick={handleDelete} style={{backgroundColor: '#e74c3c', color: 'white'}}>Видалити</button>
    </div>
  );
};