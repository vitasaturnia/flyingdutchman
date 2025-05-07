import 'bulma/css/bulma.min.css'
import './assets/productgrid.sass'
import './assets/header.sass'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import SellPage from './pages/Sell'
import CartPage from './pages/Cart'

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Navbar />
          <main style={{ flex: 1, width: '100%' }}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <AnimatedPage>
                    <Home />
                  </AnimatedPage>
                } />
                <Route path="/shop" element={
                  <AnimatedPage>
                    <Shop />
                  </AnimatedPage>
                } />
                <Route path="/about" element={
                  <AnimatedPage>
                    <About />
                  </AnimatedPage>
                } />
                <Route path="/contact" element={
                  <AnimatedPage>
                    <Contact />
                  </AnimatedPage>
                } />
                <Route path="/sell" element={
                  <AnimatedPage>
                    <SellPage />
                  </AnimatedPage>
                } />
                <Route path="/cart" element={
                  <AnimatedPage>
                    <CartPage />
                  </AnimatedPage>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
