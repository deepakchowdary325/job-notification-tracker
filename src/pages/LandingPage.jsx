import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Base';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="hero">
                <h1 className="headline">Stop Missing The Right Jobs.</h1>
                <p className="subtext">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
                <Button onClick={() => navigate('/settings')} style={{ padding: '16px 32px', fontSize: '18px' }}>
                    Start Tracking
                </Button>
            </div>

            <style jsx>{`
        .landing-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
          text-align: center;
          padding-bottom: var(--s-64);
        }
        .hero {
          max-width: var(--max-width);
        }
        .headline {
          font-size: 64px;
          line-height: 1.1;
          margin-bottom: var(--s-24);
          letter-spacing: -0.03em;
        }
        .subtext {
          font-size: 20px;
          color: rgba(17, 17, 17, 0.6);
          margin-bottom: var(--s-40);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .headline {
            font-size: 40px;
          }
          .subtext {
            font-size: 18px;
          }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
