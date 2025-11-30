import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './views/HomePage';
import ProfessionalExperience from './views/gallerypages/ProfessionalExperience';
import Education from './views/gallerypages/Education';
import Interests from './views/gallerypages/Interest';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/professional-experience" element={<ProfessionalExperience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
