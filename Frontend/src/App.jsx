import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Compare from './pages/Compare';
import History from './pages/History';
import SellHouse from './pages/SellHouse';
import SellHistory from './pages/SellHistory';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/input" element={<InputForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/history" element={<History />} />
              <Route path="/sell-house" element={<SellHouse />} />
              <Route path="/sell-history" element={<SellHistory />} />
            </Routes>
          </main>
          <Footer />
          <Feedback />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
