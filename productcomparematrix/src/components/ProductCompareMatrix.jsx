
import React, { useMemo, useState } from "react";

const initialProducts = {
  amazon: {
    marketplace: "Amazon",
    title: "Samsung Galaxy A17 5G",
    url: "https://www.amazon.com/dp/B0FXY18C1J",
    images: [],
    currency: "USD",
    price: "",
    mrp: "",
    rating: "",
    warranty: "",
    seller: "",
    delivery: "",
    returnPolicy: "",
    ram: "",
    storage: "128 GB",
    display: "",
    processor: "",
    battery: "",
    camera: "",
    color: "",
    features: ""
  },

  flipkart: {
    marketplace: "Flipkart",
    title: "Samsung Galaxy A17 5G",
    url: "https://www.flipkart.com/samsung-galaxy-a17-5g-blue-128-gb/p/itm14e4e5394d6c7",
    images: [],
    currency: "INR",
    price: "",
    mrp: "",
    rating: "",
    warranty: "",
    seller: "",
    delivery: "",
    returnPolicy: "",
    ram: "6 GB",
    storage: "128 GB",
    display: "",
    processor: "",
    battery: "",
    camera: "",
    color: "Blue",
    features: ""
  }
};

const fields = [
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "display", label: "Display" },
  { key: "processor", label: "Processor" },
  { key: "battery", label: "Battery" },
  { key: "camera", label: "Camera" },
  { key: "color", label: "Color" },
  { key: "features", label: "Additional Features" },
  { key: "warranty", label: "Warranty" },
  { key: "rating", label: "Customer Rating" },
  { key: "seller", label: "Seller" },
  { key: "delivery", label: "Delivery" },
  { key: "returnPolicy", label: "Return Policy" }
];

const styles = `
* {
  box-sizing: border-box;
}

.pc-container {
  max-width: 1250px;
  margin: 25px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #222;
}

.pc-heading {
  text-align: center;
  margin-bottom: 25px;
}

.pc-heading h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.pc-heading p {
  color: #666;
}

.pc-edit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.pc-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 18px;
  background: white;
}

.pc-card h3 {
  margin: 0 0 18px;
  font-size: 21px;
}

.pc-field {
  margin-bottom: 14px;
}

.pc-field label {
  display: block;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
}

.pc-field input,
.pc-field textarea,
.pc-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.pc-field textarea {
  min-height: 100px;
  resize: vertical;
}

.pc-button {
  padding: 10px 17px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
  margin: 5px 5px 5px 0;
}

.pc-button:hover {
  opacity: .9;
}

.pc-button.green {
  background: #15803d;
}

.pc-button.gray {
  background: #555;
}

.pc-comparison {
  margin-top: 35px;
}

.pc-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.pc-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

.pc-table th,
.pc-table td {
  border-bottom: 1px solid #e5e5e5;
  padding: 14px;
  text-align: center;
  vertical-align: middle;
}

.pc-table th {
  background: #f5f6f8;
}

.pc-table td:first-child {
  font-weight: 600;
  text-align: left;
  background: #fafafa;
  width: 22%;
}

.pc-product-cell {
  min-width: 280px;
}

.pc-gallery {
  width: 100%;
  max-width: 310px;
  margin: 0 auto;
}

.pc-main-image-box {
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}

.pc-main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pc-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #777;
}

.pc-image-placeholder span {
  font-size: 110px;
}

.pc-image-placeholder small {
  font-size: 12px;
}

.pc-thumbnails {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.pc-thumb {
  width: 62px;
  height: 62px;
  padding: 4px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 7px;
  cursor: pointer;
}

.pc-thumb.active {
  border: 2px solid #2874f0;
}

.pc-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pc-product-title {
  font-size: 17px;
  font-weight: bold;
  display: block;
  margin-top: 15px;
  line-height: 1.5;
}

.pc-url {
  color: #2563eb;
  text-decoration: none;
  display: inline-block;
  margin-top: 8px;
  overflow-wrap: anywhere;
}

.pc-price {
  font-size: 19px;
  font-weight: bold;
  color: #15803d;
}

.pc-discount {
  color: #15803d;
  font-weight: bold;
}

.pc-winner {
  color: #15803d;
  font-weight: bold;
  background: #ecfdf3;
}

.pc-final-result {
  font-weight: bold;
  text-align: center !important;
  background: #f0f7ff !important;
}

.pc-note {
  color: #777;
  font-size: 12px;
  margin-top: 7px;
}

@media(max-width: 700px) {
  .pc-edit-grid {
    grid-template-columns: 1fr;
  }

  .pc-container {
    padding: 10px;
  }

  .pc-main-image-box {
    height: 250px;
  }
}

@media print {
  .pc-editor,
  .pc-actions {
    display: none !important;
  }

  .pc-container {
    max-width: 100%;
  }
}
`;

export default function ProductCompareMatrix() {
  const [products, setProducts] = useState(initialProducts);

  const [activeImages, setActiveImages] = useState({
    amazon: 0,
    flipkart: 0
  });

  const [showEditor, setShowEditor] = useState(true);

  const updateProduct = (marketplace, field, value) => {
    setProducts((prev) => ({
      ...prev,
      [marketplace]: {
        ...prev[marketplace],
        [field]: value
      }
    }));
  };

  const getDiscount = (product) => {
    const price = Number(product.price);
    const mrp = Number(product.mrp);

    if (!price || !mrp || mrp <= price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  const getSavings = (product) => {
    const price = Number(product.price);
    const mrp = Number(product.mrp);

    if (!price || !mrp || mrp <= price) return 0;

    return mrp - price;
  };

  const formatPrice = (product, value) => {
    if (value === "" || value === null || value === undefined) {
      return "Not Available";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) return "Not Available";

    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: product.currency
      }).format(number);
    } catch {
      return `${product.currency} ${number}`;
    }
  };

  const sameCurrency =
    products.amazon.currency === products.flipkart.currency;

  const amazonPrice = Number(products.amazon.price);
  const flipkartPrice = Number(products.flipkart.price);

  const lowestPrice = useMemo(() => {
    if (!sameCurrency || !amazonPrice || !flipkartPrice) {
      return null;
    }

    if (amazonPrice === flipkartPrice) return "equal";

    return amazonPrice < flipkartPrice ? "amazon" : "flipkart";
  }, [sameCurrency, amazonPrice, flipkartPrice]);

  // Product Image Gallery
  const renderGallery = (marketplace) => {
    const product = products[marketplace];
    const images = product.images || [];
    const activeIndex = activeImages[marketplace] || 0;
    const activeImage = images[activeIndex];

    return (
      <div className="pc-gallery">

        <div className="pc-main-image-box">
          {activeImage ? (
            <img
              key={activeImage}
              src={activeImage}
              alt={product.title}
              className="pc-main-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="pc-image-placeholder">
              <span>📱</span>
              <small>Product Image Not Available</small>
            </div>
          )}
        </div>

        <div className="pc-thumbnails">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${marketplace}-${index}`}
              className={
                activeIndex === index
                  ? "pc-thumb active"
                  : "pc-thumb"
              }
              onClick={() =>
                setActiveImages((prev) => ({
                  ...prev,
                  [marketplace]: index
                }))
              }
              title={`Image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${product.title} ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.style.opacity = "0.2";
                }}
              />
            </button>
          ))}
        </div>

      </div>
    );
  };

  // Product Details Editor
  const renderEditor = (marketplace) => {
    const product = products[marketplace];

    return (
      <div className="pc-card" key={marketplace}>
        <h3>{product.marketplace} Product Details</h3>

        <div className="pc-field">
          <label>Product Name</label>
          <input
            value={product.title}
            onChange={(e) =>
              updateProduct(marketplace, "title", e.target.value)
            }
          />
        </div>

        <div className="pc-field">
          <label>Product URL</label>
          <input
            value={product.url}
            onChange={(e) =>
              updateProduct(marketplace, "url", e.target.value)
            }
          />
        </div>

        <div className="pc-field">
          <label>Currency</label>
          <select
            value={product.currency}
            onChange={(e) =>
              updateProduct(marketplace, "currency", e.target.value)
            }
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>

        <div className="pc-field">
          <label>Selling Price</label>
          <input
            type="number"
            min="0"
            value={product.price}
            onChange={(e) =>
              updateProduct(marketplace, "price", e.target.value)
            }
            placeholder="Enter selling price"
          />
        </div>

        <div className="pc-field">
          <label>MRP / Original Price</label>
          <input
            type="number"
            min="0"
            value={product.mrp}
            onChange={(e) =>
              updateProduct(marketplace, "mrp", e.target.value)
            }
            placeholder="Enter MRP"
          />
        </div>

        <div className="pc-field">
          <label>Rating</label>
          <input
            value={product.rating}
            onChange={(e) =>
              updateProduct(marketplace, "rating", e.target.value)
            }
            placeholder="Example: 4.5 / 5"
          />
        </div>

        <div className="pc-field">
          <label>Product Images - One URL per line</label>
          <textarea
            value={product.images.join("\n")}
            onChange={(e) => {
              updateProduct(
                marketplace,
                "images",
                e.target.value
                  .split("\n")
                  .map((url) => url.trim())
                  .filter(Boolean)
              );

              setActiveImages((prev) => ({
                ...prev,
                [marketplace]: 0
              }));
            }}
            placeholder={
              "https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg\nhttps://example.com/image-3.jpg\nhttps://example.com/image-4.jpg"
            }
          />
          <p className="pc-note">
            Enter one direct image URL per line.
          </p>
        </div>

        {fields.map((field) => (
          <div className="pc-field" key={field.key}>
            <label>{field.label}</label>
            <input
              value={product[field.key]}
              onChange={(e) =>
                updateProduct(
                  marketplace,
                  field.key,
                  e.target.value
                )
              }
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderPriceCell = (marketplace) => {
    const product = products[marketplace];

    return (
      <span
        className={
          lowestPrice === marketplace ? "pc-winner" : ""
        }
      >
        {formatPrice(product, product.price)}
        {lowestPrice === marketplace && " ✓ Lowest Price"}
      </span>
    );
  };

  const comparisonRows = [
    {
      label: "Selling Price",
      render: (marketplace) => renderPriceCell(marketplace)
    },
    {
      label: "Original Price / MRP",
      render: (marketplace) =>
        formatPrice(
          products[marketplace],
          products[marketplace].mrp
        )
    },
    {
      label: "Discount",
      render: (marketplace) =>
        products[marketplace].price &&
        products[marketplace].mrp
          ? `${getDiscount(products[marketplace])}%`
          : "Not Available"
    },
    {
      label: "You Save",
      render: (marketplace) =>
        formatPrice(
          products[marketplace],
          getSavings(products[marketplace])
        )
    },
    ...fields.map((field) => ({
      label: field.label,
      render: (marketplace) =>
        products[marketplace][field.key] || "Not Available"
    }))
  ];

  const resetComparison = () => {
    setProducts(initialProducts);

    setActiveImages({
      amazon: 0,
      flipkart: 0
    });
  };

  return (
    <>
      <style>{styles}</style>

      <div className="pc-container">

        <div className="pc-heading">
          <h2>Product Comparison</h2>
          <p>Amazon vs Flipkart - Compare Products</p>
        </div>

        <div className="pc-actions">
          <button
            className="pc-button"
            onClick={() => setShowEditor(!showEditor)}
          >
            {showEditor ? "Hide Editor" : "Edit Product Details"}
          </button>

          <button
            className="pc-button green"
            onClick={() => window.print()}
          >
            Print Comparison
          </button>

          <button
            className="pc-button gray"
            onClick={resetComparison}
          >
            Reset
          </button>
        </div>

        {showEditor && (
          <section className="pc-editor">
            <h2>Enter Product Details</h2>

            <div className="pc-edit-grid">
              {renderEditor("amazon")}
              {renderEditor("flipkart")}
            </div>
          </section>
        )}

        <section className="pc-comparison">
          <h2>Comparison Matrix</h2>

          {!sameCurrency && (
            <p className="pc-note">
              Products have different currencies.
              Currency conversion is required for a fair price comparison.
            </p>
          )}

          <div className="pc-table-wrapper">
            <table className="pc-table">

              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Amazon</th>
                  <th>Flipkart</th>
                </tr>
              </thead>

              <tbody>

                {/* 1. Product Images */}
                <tr>
                  <td>Product Images</td>
                  <td className="pc-product-cell">
                    {renderGallery("amazon")}
                  </td>
                  <td className="pc-product-cell">
                    {renderGallery("flipkart")}
                  </td>
                </tr>

                {/* 2. Product Title */}
                <tr>
                  <td>Product Title</td>
                  <td>{products.amazon.title}</td>
                  <td>{products.flipkart.title}</td>
                </tr>

                {/* 3. Product URL */}
                <tr>
                  <td>Product URL</td>
                  <td>
                    <a
                      className="pc-url"
                      href={products.amazon.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Amazon Product
                    </a>
                  </td>
                  <td>
                    <a
                      className="pc-url"
                      href={products.flipkart.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Flipkart Product
                    </a>
                  </td>
                </tr>

                {/* 4. Price and Other Details */}
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.render("amazon")}</td>
                    <td>{row.render("flipkart")}</td>
                  </tr>
                ))}

                {/* 5. Final Result */}
                <tr>
                  <td>Final Result</td>
                  <td colSpan="2" className="pc-final-result">
                    {!sameCurrency
                      ? "Different currencies - conversion required"
                      : lowestPrice === "amazon"
                      ? "Amazon has the lower listed price"
                      : lowestPrice === "flipkart"
                      ? "Flipkart has the lower listed price"
                      : lowestPrice === "equal"
                      ? "Both prices are equal"
                      : "Enter both prices to compare"}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
}
