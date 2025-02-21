import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store from './store';
import { setupAxiosInterceptors, verifyToken } from './services/api';
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
import './App.css';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const user = await verifyToken();
      if (user) {
        dispatch(setUser(user));
      }
    };

    setupAxiosInterceptors();
    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/product/:id" component={ProductDetailPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/team" component={TeamPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
