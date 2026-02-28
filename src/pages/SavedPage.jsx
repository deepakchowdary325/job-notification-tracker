import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/UI/JobCard';
import JobModal from '../components/UI/JobModal';
import { Card } from '../components/Layout/Workspace';
import { calculateMatchScore } from '../utils/scoring';

const SavedPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    setPreferences(prefs);

    const result = jobs.filter(job => savedIds.includes(job.id)).map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, prefs)
    }));

    setSavedJobs(result);
  }, []);

  const handleRemove = (id) => {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const updatedIds = savedIds.filter(jobId => jobId !== id);
    localStorage.setItem('savedJobs', JSON.stringify(updatedIds));
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  return (
    <div className="saved-page">
      <h1 className="page-title">Saved Notifications</h1>

      <div className="job-list">
        {savedJobs.length > 0 ? (
          savedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSave={handleRemove}
              onView={(j) => setSelectedJob(j)}
              matchScore={preferences ? job.matchScore : undefined}
            />
          ))
        ) : (
          <div className="empty-state-wrapper">
            <Card>
              <div className="empty-state">
                <h3 className="empty-title">Your saved list is empty.</h3>
                <p className="empty-text">
                  Save interesting job notifications from the dashboard to review them later.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}

      <style jsx>{`
        .saved-page {
          padding: var(--s-64) 0;
          max-width: var(--max-width);
        }
        .page-title {
          font-size: 40px;
          margin-bottom: var(--s-40);
        }
        .job-list {
          display: flex;
          flex-direction: column;
          gap: var(--s-16);
          margin-bottom: var(--s-64);
        }
        .empty-state {
          padding: var(--s-40) 0;
          text-align: center;
        }
        .empty-title {
          font-size: 24px;
          margin-bottom: var(--s-8);
          font-family: var(--font-serif);
        }
        .empty-text {
          font-size: 16px;
          color: rgba(17,17,17,0.5);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default SavedPage;
