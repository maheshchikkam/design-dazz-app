import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/layout/Footer';
import { routes } from './routes';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
