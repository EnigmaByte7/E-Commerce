import logo from './logo.svg';
import './App.css';
import Hero from './Hero';
import Categories from './Categories';
import Popular from './Popular';
import About from './About'
import Newsletter from './Newsletter';
import Footer from './Footer';
function App() {
  return (
    <div className="App">
      <Hero />
      <Categories />
      <Popular />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
