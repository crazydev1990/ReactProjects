import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../assets/styles/PaymentPage.css';

const stripePromise = loadStripe("pk_test_51MlSRhKUm4gNQbb9bG0kOPb9WPAG4Ookfyx9wgGfLFzO2jEB7V38CzvNmMNxfuCQbYjvA2buizfqBjiwRh0g80PV00XOYCCoDd"); // ટેસ્ટ સ્ટ્રાઇપ પબ્લિક કી

const StripePaymentForm = (props) => {
  const { cart, onClearCart } = props; // ફંક્શનની અંદર props નું ડેસ્ટ્રક્ચરિંગ
  const [paying, setPaying] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  let grandTotal = 0;
  for (let i = 0; i < cart.length; i = i + 1) {
    grandTotal = grandTotal + (Math.round(cart[i].price * 84) * cart[i].qty);
  }

  const handleStripePaySubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPaying(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      alert("❌ Payment Failed: " + error.message);
      setPaying(false);
    } else {
      alert("💳 Stripe Payment Success! ID: " + paymentMethod.id);
      onClearCart();
      navigate("/");
    }
  };

  return (
    <div className="payment-container">
      <h3>💳 Stripe Payment Gateway</h3>
      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '15px 0' }} />
      <div className="bill-row">
        <span>Total Items ({cart.length} types)</span>
        <span>₹{grandTotal}</span>
      </div>
      <form onSubmit={handleStripePaySubmit}>
        <div className="stripe-box">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        <div className="bill-row" style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}>
          <span>Order Total</span>
          <span style={{ color: '#f43397' }}>₹{grandTotal}</span>
        </div>
        <button type="submit" disabled={!stripe || paying || cart.length === 0} className="order-btn">
          {paying ? "Processing..." : `Pay ₹${grandTotal}`}
        </button>
      </form>
    </div>
  );
};

const PaymentPage = (props) => {
  const { cart, onClearCart } = props;
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm cart={cart} onClearCart={onClearCart} />
    </Elements>
  );
};

export default PaymentPage;
