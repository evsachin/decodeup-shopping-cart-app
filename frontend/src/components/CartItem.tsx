import React from 'react';
import { CartItem as CartItemType } from '@/types/api';

interface CartItemProps {
  item: CartItemType;
  onRemove: (cartItemId: number) => void;
  loading: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, loading }) => {
  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.product.name}</h4>
        <p className="cart-item-price">
          ${item.product.price.toFixed(2)} × {item.quantity} = ${itemTotal.toFixed(2)}
        </p>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => onRemove(item.id)}
        disabled={loading}
      >
        {loading ? 'Removing...' : 'Remove'}
      </button>
    </div>
  );
};

export default CartItem;
