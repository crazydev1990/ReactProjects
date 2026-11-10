import React from 'react';
import '../assets/styles/ProductListCard.css';

const ProductListCard = (props) => {
  const { product, onAdd } = props; 

 
  let isInStock = true;
  if (product.id === 2) {
    isInStock = false;
  }

  const renderStockControls = () => {
    if (isInStock) {
      return (
        <div>
          <p className="stock-status" style={{ color: 'green' }}>● In Stock</p>
          <button onClick={() => onAdd(product)} className="add-btn">Add to Cart</button>
        </div>
      );
    } else {
      return (
        <div>
          <p className="stock-status" style={{ color: 'red' }}>● Out of Stock</p>
          <button className="disabled-btn" disabled>Unavailable</button>
        </div>
      );
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />
      <h4 className="product-title">{product.title}</h4>
      <p className="product-price">₹{Math.round(product.price * 84)}</p>
      <span className="free-del">Free Delivery</span>
      {renderStockControls()}
    </div>
  );
};

export default ProductListCard;
