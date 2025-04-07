// ✅ Imports stay the same...
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

// ✅ Component Imports...
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Shop from "./Components/Pages/Shop";
import ShopCategory from "./Components/Pages/ShopCatagery";
import Product from "./Components/Pages/Product";
import Cart from "./Components/Pages/Cart";
import CombinedLogin from "./Components/Pages/Loginreg";
import Signup from "./Components/Pages/Signup";
import SearchResults from "./Components/Pages/SearchResult";
import UserProfile from "./Components/Pages/UserProfile";
import AddToCart from "./Components/Pages/AddToCart/AddToCart";

import AdminLayout from "./Admin-Component/AdminApp"; // ✅ AdminLayout with <Outlet />
import Home from "./Admin-Component/Home";
import Products from "./Admin-Component/Products";
import Categories from "./Admin-Component/Categories";
import Orders from "./Admin-Component/Orders";
import AddProduct from "./Admin-Component/AddProduct";
import DashboardUpdate from "./Admin-Component/DashboardUpdate";
import ProductDetail from "./Admin-Component/ProductDetail/ProductDetail";

import ShopContextProvider from "./Components/Context/ShopContext";
import { ProductProvider } from "./Admin-Component/ProductContext";

import Mens_banner from "./Components/Assets/Mens_Shoes_Collection_Banner.jpg";
import women_banner from "./Components/Assets/NIKE_WOMEN_SHOES.webp";
import kids_banner from "./Components/Assets/KIDS_BANNER_FOOTWEAR.webp";
import Collection_banner from "./Components/Assets/Collection_banner.webp";

import CartPage from "./Components/CartPage";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";

// --- Private Route Wrappers ---
const PrivateAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

const PrivateUserRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedInUser");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// --- Main App Routing Content ---
const AppContent = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") && location.pathname !== "/admin";
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && !isAdminRoute && <Navbar />}

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Shop />} />
        <Route
          path="/men"
          element={<ShopCategory banner={Mens_banner} category="men" />}
        />
        <Route
          path="/women"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kids" />}
        />
        <Route
          path="/collection"
          element={
            <ShopCategory banner={Collection_banner} category="collection" />
          }
        />
        <Route path="/cart-view" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDisplay />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<CombinedLogin />} />

        {/* --- Protected User Routes --- */}
        <Route
          path="/cart"
          element={
            <PrivateUserRoute>
              <Cart />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateUserRoute>
              <UserProfile />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateUserRoute>
              <AddToCart />
            </PrivateUserRoute>
          }
        />

        {/* --- Admin Panel with Nested Routes --- */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<Home />} /> {/* Default dashboard page */}
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* --- Other Admin Pages (Not nested) --- */}
        <Route
          path="/admin/addproduct"
          element={
            <PrivateAdminRoute>
              <AddProduct />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/dashboardupdate/:id"
          element={
            <PrivateAdminRoute>
              <DashboardUpdate />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <PrivateAdminRoute>
              <ProductDetail />
            </PrivateAdminRoute>
          }
        />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/dashboardupdate/:id" element={<AddProduct />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

// --- App Root ---
const App = () => {
  return (
    <ProductProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ShopContextProvider>
    </ProductProvider>
  );
};

export default App;
