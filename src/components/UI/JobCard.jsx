import React from 'react';
import { Card } from '../Layout/Workspace';
import { Button } from './Base';
import { getScoreColor } from '../../utils/scoring';

const JobCard = ({ job, isSaved, onSave, onView, matchScore, status, onStatusChange }) => {
  const statusColors = {
    'not-applied': 'rgba(17, 17, 17, 0.4)',
    'applied': '#2563eb', // Blue
    'rejected': '#8B0000', // Deep Red/Accent
    'selected': '#4A6741'  // Success Green
  };

  const getDisplayStatus = (s) => (s || 'not-applied').replace('-', ' ');

  return (
    <Card>
      <div className="job-card-header flex justify-between items-start">
        <div className="job-info">
          <div className="flex items-center gap-12">
            <h3 className="job-title">{job.title}</h3>
            {matchScore !== undefined && (
              <div
                className="match-badge"
                style={{ backgroundColor: getScoreColor(matchScore) }}
              >
                {matchScore}% Match
              </div>
            )}
            <div
              className="status-badge"
              style={{ backgroundColor: statusColors[status || 'not-applied'] }}
            >
              {getDisplayStatus(status)}
            </div>
          </div>
          <p className="company-name">{job.company}</p>
        </div>
        <div className="source-badge">{job.source}</div>
      </div>

      <div className="job-meta flex gap-16" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
        <div className="meta-item">{job.location} • {job.mode}</div>
        <div className="meta-item">{job.experience} Exp</div>
        <div className="meta-item">{job.salaryRange}</div>
      </div>

      <div className="status-actions flex gap-8" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <button
          className={`status-btn ${status === 'applied' ? 'active active-applied' : ''}`}
          onClick={() => onStatusChange(job.id, 'applied')}
        >
          Applied
        </button>
        <button
          className={`status-btn ${status === 'rejected' ? 'active active-rejected' : ''}`}
          onClick={() => onStatusChange(job.id, 'rejected')}
        >
          Rejected
        </button>
        <button
          className={`status-btn ${status === 'selected' ? 'active active-selected' : ''}`}
          onClick={() => onStatusChange(job.id, 'selected')}
        >
          Selected
        </button>
        <button
          className={`status-btn ${(!status || status === 'not-applied') ? 'active' : ''}`}
          onClick={() => onStatusChange(job.id, 'not-applied')}
        >
          Reset
        </button>
      </div>

      <div className="job-card-footer flex items-center justify-between" style={{ marginTop: '16px' }}>
        <div className="posted-ago">{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}</div>
        <div className="actions flex gap-8">
          <Button variant="secondary" onClick={() => onSave(job.id)}>
            {isSaved ? 'Saved ✓' : 'Save'}
          </Button>
          <Button variant="secondary" onClick={() => onView(job)}>View</Button>
          <Button onClick={() => window.open(job.applyUrl, '_blank')}>Apply</Button>
        </div>
      </div>

      <style jsx>{`
        .job-title {
          font-family: var(--font-serif);
          font-size: 20px;
          margin-bottom: 0px;
        }
        .match-badge, .status-badge {
          font-size: 11px;
          font-weight: 700;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .status-badge {
          background: rgba(17, 17, 17, 0.4);
        }
        .company-name {
          font-size: 15px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.7);
          margin-top: 4px;
        }
        .status-btn {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: white;
          cursor: pointer;
          color: rgba(17, 17, 17, 0.5);
          transition: all 0.2s ease;
        }
        .status-btn:hover {
          border-color: var(--text);
          color: var(--text);
        }
        .status-btn.active {
          background: var(--text);
          color: white;
          border-color: var(--text);
        }
        .status-btn.active-applied { background: #2563eb; border-color: #2563eb; }
        .status-btn.active-rejected { background: #8B0000; border-color: #8B0000; }
        .status-btn.active-selected { background: #4A6741; border-color: #4A6741; }

        .source-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(139, 0, 0, 0.05);
          color: var(--accent);
          padding: 4px 8px;
          border-radius: 4px;
        }
        .meta-item {
          font-size: 14px;
          color: rgba(17, 17, 17, 0.6);
        }
        .posted-ago {
          font-size: 13px;
          color: rgba(17, 17, 17, 0.4);
        }
      `}</style>
    </Card>
  );
};

export default JobCard;
