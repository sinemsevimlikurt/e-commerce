import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import api, { setupAxiosInterceptors, verifyToken } from './services/api';
import { setUser } from './store/slices/authSlice';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import ContactPage from './Pages/ContactPage';
import TeamPage from './Pages/TeamPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import About from './components/about/About';
import CartPage from './Pages/CartPage';
import CheckoutAddressPage from './Pages/CheckoutAddressPage';
import PaymentMethodsPage from './Pages/PaymentMethodsPage';
import CheckoutPaymentPage from './Pages/CheckoutPaymentPage';
import OrderSuccessPage from './Pages/OrderSuccessPage';
import './App.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const userData = await verifyToken();
      if (userData) {
        dispatch(setUser(userData));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={CartPage} />
          <Route exact path="/checkout" component={CheckoutAddressPage} />
          <Route exact path="/checkout/payment" component={CheckoutPaymentPage} />
          <Route exact path="/payment-methods" component={PaymentMethodsPage} />
          <Route exact path="/order-success" component={OrderSuccessPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AppContent />
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
};

export default App;
