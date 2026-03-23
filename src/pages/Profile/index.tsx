import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { user, favorites } = useAppStore();
  const { assets } = user;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="user-panel">
          <div className="user-avatar">
            <span>👤</span>
          </div>
          <h3 className="username">{user.username}</h3>
          <p className="userphone">{user.phone}</p>

          <div className="vip-badge">★ 超级会员</div>

          <div className="assets-section">
            <h4>我的资产</h4>
            <div className="assets-grid">
              <div className="asset-item">
                <span className="asset-value">¥{assets.redPacket.toFixed(2)}</span>
                <span className="asset-label">红包</span>
              </div>
              <div className="asset-item">
                <span className="asset-value">{assets.coupons}</span>
                <span className="asset-label">优惠券</span>
              </div>
              <div className="asset-item">
                <span className="asset-value">{assets.coins}</span>
                <span className="asset-label">淘金币</span>
              </div>
              <div className="asset-item">
                <span className="asset-value">{assets.points}</span>
                <span className="asset-label">积分</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-panel">
          <div className="order-card">
            <div className="card-header">
              <h3>我的订单</h3>
              <span className="view-all">全部订单 &gt;</span>
            </div>
            <div className="order-tabs">
              {['待付款', '待发货', '待收货', '待评价', '退款/售后'].map((tab) => (
                <div key={tab} className="order-tab">
                  <div className="tab-icon">
                    {tab === '待付款' && '💳'}
                    {tab === '待发货' && '📦'}
                    {tab === '待收货' && '🚚'}
                    {tab === '待评价' && '⭐'}
                    {tab === '退款/售后' && '🔧'}
                  </div>
                  <span>{tab}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relation-card">
            <h3>我的关系</h3>
            <div className="relation-grid">
              <div className="relation-item" onClick={() => navigate('/')}>
                <span className="relation-icon">❤️</span>
                <span className="relation-label">收藏夹</span>
                <span className="relation-count">{favorites.length}件</span>
              </div>
              <div className="relation-item">
                <span className="relation-icon">👣</span>
                <span className="relation-label">足迹</span>
                <span className="relation-count">156条</span>
              </div>
              <div className="relation-item">
                <span className="relation-icon">⭐</span>
                <span className="relation-label">关注</span>
                <span className="relation-count">12个</span>
              </div>
              <div className="relation-item">
                <span className="relation-icon">📍</span>
                <span className="relation-label">地址管理</span>
              </div>
            </div>
          </div>

          <div className="service-card">
            <h3>常用服务</h3>
            <div className="service-grid">
              {[
                { icon: '💰', label: '我的钱包' },
                { icon: '🎮', label: '会员中心' },
                { icon: '🎓', label: '淘客学院' },
                { icon: '📱', label: '手机充值' },
              ].map((item) => (
                <div key={item.label} className="service-item">
                  <span className="service-icon">{item.icon}</span>
                  <span className="service-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
