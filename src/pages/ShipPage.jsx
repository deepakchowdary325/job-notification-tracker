import React, { useState, useEffect } from 'react';
import { Card } from '../components/Layout/Workspace';
import { Button } from '../components/UI/Base';
import { Link } from 'react-router-dom';

const ShipPage = () => {
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('jobTrackerTestStatus') || '{}');
        const count = Object.values(saved).filter(Boolean).length;
        setPassedCount(count);
    }, []);

    const isLocked = passedCount < 10;

    return (
        <div className="ship-page container" style={{ maxWidth: '720px', padding: '64px 0', textAlign: 'center' }}>
            <h1 className="page-title" style={{ fontSize: '40px', marginBottom: '40px' }}>Final Shipping</h1>

            {isLocked ? (
                <Card style={{ padding: '64px 40px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔒</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '16px' }}>Ready to ship? Not quite.</h2>
                    <p style={{ color: 'rgba(17,17,17,0.5)', lineHeight: '1.6', marginBottom: '32px' }}>
                        Shipping to production requires all 10 core functionality tests to pass.
                        Currently, only <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{passedCount} / 10</span> items are verified.
                    </p>
                    <Link to="/jt/07-test">
                        <Button>Complete All Tests</Button>
                    </Link>
                </Card>
            ) : (
                <Card style={{ padding: '64px 40px', border: '2px solid var(--success)' }}>
                    <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '16px', color: 'var(--success)' }}>
                        Systems Nominal. Ready for Launch.
                    </h2>
                    <p style={{ color: 'rgba(17,17,17,0.5)', lineHeight: '1.6', marginBottom: '32px' }}>
                        All 10 quality gates have been cleared. The Job Notification Tracker is stable, verified, and ready for the world.
                    </p>
                    <div className="flex gap-12 justify-center">
                        <Link to="/dashboard">
                            <Button variant="secondary">Back to Dashboard</Button>
                        </Link>
                        <Button onClick={() => alert('Application successfully deployed to production simulation.')}>
                            Confirm Deployment
                        </Button>
                    </div>
                </Card>
            )}

            <style jsx>{`
        .page-title {
          font-family: var(--font-serif);
        }
      `}</style>
        </div>
    );
};

export default ShipPage;
