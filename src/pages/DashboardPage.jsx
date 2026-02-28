import React from 'react';
import { Card } from '../components/Layout/Workspace';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <h1 className="page-title">Dashboard</h1>

            <div className="empty-state-wrapper">
                <Card>
                    <div className="empty-state">
                        <h3 className="empty-title">No jobs yet.</h3>
                        <p className="empty-text">
                            Configure your preferences in Settings to start tracking. In the next step, you will load a realistic dataset.
                        </p>
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .dashboard-page {
          padding-top: var(--s-64);
          max-width: var(--max-width);
        }
        .page-title {
          font-size: 40px;
          margin-bottom: var(--s-40);
        }
        .empty-state {
          padding: var(--s-40) 0;
          text-align: center;
        }
        .empty-title {
          font-size: 24px;
          margin-bottom: var(--s-8);
          font-family: var(--font-serif);
        }
        .empty-text {
          font-size: 16px;
          color: rgba(17, 17, 17, 0.5);
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
};

export default DashboardPage;
