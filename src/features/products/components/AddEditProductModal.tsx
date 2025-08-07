import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { Product } from '../../../types/models';
import { addProduct, updateProduct } from '../productsThunks';
import { Modal } from '../../../components/Modal/Modal';

interface Props {
  productToEdit?: Product;
  onClose: () => void;
}

export const AddEditProductModal: React.FC<Props> = ({ productToEdit, onClose }) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: productToEdit?.name || '',
    count: productToEdit?.count || 0,
    weight: productToEdit?.weight || '',
    imageUrl: productToEdit?.imageUrl || 'https://via.placeholder.com/200',
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
      count: Number(form.count),
      weight: form.weight,
      imageUrl: form.imageUrl,
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
      <form onSubmit={handleSubmit}>
        {/* ...поля форми... */}
        <button type="submit" disabled={!isFormValid}>Зберегти</button>
        <button type="button" onClick={onClose}>Скасувати</button>
      </form>
    </Modal>
  );
};