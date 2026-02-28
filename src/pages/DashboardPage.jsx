import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import FilterBar from '../components/UI/FilterBar';
import JobCard from '../components/UI/JobCard';
import JobModal from '../components/UI/JobModal';
import { calculateMatchScore } from '../utils/scoring';

const DashboardPage = () => {
  const [preferences, setPreferences] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    location: 'All Locations',
    mode: 'All Modes',
    experience: 'All Experience',
    source: 'All Sources',
    sort: 'Latest',
    onlyMatches: false
  });

  // Load data on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    setSavedJobIds(saved);
    setPreferences(prefs);
  }, []);

  const handleSave = (id) => {
    let updated;
    if (savedJobIds.includes(id)) {
      updated = savedJobIds.filter(jobId => jobId !== id);
    } else {
      updated = [...savedJobIds, id];
    }
    setSavedJobIds(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Compute matches and apply filters
  const processedJobs = useMemo(() => {
    // 1. Calculate scores for all jobs
    let result = jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences)
    }));

    // 2. Apply Filters (AND logic)
    result = result.filter(job => {
      const matchQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase());
      const matchLocation = filters.location === 'All Locations' || job.location === filters.location;
      const matchMode = filters.mode === 'All Modes' || job.mode === filters.mode;
      const matchExp = filters.experience === 'All Experience' || job.experience === filters.experience;
      const matchSource = filters.source === 'All Sources' || job.source === filters.source;
      const matchThreshold = !filters.onlyMatches || !preferences || job.matchScore >= (preferences.minMatchScore || 0);

      return matchQuery && matchLocation && matchMode && matchExp && matchSource && matchThreshold;
    });

    // 3. Sorting
    if (filters.sort === 'Match Score') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sort === 'Salary') {
      result.sort((a, b) => {
        const valA = parseInt(a.salaryRange.match(/\d+/) || 0);
        const valB = parseInt(b.salaryRange.match(/\d+/) || 0);
        return valB - valA;
      });
    } else {
      // Latest (postedDaysAgo ascending)
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    return result;
  }, [filters, preferences]);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      {!preferences && (
        <div className="preferences-banner">
          <p>Set your preferences to activate intelligent matching.</p>
          <Link to="/settings" className="btn-link">Go to Settings</Link>
        </div>
      )}

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="jobs-count" style={{ marginBottom: '24px', fontSize: '14px', color: 'rgba(17,17,17,0.5)' }}>
        Showing {processedJobs.length} {processedJobs.length === 1 ? 'job' : 'jobs'}
      </div>

      <div className="job-list">
        {processedJobs.length > 0 ? (
          processedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onSave={handleSave}
              onView={(j) => setSelectedJob(j)}
              matchScore={preferences ? job.matchScore : undefined}
            />
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '64px 0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px' }}>
              {filters.onlyMatches ? "No roles match your criteria." : "No jobs match your search."}
            </h3>
            <p style={{ color: 'rgba(17,17,17,0.5)', marginTop: '8px' }}>
              {filters.onlyMatches ? "Adjust filters or lower your match threshold." : "Try adjusting your filters or search terms."}
            </p>
          </div>
        )}
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}

      <style jsx>{`
        .dashboard-page {
          padding: var(--s-64) 0;
          max-width: var(--max-width);
        }
        .page-title {
          font-size: 40px;
          margin-bottom: var(--s-40);
        }
        .preferences-banner {
          background: rgba(139, 0, 0, 0.05);
          border: 1px solid var(--accent);
          padding: var(--s-16) var(--s-24);
          border-radius: var(--radius);
          margin-bottom: var(--s-40);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
        }
        .btn-link {
          color: var(--accent);
          text-decoration: underline;
        }
        .job-list {
          display: flex;
          flex-direction: column;
          gap: var(--s-16);
          margin-bottom: var(--s-64);
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
