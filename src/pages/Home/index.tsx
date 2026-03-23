import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useAppStore } from '../../store';
import { categories } from '../../data';
import './Home.css';

type SortType = 'comprehensive' | 'sales' | 'price';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [sortType, setSortType] = useState<SortType>('comprehensive');
  const { products, fetchProducts, searchQuery, loading } = useAppStore();

  const allCategories = ['全部', ...categories];

  useEffect(() => {
    const params: { search?: string; sort?: string } = {};
    if (searchQuery) params.search = searchQuery;
    if (sortType === 'sales') params.sort = 'sales';
    if (sortType === 'price') params.sort = 'price';
    fetchProducts(params);
  }, [searchQuery, sortType, fetchProducts]);

  return (
    <div className="home">
      <div className="home-content">
        <aside className="category-nav">
          <h3 className="category-title">商品分类</h3>
          <ul className="category-list">
            {allCategories.map((cat) => (
              <li
                key={cat}
                className={`category-item ${activeCategory === cat ? 'active' : ''}`}
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

          {loading ? (
            <div className="loading">加载中...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="empty-state">
              <p>没有找到相关商品</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
