import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/models';
import styles from './ProductListItem.module.css'; // <-- Імпортуємо стилі

interface ProductListItemProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product);
  };

  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <h3 className={styles.title}>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className={styles.count}>Кількість: {product.count}</p>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Видалити
      </button>
    </div>
  );
};