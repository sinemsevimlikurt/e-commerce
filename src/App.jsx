import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './Pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* Diğer route'lar buraya eklenebilir */}
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
