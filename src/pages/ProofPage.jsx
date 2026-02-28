import React from 'react';

const ProofPage = () => {
    return (
        <div className="proof-page">
            <h1 className="page-title">Proof of Concept</h1>
            <p className="page-subtitle">This section serves as a placeholder for artifact collection and system documentation.</p>

            <style jsx>{`
        .proof-page {
          padding-top: var(--s-64);
          max-width: var(--max-width);
        }
        .page-title {
          font-size: 40px;
          margin-bottom: var(--s-16);
        }
        .page-subtitle {
          font-size: 18px;
          color: rgba(17, 17, 17, 0.5);
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
};

export default ProofPage;
