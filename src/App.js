import 'bulma/css/bulma.min.css'
import './assets/productgrid.sass'
import './assets/header.sass'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import SellPage from './pages/Sell'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sell" element={<SellPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
