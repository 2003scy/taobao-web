import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, getCartCount } = useAppStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const cartCount = getCartCount();

  const handleSearch = () => {
    setSearchQuery(localQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="logo" onClick={() => navigate('/')}>
            淘宝
          </span>
        </div>

        <div className="header-center">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索商品/店铺"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch}>
              搜索
            </button>
          </div>
        </div>

        <div className="header-right">
          <span className="user-action" onClick={() => navigate('/profile')}>
            登录/注册
          </span>
          <span className="cart-icon" onClick={() => navigate('/cart')}>
            🛒 购物车
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
        </div>
      </div>
    </header>
  );
}
