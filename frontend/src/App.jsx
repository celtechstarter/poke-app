import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from './pages/Home';
import About from './pages/About';
import ScanPage from './pages/Scan';
<<<<<<< HEAD
import LoginPage from './pages/LoginPage'; 
import MyCards from './pages/MyCards';
import Navbar from './components/Navbar';


function App() {
  return (
    <Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/my-cards" element={<MyCards />} />
      </Routes>
    </Router>
=======
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/scan" element={<ScanPage />} />
        </Routes>
      </Router>
>>>>>>> 4b28d0a6ff7ae2371794f93609636e51d604623b
    </Theme>
  );
}

export default App;
