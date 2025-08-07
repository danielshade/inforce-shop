import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};