import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { colors, sizes } from '../../data';
import './Product.css';

export default function Product() {
  const navigate = useNavigate();
  const { currentProduct, addToCart, favorites, toggleFavorite } = useAppStore();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [quantity, setQuantity] = useState(1);

  if (!currentProduct) {
    return (
      <div className="product-page">
        <div className="no-product">商品不存在</div>
      </div>
    );
  }

  const isFavorite = favorites.includes(currentProduct.id);
  const discount = Math.round(
    (1 - currentProduct.price / currentProduct.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedColor, selectedSize);
    alert('已加入购物车');
  };

  const handleBuyNow = () => {
    addToCart(currentProduct, selectedColor, selectedSize);
    navigate('/cart');
  };

  const handleFavorite = () => {
    toggleFavorite(currentProduct.id);
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <div className="image-placeholder large">
              <span>{currentProduct.title.slice(0, 4)}</span>
            </div>
          </div>
          <div className="thumbnail-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="thumbnail">
                <div className="thumb-placeholder" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{currentProduct.title}</h1>

          <div className="price-section">
            <span className="current-price">¥{currentProduct.price}</span>
            <span className="original-price">¥{currentProduct.originalPrice}</span>
            <span className="discount-tag">{discount}% off</span>
          </div>

          <div className="sku-section">
            <div className="sku-row">
              <span className="sku-label">颜色</span>
              <div className="sku-options">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`sku-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="sku-row">
              <span className="sku-label">尺码</span>
              <div className="sku-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`sku-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="sku-row">
              <span className="sku-label">数量</span>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
                <span className="stock-text">库存 286 件</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              加入购物车
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              立即购买
            </button>
            <button className="favorite-btn" onClick={handleFavorite}>
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="service-promises">
            <span>✓ 7天无理由退换</span>
            <span>✓ 48小时发货</span>
            <span>✓ 正品保证</span>
          </div>
        </div>
      </div>
    </div>
  );
}
