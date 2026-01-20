import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import HomePage from './views/HomePage';
import ProfessionalExperience from './views/gallerypages/ProfessionalExperience';
import Education from './views/gallerypages/Education';
import InterestGallery from './views/gallerypages/InterestGallery';
import Boxing from './views/gallerypages/Interest/Boxing';
import Travel from './views/gallerypages/Interest/Travel';
import Photography from './views/gallerypages/Interest/Photography';

function AppContent() {
  const location = useLocation();
  const hideBannerPaths = ['/interests/travel'];
  const shouldShowBanner = !hideBannerPaths.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowBanner && <Banner />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/professional-experience" element={<ProfessionalExperience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/interests" element={<InterestGallery />} />
        <Route path="/interests/boxing" element={<Boxing />} />
        <Route path="/interests/travel" element={<Travel />} />
        <Route path="/interests/photography" element={<Photography />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
