import React from 'react';
import { Card } from '../Layout/Workspace';
import { Button } from './Base';
import { getScoreColor } from '../../utils/scoring';

const JobCard = ({ job, isSaved, onSave, onView, matchScore }) => {
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

      <div className="job-card-footer flex items-center justify-between" style={{ marginTop: '24px' }}>
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
        .match-badge {
          font-size: 11px;
          font-weight: 700;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .company-name {
          font-size: 15px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.7);
          margin-top: 4px;
        }
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
