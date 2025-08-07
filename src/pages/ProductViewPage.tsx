import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AddEditProductModal } from '../features/products/components/AddEditProductModal';
import { addComment, deleteComment } from '../features/products/productsThunks';


export const ProductViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) => 
    state.products.items.find((p) => p.id === Number(id))
  );

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // Стан для тексту нового коментаря
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !product) return;

    dispatch(addComment({ 
      productId: product.id, 
      comment: { description: newCommentText } 
    }));
    setNewCommentText(''); // Очищуємо поле вводу
  };

  const handleDeleteComment = (commentId: number) => {
    if (!product) return;
    if (window.confirm('Ви впевнені, що хочете видалити цей коментар?')) {
      dispatch(deleteComment({ productId: product.id, commentId }));
    }
  };

  if (!product) {
    return <div>Продукт не знайдено. <Link to="/">На головну</Link></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">&larr; Назад до списку</Link>
        <button onClick={() => setEditModalOpen(true)} style={{backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer'}}>
          Редагувати
        </button>
      </div>
      
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px', borderRadius: '8px' }} />
      <p><b>Кількість на складі:</b> {product.count}</p>
      
      <hr style={{ margin: '2rem 0' }} />

      <h2>Коментарі</h2>
      <div>
        {product.comments.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {product.comments.map(comment => (
              <li key={comment.id} style={{ background: '#f8f8f8', padding: '10px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p>{comment.description}</p>
                  <small style={{ color: '#666' }}>{comment.date}</small>
                </div>
                <button onClick={() => handleDeleteComment(comment.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Коментарів ще немає.</p>
        )}
      </div>

      <form onSubmit={handleAddComment} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <textarea 
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Додайте ваш коментар..."
          required
          style={{ flexGrow: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '40px' }}
        />
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Додати</button>
      </form>

      {isEditModalOpen && (
        <AddEditProductModal 
          productToEdit={product}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};