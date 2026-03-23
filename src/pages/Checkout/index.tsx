import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { api } from '../../api';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, fetchCart, fetchAddresses, currentAddress } = useAppStore();
  const [selectedPay, setSelectedPay] = useState('alipay');
  const [remark, setRemark] = useState('');
  const total = getCartTotal();
  const discounted = total * 0.9;

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, [fetchCart, fetchAddresses]);

  const handleSubmit = async () => {
    if (cart.length === 0) {
      alert('购物车是空的');
      return;
    }
    try {
      await api.orders.submit({
        items: cart,
        total: discounted,
        address: currentAddress,
        payment: selectedPay,
      });
      alert('订单提交成功！');
      navigate('/');
    } catch (e) {
      console.error('提交订单失败', e);
      alert('提交失败');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <p>购物车是空的，请先添加商品</p>
          <button onClick={() => navigate('/')}>去购物</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-info">
          <div className="address-card">
            <div className="card-header">
              <h3>收货地址</h3>
              <span className="add-new">+ 新增</span>
            </div>
            {currentAddress && (
              <div className="address-detail">
                <span className="default-tag">默认</span>
                <div className="address-text">
                  <p className="address-name">
                    {currentAddress.name} {currentAddress.phone}
                  </p>
                  <p className="address-full">
                    {currentAddress.province}
                    {currentAddress.city}
                    {currentAddress.district}
                    {currentAddress.detail}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pay-card">
            <h3>支付方式</h3>
            <div className="pay-options">
              <div
                className={`pay-option ${selectedPay === 'alipay' ? 'active' : ''}`}
                onClick={() => setSelectedPay('alipay')}
              >
                <span>支付宝</span>
                <span className="recommended">推荐</span>
              </div>
              <div
                className={`pay-option ${selectedPay === 'huabei' ? 'active' : ''}`}
                onClick={() => setSelectedPay('huabei')}
              >
                <span>花呗</span>
              </div>
              <div
                className={`pay-option ${selectedPay === 'card' ? 'active' : ''}`}
                onClick={() => setSelectedPay('card')}
              >
                <span>银行卡</span>
              </div>
            </div>
          </div>

          <div className="remark-card">
            <h3>订单备注</h3>
            <input
              type="text"
              placeholder="选填，可备注特殊需求"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          <div className="product-list-card">
            <h3>商品清单</h3>
            {cart.map((item) => (
              <div key={item.id} className="product-item">
                <div className="prod-image">
                  <div className="placeholder-img">
                    {item.product.title.slice(0, 2)}
                  </div>
                </div>
                <div className="prod-detail">
                  <p className="prod-title">{item.product.title}</p>
                  <p className="prod-spec">
                    {item.selectedColor} / {item.selectedSize} x {item.quantity}
                  </p>
                  <p className="prod-price">¥{item.product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-settle">
          <h3>订单结算</h3>

          <div className="order-rows">
            <div className="order-row">
              <span>商品件数</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}件</span>
            </div>
            <div className="order-row">
              <span>商品总价</span>
              <span>¥{total.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>运费</span>
              <span>¥0.00</span>
            </div>
            <div className="order-row">
              <span>优惠券</span>
              <span className="discount">-¥0.00</span>
            </div>
          </div>

          <div className="submit-total">
            <span>实付款</span>
            <span className="final-price">¥{discounted.toFixed(2)}</span>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            提交订单
          </button>
        </div>
      </div>
    </div>
  );
}
