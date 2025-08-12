
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ProductDetail } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
