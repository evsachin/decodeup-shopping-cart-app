import React from 'react';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="cart-summary">
      <div className="cart-summary-row">
        <span className="cart-summary-label">Total Items:</span>
        <span className="cart-summary-value">{totalItems}</span>
      </div>
      <div className="cart-summary-row cart-summary-total">
        <span className="cart-summary-label">Total Price:</span>
        <span className="cart-summary-value">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
