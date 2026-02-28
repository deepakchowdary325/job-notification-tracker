import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="placeholder-page">
            <h1>{title}</h1>
            <p className="muted">This section will be built in the next step.</p>

            <style jsx>{`
        .placeholder-page {
          padding-top: var(--s-64);
          max-width: var(--max-width);
        }
        h1 {
          font-size: 40px;
          margin-bottom: var(--s-16);
        }
        .muted {
          font-size: 18px;
          color: rgba(17, 17, 17, 0.5);
        }
      `}</style>
        </div>
    );
};

export default PlaceholderPage;
