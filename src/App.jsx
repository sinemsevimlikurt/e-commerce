import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
      </Switch>
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
      <Router basename="/">
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
