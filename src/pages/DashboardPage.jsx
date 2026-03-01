import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import FilterBar from '../components/UI/FilterBar';
import JobCard from '../components/UI/JobCard';
import JobModal from '../components/UI/JobModal';
import Toast from '../components/UI/Toast';
import { calculateMatchScore } from '../utils/scoring';

const DashboardPage = () => {
  const [preferences, setPreferences] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [jobStatuses, setJobStatuses] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    location: 'All Locations',
    mode: 'All Modes',
    experience: 'All Experience',
    source: 'All Sources',
    status: 'All',
    sort: 'Latest',
    onlyMatches: false
  });

  // Load data on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    const statuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    setSavedJobIds(saved);
    setPreferences(prefs);
    setJobStatuses(statuses);
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

  const handleStatusChange = (jobId, newStatus) => {
    const updatedStatuses = { ...jobStatuses, [jobId]: newStatus };
    setJobStatuses(updatedStatuses);
    localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatuses));

    // Log event for history
    const job = jobs.find(j => j.id === jobId);
    const events = JSON.parse(localStorage.getItem('jobTrackerEvents') || '[]');
    const newEvent = {
      jobId,
      title: job?.title,
      company: job?.company,
      status: newStatus,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('jobTrackerEvents', JSON.stringify([newEvent, ...events].slice(0, 50)));

    if (newStatus !== 'not-applied') {
      setToast(`Status updated: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Compute matches and apply filters
  const processedJobs = useMemo(() => {
    let result = jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences),
      status: jobStatuses[job.id] || 'not-applied'
    }));

    // Apply Filters (AND logic)
    result = result.filter(job => {
      const matchQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase());
      const matchLocation = filters.location === 'All Locations' || job.location === filters.location;
      const matchMode = filters.mode === 'All Modes' || job.mode === filters.mode;
      const matchExp = filters.experience === 'All Experience' || job.experience === filters.experience;
      const matchSource = filters.source === 'All Sources' || job.source === filters.source;
      const matchStatus = filters.status === 'All' || job.status === filters.status;
      const matchThreshold = !filters.onlyMatches || !preferences || job.matchScore >= (preferences.minMatchScore || 0);

      return matchQuery && matchLocation && matchMode && matchExp && matchSource && matchStatus && matchThreshold;
    });

    // Sorting
    if (filters.sort === 'Match Score') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sort === 'Salary') {
      result.sort((a, b) => {
        const valA = parseInt(a.salaryRange.match(/\d+/) || 0);
        const valB = parseInt(b.salaryRange.match(/\d+/) || 0);
        return valB - valA;
      });
    } else {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    return result;
  }, [filters, preferences, jobStatuses]);

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
              status={jobStatuses[job.id]}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '64px 0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px' }}>
              {filters.status !== 'All' ? "No roles with this status." : filters.onlyMatches ? "No roles match your criteria." : "No jobs match your search."}
            </h3>
            <p style={{ color: 'rgba(17,17,17,0.5)', marginTop: '8px' }}>
              {filters.onlyMatches ? "Adjust filters or lower your match threshold." : "Try adjusting your filters or search terms."}
            </p>
          </div>
        )}
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}

      <Toast message={toast} onClear={() => setToast(null)} />

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
