import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import ProductDetailPage from './components/ProductDetailPage';
import BuyProduct from './components/BuyProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/productdetail"
          element={
            <ProductDetailPage
              onAddToCart={() => {}}
              onBackToHome={() => {}}
              onLogin={() => {}}
            />
          }
        />
        <Route
          path="/buyproduct"
          element={<BuyProduct onPlaceOrder={() => {}} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
