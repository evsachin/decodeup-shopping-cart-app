export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}
