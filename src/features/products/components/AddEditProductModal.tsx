import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Product } from '../../../types/models';
import { addProduct, updateProduct } from '../productsThunks';
import { Modal } from '../../../components/Modal/Modal';
import styles from './AddEditProductModal.module.css';

interface Props {
  productToEdit?: Product;
  onClose: () => void;
}

export const AddEditProductModal: React.FC<Props> = ({ productToEdit, onClose }) => {
  const dispatch = useAppDispatch();
  
  // Якщо редагуємо, заповнюємо форму, інакше — створюємо порожню
  const [form, setForm] = useState({
    name: productToEdit?.name || '',
    imageUrl: productToEdit?.imageUrl || 'https://via.placeholder.com/300',
    count: productToEdit?.count || 0,
    weight: productToEdit?.weight || '',
    width: productToEdit?.size.width || 0,
    height: productToEdit?.size.height || 0,
  });

  const isFormValid = form.name && form.count > 0 && form.weight;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    const productData = {
      name: form.name,
      imageUrl: form.imageUrl,
      count: Number(form.count),
      weight: form.weight,
      size: { width: Number(form.width), height: Number(form.height) },
    };

    if (productToEdit) {
      dispatch(updateProduct({ ...productData, id: productToEdit.id }));
    } else {
      dispatch(addProduct(productData));
    }
    onClose();
  };

  return (
    <Modal title={productToEdit ? 'Редагувати продукт' : 'Додати продукт'} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Назва продукту</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="count">Кількість</label>
          <input type="number" id="count" name="count" value={form.count} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="weight">Вага</label>
          <input type="text" id="weight" name="weight" placeholder="напр. 250g" value={form.weight} onChange={handleChange} required />
        </div>
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>Скасувати</button>
          <button type="submit" className={styles.confirmButton} disabled={!isFormValid}>
            {productToEdit ? 'Зберегти' : 'Додати'}
          </button>
        </div>
      </form>
    </Modal>
  );
};