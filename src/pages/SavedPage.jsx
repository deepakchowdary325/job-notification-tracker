import React from 'react';
import { Card } from '../components/Layout/Workspace';

const SavedPage = () => {
    return (
        <div className="saved-page">
            <h1 className="page-title">Saved Notifications</h1>

            <div className="empty-state-wrapper">
                <Card>
                    <div className="empty-state">
                        <h3 className="empty-title">Your saved list is empty.</h3>
                        <p className="empty-text">
                            Save interesting job notifications to review them later. This feature will be functional once the dataset is loaded.
                        </p>
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .saved-page {
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

export default SavedPage;
