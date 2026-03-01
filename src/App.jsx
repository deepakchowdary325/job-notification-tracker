import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Components
import NavShell from './components/Navigation/NavShell';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SavedPage from './pages/SavedPage';
import DigestPage from './pages/DigestPage';
import ProofPage from './pages/ProofPage';
import TestChecklistPage from './pages/TestChecklistPage';
import ShipPage from './pages/ShipPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <NavShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/digest" element={<DigestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/proof" element={<ProofPage />} />

          {/* Internal QA Routes */}
          <Route path="/jt/07-test" element={<TestChecklistPage />} />
          <Route path="/jt/08-ship" element={<ShipPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </NavShell>
    </Router>
  );
}

export default App;
