import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Header from '../src/components/common/Header';
import Footer from '../src/components/common/Footer';
import ShopPage from '../src/pages/ShopPage';
import CartPage from '../src/pages/CartPage';
import PaymentPage from '../src/pages/PaymentPage';
import LoginPage from '../src/pages/LoginPage';
import ProfilePage from '../src/pages/ProfilePage';
import '../src/App.css';

// મુખ્ય લેઆઉટ એન્જિન - જ્યાં બેકગ્રાઉન્ડ એનિમેશન સેટ કર્યું છે
const MainLayout = (props) => {
  const { token, user, cart, onLogout } = props;
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="app-container">
      
      {/* --- અહીં પ્યોર HTML5 SVG આઇકોન્સ બેકગ્રાઉન્ડમાં લાઈવ તરતા રહેશે --- */}
      <div className="background-animation-container">
        
        {/* ૧. શોપિંગ બેગ આઇકોન (ડાબી બાજુ ઉપર) */}
        <svg className="floating-icon icon-bag-1" viewBox="0 0 24 24" fill="none" stroke="#f43397" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>

        {/* ૨. ડિલિવરી બોયર / ફાસ્ટ એક્સપ્રેસ ટ્રેક આઇકોન (જમણી બાજુ ઉપર) */}
        <svg className="floating-icon icon-boy-1" viewBox="0 0 24 24" fill="none" stroke="#f43397" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>

        {/* ૩. ડિસ્કાઉન્ટ પર્સેન્ટેજ % આઇકોન (ડાબી બાજુ વચ્ચે) */}
        <svg className="floating-icon icon-discount-1" viewBox="0 0 24 24" fill="none" stroke="#f43397" strokeWidth="1.5">
          <line x1="19" y1="5" x2="5" y2="19"></line>
          <circle cx="6.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>

        {/* ૪. બીજો શોપિંગ બેગ આઇકોન (જમણી બાજુ નીચે) */}
        <svg className="floating-icon icon-bag-2" viewBox="0 0 24 24" fill="none" stroke="#f43397" strokeWidth="1.5">
          <path d="M19 21H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path>
          <path d="M16 7V5a4 4 0 0 0-8 0v2"></path>
        </svg>

        {/* ૫. બીજો ડિસ્કાઉન્ટ % આઇકોન (ડાબી બાજુ નીચે) */}
        <svg className="floating-icon icon-discount-2" viewBox="0 0 24 24" fill="none" stroke="#f43397" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="14" y1="10" x2="10" y2="14"></line>
        </svg>

      </div>

      {/* એપ્લિકેશનનું મેઈન કન્ટેન્ટ */}
      <Header user={user} cart={cart} onLogout={onLogout} />
      <main className="main-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("meesho_token") || null);
  const [user, setUser] = useState(() => localStorage.getItem("meesho_user") || null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("meesho_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("meesho_cart", JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = (userToken, username) => {
    setToken(userToken);
    setUser(username);
    localStorage.setItem("meesho_token", userToken);
    localStorage.setItem("meesho_user", username);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem("meesho_token");
    localStorage.removeItem("meesho_user");
    localStorage.removeItem("meesho_cart");
  };

  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage onLoginSuccess={handleLoginSuccess} /> },
    {
      path: "/",
      element: <MainLayout token={token} user={user} cart={cart} onLogout={handleLogout} />,
      children: [
        { index: true, element: <ShopPage onAddToCart={(p) => {
          const isExist = cart.find(i => i.id === p.id);
          if (isExist) {
            setCart(cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
          } else {
            setCart([...cart, { ...p, qty: 1 }]);
          }
        }} /> },
        { path: "profile", element: <ProfilePage user={user} /> },
        { path: "cart", element: <CartPage cart={cart} onUpdateQty={(id, change) => setCart(cart.map(i => i.id === id ? { ...i, qty: (i.qty + change) < 1 ? 1 : i.qty + change } : i))} onRemoveItem={(id) => setCart(cart.filter(i => i.id !== id))} onClearCart={() => setCart([])} /> },
        { path: "payment", element: <PaymentPage cart={cart} onClearCart={() => setCart([])} /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
