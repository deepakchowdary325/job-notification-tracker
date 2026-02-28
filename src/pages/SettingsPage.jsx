import React from 'react';
import { Card } from '../components/Layout/Workspace';
import { Input, Button } from '../components/UI/Base';

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Configure your tracking preferences for precision discovery.</p>

            <Card title="Job Preferences">
                <div className="form-grid">
                    <Input label="Role Keywords" placeholder="e.g. Senior Frontend Engineer, Product Designer" />
                    <Input label="Preferred Locations" placeholder="e.g. Remote, New York, London" />

                    <div className="input-group">
                        <label>Work Mode</label>
                        <select className="premium-select">
                            <option>Remote</option>
                            <option>Hybrid</option>
                            <option>Onsite</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Experience Level</label>
                        <select className="premium-select">
                            <option>Entry Level</option>
                            <option>Mid Level</option>
                            <option>Senior Level</option>
                            <option>Lead / Principal</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                    <Button variant="primary">Save Preferences</Button>
                </div>
            </Card>

            <style jsx>{`
        .settings-page {
          padding-top: var(--s-64);
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
          gap: var(--s-24);
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: var(--s-8);
        }
        label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.6);
        }
        .premium-select {
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          font-family: var(--font-sans);
          font-size: 16px;
          outline: none;
          cursor: pointer;
        }
        .premium-select:focus {
          border-color: var(--border-focus);
        }
      `}</style>
        </div>
    );
};

export default SettingsPage;
