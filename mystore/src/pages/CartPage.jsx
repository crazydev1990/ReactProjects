import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/CartPage.css';

const CartPage = (props) => {
  const { cart, onUpdateQty, onRemoveItem, onClearCart } = props; // ફંક્શનની અંદર props નું ડેસ્ટ્રક્ચરિંગ
  const navigate = useNavigate();

  const renderCartDisplay = () => {
    if (cart.length === 0) {
      return (
        <div className="empty-cart-box">
          <p>🛒 (Your Cart is Empty)!</p>
          <button onClick={() => navigate("/")} className="shop-now-btn">Shop Now</button>
        </div>
      );
    } else {
      return (
        <div>
          {cart.map((item, index) => {
            const itemTotal = Math.round(item.price * 84) * item.qty;

            return (
              <div key={index} className="cart-row">
                <img src={item.image} alt={item.title} className="cart-img" />
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                  <h4>{item.title}</h4>
                  <p style={{ color: '#f43397', fontWeight: 'bold', margin: 0 }}>
                    ₹{itemTotal} <span style={{ fontWeight: 'normal', color: '#777', fontSize: '13px' }}>(₹{Math.round(item.price * 84)} / item)</span>
                  </p>
                  <div className="qty-controls">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="qty-btn">-</button>
                    <span><b>{item.qty}</b></span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="qty-btn">+</button>
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="remove-btn">Remove</button>
              </div>
            );
          })}
          <button onClick={() => navigate("/payment")} className="checkout-nav-btn">Proceed to Payment</button>
        </div>
      );
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header-row">
        <h2>My Cart (Your Shopping Cart)</h2>
        {cart.length > 0 && <button onClick={onClearCart} className="clear-all-btn">🗑️ Clear All</button>}
      </div>
      {renderCartDisplay()}
    </div>
  );
};

export default CartPage;
