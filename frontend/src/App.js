import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Hero from './Components/Hero';
import About from './Components/About';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rate" element={<Login />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element = { <></>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
