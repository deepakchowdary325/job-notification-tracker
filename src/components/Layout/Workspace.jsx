import React from 'react';

export const MainLayout = ({ children, sidebar }) => {
    return (
        <div className="main-layout container">
            <div className="workspace">
                {children}
            </div>
            <aside className="sidebar">
                {sidebar}
            </aside>
            <style jsx>{`
        .main-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--s-40);
          padding-bottom: var(--s-64);
        }
        @media (max-width: 900px) {
          .main-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export const Card = ({ title, children }) => {
    return (
        <div className="card">
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-content">{children}</div>
            <style jsx>{`
        .card {
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: var(--s-24);
          background: white;
          margin-bottom: var(--s-24);
        }
        .card-title {
          font-size: 18px;
          margin-bottom: var(--s-16);
          font-family: var(--font-sans);
          font-weight: 600;
        }
      `}</style>
        </div>
    );
};
