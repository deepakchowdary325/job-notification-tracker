import React from 'react';
import { Button } from './Base';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <h2 className="modal-title">{job.title}</h2>
                <p className="modal-company">{job.company}</p>

                <div className="modal-meta flex gap-16" style={{ marginBottom: '32px' }}>
                    <span>{job.location}</span>
                    <span>{job.experience} Experience</span>
                    <span>{job.salaryRange}</span>
                </div>

                <div className="section">
                    <h4>Description</h4>
                    <p className="description-text">{job.description}</p>
                </div>

                <div className="section" style={{ marginTop: '24px' }}>
                    <h4>Required Skills</h4>
                    <div className="skills-list flex gap-8" style={{ flexWrap: 'wrap', marginTop: '12px' }}>
                        {job.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="modal-footer" style={{ marginTop: '40px' }}>
                    <Button onClick={() => window.open(job.applyUrl, '_blank')} style={{ width: '100%' }}>
                        Apply on {job.source}
                    </Button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-content {
          background: var(--bg);
          width: 90%;
          max-width: 600px;
          padding: var(--s-40);
          border-radius: var(--radius);
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: rgba(17,17,17,0.4);
        }
        .modal-title {
          font-family: var(--font-serif);
          font-size: 32px;
          margin-bottom: 8px;
        }
        .modal-company {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .modal-meta {
          font-size: 14px;
          color: rgba(17,17,17,0.6);
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(17,17,17,0.4);
        }
        .description-text {
           line-height: 1.7;
           color: var(--text);
        }
        .skill-tag {
          padding: 6px 12px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
        }
      `}</style>
        </div>
    );
};

export default JobModal;
