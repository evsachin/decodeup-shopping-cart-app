import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productsSlice';
import { fetchCart, addToCart, removeFromCart } from '@/store/slices/cartSlice';
import ProductCard from '@/components/ProductCard';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { items: products, loading: productsLoading, error: productsError } = useAppSelector(
    (state) => state.products
  );
  const { cart, loading: cartLoading, error: cartError } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleRemoveFromCart = (cartItemId: number) => {
    dispatch(removeFromCart(cartItemId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Shopping Cart</h1>
        {cart && (
          <div className="header-cart-info">
            <span className="cart-badge">{cart.totalItems} items</span>
            <span className="cart-total">${cart.totalPrice.toFixed(2)}</span>
          </div>
        )}
      </header>

      <div className="app-content">
        {/* Products Section */}
        <section className="products-section">
          <h2>Products</h2>
          {productsLoading && <Loading />}
          {productsError && <ErrorMessage message={productsError} />}
          {!productsLoading && !productsError && (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  loading={cartLoading}
                />
              ))}
            </div>
          )}
        </section>

        {/* Cart Section */}
        <aside className="cart-section">
          <h2>Your Cart</h2>
          {cartLoading && <Loading />}
          {cartError && <ErrorMessage message={cartError} />}
          {!cartLoading && !cartError && cart && (
            <>
              {cart.items.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveFromCart}
                        loading={cartLoading}
                      />
                    ))}
                  </div>
                  <CartSummary totalItems={cart.totalItems} totalPrice={cart.totalPrice} />
                </>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
