import React from 'react';

export const TopBar = ({ step = 1, totalSteps = 4, status = 'Not Started' }) => {
    return (
        <div className="top-bar flex items-center justify-between">
            <div className="app-name">Job Notification App</div>
            <div className="progress">Step {step} / {totalSteps}</div>
            <div className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
                {status}
            </div>
            <style jsx>{`
        .top-bar {
          height: 64px;
          border-bottom: 1px solid var(--border);
          padding: 0 var(--s-24);
          font-weight: 500;
          font-size: 14px;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 99px;
          background: rgba(17, 17, 17, 0.05);
          font-size: 12px;
          color: var(--text);
        }
      `}</style>
        </div>
    );
};

export const ContextHeader = ({ title, subtitle }) => {
    return (
        <div className="context-header">
            <h1 className="title">{title}</h1>
            <p className="subtitle">{subtitle}</p>
            <style jsx>{`
        .context-header {
          padding: var(--s-64) var(--s-24) var(--s-40);
          max-width: 1200px;
          margin: 0 auto;
        }
        .title {
          font-size: 40px;
          line-height: 1.2;
          margin-bottom: var(--s-8);
        }
        .subtitle {
          font-family: var(--font-sans);
          font-size: 18px;
          color: rgba(17, 17, 17, 0.6);
          margin-bottom: 0;
        }
      `}</style>
        </div>
    );
};
