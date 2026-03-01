import React, { useState, useEffect } from 'react';
import { Card } from '../components/Layout/Workspace';
import { Button } from '../components/UI/Base';

const checklistItems = [
    { id: 'prefs_persist', label: 'Preferences persist after refresh', hint: 'Change settings, refresh, and confirm they remain.' },
    { id: 'match_score', label: 'Match score calculates correctly', hint: 'Check scoring badge against preference rules.' },
    { id: 'toggle_matches', label: '"Show only matches" toggle works', hint: 'Toggle and confirm non-matching jobs disappear.' },
    { id: 'save_persist', label: 'Save job persists after refresh', hint: 'Save a job, refresh, and check Saved tab.' },
    { id: 'apply_tab', label: 'Apply opens in new tab', hint: 'Click Apply and verify target="_blank" behavior.' },
    { id: 'status_persist', label: 'Status update persists after refresh', hint: 'Change status, refresh, and check badge color.' },
    { id: 'status_filter', label: 'Status filter works correctly', hint: 'Filter by Status and verify result accuracy.' },
    { id: 'digest_top_10', label: 'Digest generates top 10 by score', hint: 'Verify digest sorting matches score & date.' },
    { id: 'digest_persist', label: 'Digest persists for the day', hint: 'Generate, refresh, and confirm contents stay.' },
    { id: 'no_errors', label: 'No console errors on main pages', hint: 'Check DevTools Console for unexpected red text.' }
];

const TestChecklistPage = () => {
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('jobTrackerTestStatus') || '{}');
        setCheckedItems(saved);
    }, []);

    const handleToggle = (id) => {
        const updated = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(updated);
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(updated));
    };

    const handleReset = () => {
        if (window.confirm('Reset all test statuses?')) {
            setCheckedItems({});
            localStorage.setItem('jobTrackerTestStatus', JSON.stringify({}));
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="test-checklist-page container" style={{ maxWidth: '720px', padding: '64px 0' }}>
            <div className="flex justify-between items-end" style={{ marginBottom: '40px' }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '40px', marginBottom: '8px' }}>Internal QA Checklist</h1>
                    <p className="subtitle" style={{ color: 'rgba(17,17,17,0.5)', fontSize: '18px' }}>Verify all core features before shipping.</p>
                </div>
                <Button variant="secondary" onClick={handleReset}>Reset Test Status</Button>
            </div>

            <Card style={{ marginBottom: '40px' }}>
                <div className="flex justify-between items-center" style={{ padding: '24px' }}>
                    <div style={{ fontSize: '24px', fontFamily: 'var(--font-serif)' }}>
                        Tests Passed: <span style={{ color: passedCount === 10 ? 'var(--success)' : 'var(--accent)' }}>{passedCount} / 10</span>
                    </div>
                    {passedCount < 10 && (
                        <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: '600' }}>
                            Resolve all issues before shipping.
                        </div>
                    )}
                </div>
            </Card>

            <div className="checklist-grid">
                {checklistItems.map(item => (
                    <div key={item.id} className="checklist-item-wrapper" style={{ marginBottom: '16px' }}>
                        <label className="checklist-item flex items-center gap-16" style={{ cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={!!checkedItems[item.id]}
                                onChange={() => handleToggle(item.id)}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                            />
                            <div className="flex-1">
                                <div style={{ fontSize: '16px', fontWeight: '500' }}>{item.label}</div>
                                <div className="tooltip-hint" style={{ fontSize: '12px', color: 'rgba(17,17,17,0.4)', marginTop: '2px' }}>
                                    {item.hint}
                                </div>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Button
                    disabled={passedCount < 10}
                    onClick={() => window.location.href = '/jt/08-ship'}
                    style={{ padding: '16px 40px', opacity: passedCount < 10 ? 0.5 : 1 }}
                >
                    Proceed to Shipping
                </Button>
            </div>

            <style jsx>{`
        .checklist-item-wrapper {
          padding: 16px 24px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: border-color 0.2s ease;
        }
        .checklist-item-wrapper:hover {
          border-color: var(--accent);
        }
      `}</style>
        </div>
    );
};

export default TestChecklistPage;
