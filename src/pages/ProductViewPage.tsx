import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

// Назву змінено на ProductViewPage
export const ProductViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => 
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!product) {
    return <div>Продукт не знайдено. <Link to="/">На головну</Link></div>;
  }

  return (
    <div>
      <Link to="/">&larr; Назад до списку</Link>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px' }} />
      <p><b>Кількість на складі:</b> {product.count}</p>
      <p><b>Вага:</b> {product.weight}</p>
      <p><b>Розміри (ШхВ):</b> {product.size.width}x{product.size.height} мм</p>
      
      <h2>Коментарі</h2>
      {product.comments.length > 0 ? (
        <ul>
          {product.comments.map(comment => (
            <li key={comment.id}>{comment.description} ({comment.date})</li>
          ))}
        </ul>
      ) : (
        <p>Коментарів ще немає.</p>
      )}
    </div>
  );
};