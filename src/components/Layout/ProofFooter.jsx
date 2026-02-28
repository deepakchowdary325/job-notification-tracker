import React from 'react';

export const ProofFooter = ({ items = [] }) => {
    return (
        <footer className="proof-footer">
            <div className="container flex items-center gap-24">
                {items.map((item, idx) => (
                    <div key={idx} className="footer-item flex items-center gap-8">
                        <div className={`check-box ${item.completed ? 'checked' : ''}`}>
                            {item.completed ? '✓' : '□'}
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .proof-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: white;
          border-top: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.5);
        }
        .check-box {
          font-family: monospace;
          font-size: 16px;
        }
        .checked {
          color: var(--success);
        }
      `}</style>
        </footer>
    );
};
