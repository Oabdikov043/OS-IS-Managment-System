
import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Home from './components/header/home/Home';
import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/productdetails/ProductDetails';
import Footer from './components/footer/Footer';





export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </>
  );
}
