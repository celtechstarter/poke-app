import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import ScanPage from './pages/scan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/scan" element={<ScanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
