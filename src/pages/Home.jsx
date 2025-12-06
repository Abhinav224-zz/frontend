// Mock product data for ecommerce UI
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium quality wireless headphones with noise cancellation',
    price: '$199.99',
    emoji: '🎧',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: '$299.99',
    emoji: '⌚',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand for better posture',
    price: '$49.99',
    emoji: '💻',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with cherry switches',
    price: '$149.99',
    emoji: '⌨️',
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: '$79.99',
    emoji: '🖱️',
  },
  {
    id: 6,
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI and SD card reader',
    price: '$39.99',
    emoji: '🔌',
  },
];

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Store</h1>
        <p className="hero-subtitle">Discover amazing products at great prices</p>
      </div>

      <div className="products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

