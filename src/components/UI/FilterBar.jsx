import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="filter-bar">
            <div className="search-box">
                <input
                    type="text"
                    name="query"
                    placeholder="Search by title or company..."
                    value={filters.query}
                    onChange={handleChange}
                />
            </div>

            <div className="dropdowns flex gap-16" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
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
                    <option value="Latest">Latest</option>
                    <option value="Salary">Highest Salary</option>
                </select>
            </div>

            <style jsx>{`
        .filter-bar {
          margin-bottom: var(--s-40);
        }
        input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          font-family: var(--font-size);
          font-size: 16px;
          outline: none;
          transition: border-color var(--transition);
        }
        input:focus {
          border-color: var(--border-focus);
        }
        select {
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: white;
          font-size: 14px;
          color: rgba(17,17,17,0.7);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default FilterBar;
