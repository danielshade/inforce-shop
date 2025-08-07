import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Product } from '../../../types/models';
import { deleteProduct } from '../productsThunks';
import { Modal } from '../../../components/Modal/Modal';

interface Props {
  product: Product;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<Props> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(deleteProduct(product.id));
    onClose();
  };

  return (
    <Modal title="Підтвердити видалення" onClose={onClose}>
      <p>Ви впевнені, що хочете видалити продукт "<strong>{product.name}</strong>"?</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button onClick={onClose}>Скасувати</button>
        <button onClick={handleConfirm} style={{backgroundColor: '#e74c3c', color: 'white'}}>Видалити</button>
      </div>
    </Modal>
  );
};