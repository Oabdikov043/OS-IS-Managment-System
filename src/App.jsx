
import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Home from './components/header/home/Home';
import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/productdetails/ProductDetails';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routeguards/PrivateRoute';
import GuestRoute from './components/routeguards/GuestRoute';





export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route
            path="/products/:productId"
            element={<ProductDetails />}
          />

          {/* Guest Only */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Authenticated Only */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
