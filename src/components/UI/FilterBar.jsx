import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onFilterChange(name, type === 'checkbox' ? checked : value);
    };

    return (
        <div className="filter-bar">
            <div className="search-row flex justify-between items-center gap-24">
                <div className="search-box flex-1">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search by title or company..."
                        value={filters.query}
                        onChange={handleChange}
                    />
                </div>
                <div className="toggle-box">
                    <label className="switch-label">
                        <input
                            type="checkbox"
                            name="onlyMatches"
                            checked={filters.onlyMatches}
                            onChange={handleChange}
                        />
                        Show only jobs above my threshold
                    </label>
                </div>
            </div>

            <div className="dropdowns flex gap-12" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                <select name="location" value={filters.location} onChange={handleChange}>
                    <option value="All Locations">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Noida">Noida</option>
                    <option value="Remote">Remote</option>
                </select>

                <select name="mode" value={filters.mode} onChange={handleChange}>
                    <option value="All Modes">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                <select name="experience" value={filters.experience} onChange={handleChange}>
                    <option value="All Experience">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Year</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                </select>

                <select name="source" value={filters.source} onChange={handleChange}>
                    <option value="All Sources">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                <select name="sort" value={filters.sort} onChange={handleChange}>
                    <option value="Latest">Sort: Latest</option>
                    <option value="Match Score">Sort: Match Score</option>
                    <option value="Salary">Sort: Salary</option>
                </select>
            </div>

            <style jsx>{`
        .filter-bar {
          margin-bottom: var(--s-40);
        }
        input[type="text"] {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          font-size: 16px;
          outline: none;
        }
        .switch-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: var(--accent);
          cursor: pointer;
          white-space: nowrap;
        }
        select {
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          font-size: 13px;
          color: rgba(17,17,17,0.7);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default FilterBar;
