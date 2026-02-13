import React from 'react';
import { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, loading }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart(product.id)}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
