import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/product/:id" component={ProductDetailPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
