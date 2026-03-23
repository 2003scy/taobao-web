import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { useAppStore } from '../../store';
import './ProductCard.css';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { setCurrentProduct, favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(product.id);

  const handleClick = () => {
    setCurrentProduct(product);
    navigate('/product');
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <div className="image-placeholder">
          <span>{product.title.slice(0, 2)}</span>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-row">
          <span className="product-price">¥{product.price}</span>
          <span className="product-original">¥{product.originalPrice}</span>
          <span className="product-discount">{discount}%</span>
        </div>
        <div className="product-meta">
          <span className="product-shop">{product.shop}</span>
          <span className="product-location">{product.location}</span>
        </div>
      </div>
    </div>
  );
}
