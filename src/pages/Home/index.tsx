import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../data';
import { useAppStore } from '../../store';
import './Home.css';

type SortType = 'comprehensive' | 'sales' | 'price';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [sortType, setSortType] = useState<SortType>('comprehensive');
  const { searchQuery } = useAppStore();

  const allCategories = ['全部', ...categories];

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    return (
      p.title.includes(searchQuery) ||
      p.shop.includes(searchQuery) ||
      p.location.includes(searchQuery)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case 'sales':
        return b.sales - a.sales;
      case 'price':
        return a.price - b.price;
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="home">
      <div className="home-content">
        <aside className="category-nav">
          <h3 className="category-title">商品分类</h3>
          <ul className="category-list">
            {allCategories.map((cat) => (
              <li
                key={cat}
                className={`category-item ${
                  activeCategory === cat ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <main className="product-area">
          <div className="filter-bar">
            <button
              className={`filter-btn ${sortType === 'comprehensive' ? 'active' : ''}`}
              onClick={() => setSortType('comprehensive')}
            >
              综合
            </button>
            <button
              className={`filter-btn ${sortType === 'sales' ? 'active' : ''}`}
              onClick={() => setSortType('sales')}
            >
              销量
            </button>
            <button
              className={`filter-btn ${sortType === 'price' ? 'active' : ''}`}
              onClick={() => setSortType('price')}
            >
              价格
            </button>
          </div>

          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="empty-state">
              <p>没有找到相关商品</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
