import { Product, CartSummary, AddToCartRequest } from '@/types/api';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Cart
  async getCart(): Promise<CartSummary> {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  },

  async addToCart(data: AddToCartRequest): Promise<CartSummary> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return response.json();
  },

  async removeFromCart(cartItemId: number): Promise<CartSummary> {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    return response.json();
  },
};
