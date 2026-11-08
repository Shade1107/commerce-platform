import { Route, Routes } from 'react-router'
import { StorefrontLayout } from './layouts/StorefrontLayout'
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
    </Routes>
  )
}
