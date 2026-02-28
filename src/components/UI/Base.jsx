import React from 'react';

export const Button = ({ variant = 'primary', children, ...props }) => {
    return (
        <button className={`btn btn-${variant}`} {...props}>
            {children}
            <style jsx>{`
        .btn {
          padding: 10px 20px;
          border-radius: var(--radius);
          font-weight: 500;
          font-size: 15px;
          transition: all var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          border: 1px solid var(--accent);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-primary:hover {
          opacity: 0.9;
        }
        .btn-secondary:hover {
          background: rgba(17,17,17, 0.05);
        }
      `}</style>
        </button>
    );
};

export const Input = ({ label, ...props }) => {
    return (
        <div className="input-group">
            {label && <label>{label}</label>}
            <input {...props} />
            <style jsx>{`
        .input-group {
          margin-bottom: var(--s-16);
          display: flex;
          flex-direction: column;
          gap: var(--s-8);
        }
        label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.6);
        }
        input {
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          width: 100%;
          outline: none;
          transition: border-color var(--transition);
        }
        input:focus {
          border-color: var(--border-focus);
        }
      `}</style>
        </div>
    );
};
