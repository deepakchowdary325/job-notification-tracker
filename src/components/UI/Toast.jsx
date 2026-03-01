import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'info', onClear }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClear, 300); // Wait for transition
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClear]);

    if (!message && !visible) return null;

    return (
        <div className={`toast-wrapper ${visible ? 'visible' : ''}`}>
            <div className={`toast toast-${type}`}>
                {message}
            </div>
            <style jsx>{`
        .toast-wrapper {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 2000;
          pointer-events: none;
        }
        .toast-wrapper.visible {
          transform: translateX(-50%) translateY(0);
        }
        .toast {
          background: var(--text);
          color: white;
          padding: 12px 24px;
          border-radius: 99px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          pointer-events: auto;
        }
        .toast-success { border-left: 4px solid var(--success); }
        .toast-warning { border-left: 4px solid var(--warning); }
        .toast-error { border-left: 4px solid var(--accent); }
      `}</style>
        </div>
    );
};

export default Toast;
