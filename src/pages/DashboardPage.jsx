import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import FilterBar from '../components/UI/FilterBar';
import JobCard from '../components/UI/JobCard';
import JobModal from '../components/UI/JobModal';

const DashboardPage = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    query: '',
    location: 'All Locations',
    mode: 'All Modes',
    experience: 'All Experience',
    source: 'All Sources',
    sort: 'Latest'
  });

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(saved);
  }, []);

  // Update localStorage when savedJobIds change
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

  useEffect(() => {
    let result = jobs.filter(job => {
      const matchQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase());
      const matchLocation = filters.location === 'All Locations' || job.location === filters.location;
      const matchMode = filters.mode === 'All Modes' || job.mode === filters.mode;
      const matchExp = filters.experience === 'All Experience' || job.experience === filters.experience;
      const matchSource = filters.source === 'All Sources' || job.source === filters.source;

      return matchQuery && matchLocation && matchMode && matchExp && matchSource;
    });

    if (filters.sort === 'Salary') {
      result.sort((a, b) => {
        // Simple heuristic for salary sorting (extracting first number)
        const valA = parseInt(a.salaryRange.match(/\d+/) || 0);
        const valB = parseInt(b.salaryRange.match(/\d+/) || 0);
        return valB - valA;
      });
    } else {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    setFilteredJobs(result);
  }, [filters]);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard</h1>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <div className="jobs-count" style={{ marginBottom: '24px', fontSize: '14px', color: 'rgba(17,17,17,0.5)' }}>
        Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onSave={handleSave}
              onView={(j) => setSelectedJob(j)}
            />
          ))
        ) : (
          <div className="no-results" style={{ textAlign: 'center', padding: '64px 0' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px' }}>No jobs match your search.</h3>
            <p style={{ color: 'rgba(17,17,17,0.5)', marginTop: '8px' }}>Try adjusting your filters or search terms.</p>
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
