import React, { useState, useEffect } from 'react';
import { Card } from '../components/Layout/Workspace';
import { Input, Button } from '../components/UI/Base';

const SettingsPage = () => {
  const [prefs, setPrefs] = useState({
    roleKeywords: '',
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: 'Entry Level',
    skills: '',
    minMatchScore: 40
  });

  const locations = ["Bangalore", "Mumbai", "Chennai", "Gurgaon", "Hyderabad", "Noida", "Remote"];
  const modes = ["Remote", "Hybrid", "Onsite"];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    if (saved) setPrefs(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
    alert('Preferences saved successfully.');
  };

  const toggleLocation = (loc) => {
    const updated = prefs.preferredLocations.includes(loc)
      ? prefs.preferredLocations.filter(l => l !== loc)
      : [...prefs.preferredLocations, loc];
    setPrefs({ ...prefs, preferredLocations: updated });
  };

  const toggleMode = (mode) => {
    const updated = prefs.preferredMode.includes(mode)
      ? prefs.preferredMode.filter(m => m !== mode)
      : [...prefs.preferredMode, mode];
    setPrefs({ ...prefs, preferredMode: updated });
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">Matching Preferences</h1>
      <p className="page-subtitle">Define your ideal role to activate intelligent job discovery.</p>

      <Card title="Discovery Criteria">
        <div className="form-grid">
          <Input
            label="Role Keywords (comma separated)"
            placeholder="e.g. Frontend, React, Backend"
            value={prefs.roleKeywords}
            onChange={(e) => setPrefs({ ...prefs, roleKeywords: e.target.value })}
          />

          <div className="input-group">
            <label>Preferred Locations</label>
            <div className="checkbox-group flex gap-8" style={{ flexWrap: 'wrap', marginTop: '8px' }}>
              {locations.map(loc => (
                <button
                  key={loc}
                  className={`chip ${prefs.preferredLocations.includes(loc) ? 'active' : ''}`}
                  onClick={() => toggleLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Work Mode</label>
            <div className="checkbox-group flex gap-16" style={{ marginTop: '8px' }}>
              {modes.map(mode => (
                <label key={mode} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={prefs.preferredMode.includes(mode)}
                    onChange={() => toggleMode(mode)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Experience Level</label>
            <select
              className="premium-select"
              value={prefs.experienceLevel}
              onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
            >
              <option value="Fresher">Fresher</option>
              <option value="0-1">0-1 Year</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
            </select>
          </div>

          <Input
            label="Key Skills (comma separated)"
            placeholder="e.g. Python, AWS, Figma"
            value={prefs.skills}
            onChange={(e) => setPrefs({ ...prefs, skills: e.target.value })}
          />

          <div className="input-group">
            <label className="flex justify-between">
              Minimum Match Score <span>{prefs.minMatchScore}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={prefs.minMatchScore}
              onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
              className="premium-range"
            />
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </Card>

      <style jsx>{`
        .settings-page {
          padding: var(--s-64) 0;
          max-width: var(--max-width);
        }
        .page-title {
          font-size: 40px;
          margin-bottom: var(--s-8);
        }
        .page-subtitle {
          font-size: 18px;
          color: rgba(17, 17, 17, 0.5);
          margin-bottom: var(--s-40);
        }
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: var(--s-32);
        }
        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.6);
        }
        .chip {
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 99px;
          font-size: 13px;
          background: white;
          cursor: pointer;
          transition: all var(--transition);
        }
        .chip.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          cursor: pointer;
        }
        .premium-select {
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          width: 100%;
          font-family: var(--font-sans);
          outline: none;
        }
        .premium-range {
          width: 100%;
          margin-top: 12px;
          accent-color: var(--accent);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
