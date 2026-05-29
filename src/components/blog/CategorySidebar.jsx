import { categories } from '../../data/categoryData'

function CategorySidebar({ activeCategory, onCategoryChange, categoryCounts }) {
  return (
    <div className="category-sidebar">
      <h4>分类</h4>
      <ul>
        <li
          className={`category-item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          <span className="category-name">全部</span>
          <span className="category-count">{categoryCounts.all || 0}</span>
        </li>
        {categories.map((cat) => (
          <li
            key={cat.slug}
            className={`category-item ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.slug)}
          >
            <span className="category-dot" style={{ backgroundColor: cat.color }}></span>
            <span className="category-name">{cat.name}</span>
            <span className="category-count">{categoryCounts[cat.slug] || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategorySidebar
