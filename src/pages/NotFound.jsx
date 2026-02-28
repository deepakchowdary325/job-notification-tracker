import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Page Not Found</h1>
            <p className="muted">The page you are looking for does not exist.</p>
            <Link to="/" className="back-link">Return to Safety</Link>

            <style jsx>{`
        .not-found {
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
          margin-bottom: var(--s-40);
        }
        .back-link {
          color: var(--accent);
          font-weight: 500;
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default NotFound;
