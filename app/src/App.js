import './App.css';
import Hero from './Hero';
import Categories from './Categories';
import Popular from './Popular';
import About from './About'
import Newsletter from './Newsletter';
import Footer from './Footer';
import Product from './Product';
import Login from './Login';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Cart from './Cart'
import Fav from './Fav'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/products/:catg' element={
            <Product/>}>
          </Route>
          <Route path='/' element={<>
              <Hero />
              <Categories />
              <Popular />
              <About />
              <Newsletter />
              <Footer />
              </>}>
          </Route>
          <Route path='/login' element={
            <Login />
          }></Route>
          <Route path='/register' element={
            <Register />
          }></Route>
          <Route path='/cart' element={
            <Cart />
          }></Route>
          <Route path='/favorites' element={
            <Fav />
          }></Route>
   </Routes>
  </Router>
    </div>
  );
}

export default App;
