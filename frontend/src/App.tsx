import { Route, Routes } from 'react-router'
import { AdminLayout } from './layouts/AdminLayout'
import { StorefrontLayout } from './layouts/StorefrontLayout'
import CategoriesAdminPage from './pages/admin/CategoriesAdminPage'
import CustomersAdminPage from './pages/admin/CustomersAdminPage'
import DashboardPage from './pages/admin/DashboardPage'
import InventoryPage from './pages/admin/InventoryPage'
import OrdersAdminPage from './pages/admin/OrdersAdminPage'
import ProductsAdminPage from './pages/admin/ProductsAdminPage'
import CartPage from './pages/store/CartPage'
import CheckoutPage from './pages/store/CheckoutPage'
import HomePage from './pages/store/HomePage'
import OrderConfirmationPage from './pages/store/OrderConfirmationPage'
import ProductDetailPage from './pages/store/ProductDetailPage'
import ProductsPage from './pages/store/ProductsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="orders" element={<OrdersAdminPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="categories" element={<CategoriesAdminPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="customers" element={<CustomersAdminPage />} />
      </Route>
    </Routes>
  )
}
