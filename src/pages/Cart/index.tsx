import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    fetchCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
  } = useAppStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = getCartTotal();
  const count = getCartCount();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('购物车是空的');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>购物车是空的</p>
          <button className="go-shopping-btn" onClick={() => navigate('/')}>
            去逛逛
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-list">
          <div className="cart-header">
            <label className="select-all">
              <input type="checkbox" defaultChecked />
              <span>全选</span>
            </label>
            <span className="shop-name">店铺：官方旗舰店</span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-checkbox">
                <input type="checkbox" defaultChecked />
              </div>
              <div className="item-image">
                <div className="image-placeholder small">
                  {item.product.title.slice(0, 2)}
                </div>
              </div>
              <div className="item-info">
                <h4 className="item-title">{item.product.title}</h4>
                <p className="item-spec">
                  {item.selectedColor} | {item.selectedSize}
                </p>
                <p className="item-price">¥{item.product.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button
                className="item-delete"
                onClick={() => removeFromCart(item.id)}
              >
                删除
              </button>
            </div>
          ))}
        </div>

        <div className="settle-panel">
          <h3>结算</h3>

          <div className="coupon-row">
            <span>🎫 优惠券</span>
            <span className="coupon-action">领取</span>
          </div>

          <div className="total-section">
            <div className="total-row">
              <span>商品件数</span>
              <span>{count}件</span>
            </div>
            <div className="total-row">
              <span>商品总价</span>
              <span>¥{total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>优惠</span>
              <span className="discount">-¥{(total * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="final-total">
            <span>合计</span>
            <span className="total-amount">¥{(total * 0.9).toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            去结算 ({count})
          </button>
        </div>
      </div>
    </div>
  );
}
