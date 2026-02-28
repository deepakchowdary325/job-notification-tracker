import React, { useState, useEffect } from 'react';
import { Card } from '../components/Layout/Workspace';
import { Button } from '../components/UI/Base';
import { jobs } from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';
import { Link } from 'react-router-dom';

const DigestPage = () => {
  const [digest, setDigest] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [todayStr] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
    setPreferences(prefs);

    const savedDigest = JSON.parse(localStorage.getItem(`jobTrackerDigest_${todayStr}`));
    if (savedDigest) {
      setDigest(savedDigest);
    }
  }, [todayStr]);

  const generateDigest = () => {
    if (!preferences) return;

    // 1. Calculate scores for all jobs
    const scoredJobs = jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, preferences)
    }));

    // 2. Select top 10
    const topJobs = scoredJobs
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return a.postedDaysAgo - b.postedDaysAgo;
      })
      .slice(0, 10);

    const newDigest = {
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      jobs: topJobs
    };

    setDigest(newDigest);
    localStorage.setItem(`jobTrackerDigest_${todayStr}`, JSON.stringify(newDigest));
  };

  const copyToClipboard = () => {
    if (!digest) return;
    const text = `Top 10 Jobs For You — 9AM Digest (${digest.date})\n\n` +
      digest.jobs.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} [${j.matchScore}% Match]\n   ${j.location} | ${j.experience}\n   Apply: ${j.applyUrl}`).join('\n\n') +
      `\n\nThis digest was generated based on your preferences.`;

    navigator.clipboard.writeText(text);
    alert('Digest copied to clipboard!');
  };

  const createEmailDraft = () => {
    if (!digest) return;
    const subject = encodeURIComponent(`My 9AM Job Digest - ${digest.date}`);
    const body = encodeURIComponent(
      `Top 10 Jobs For You — 9AM Digest (${digest.date})\n\n` +
      digest.jobs.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} (${j.matchScore}% Match)\n   Apply: ${j.applyUrl}`).join('\n\n')
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!preferences) {
    return (
      <div className="digest-page container">
        <h1 className="page-title">Daily Digest</h1>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px' }}>Preferences not set.</h3>
            <p style={{ color: 'rgba(17,17,17,0.5)', marginTop: '8px' }}>
              Set your preferences to generate a personalized daily digest.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link to="/settings">
                <Button>Go to Settings</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="digest-page">
      <div className="container" style={{ maxWidth: '720px' }}>
        <div className="flex justify-between items-end" style={{ marginBottom: '40px' }}>
          <div>
            <h1 className="page-title" style={{ marginBottom: '8px' }}>Daily Digest</h1>
            <p className="subtitle">Your personalized 9AM delivery.</p>
          </div>
          {!digest && <Button onClick={generateDigest}>Generate Today's Digest</Button>}
        </div>

        {digest ? (
          <div className="email-container">
            <div className="email-header">
              <h2>Top 10 Jobs For You — 9AM Digest</h2>
              <p>{digest.date}</p>
            </div>

            <div className="email-body">
              {digest.jobs.length > 0 ? (
                digest.jobs.map((job, idx) => (
                  <div key={job.id} className="digest-item">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="job-title">{idx + 1}. {job.title}</h3>
                        <p className="job-subtitle">{job.company} • {job.location}</p>
                        <p className="job-meta">{job.experience} Exp • {job.matchScore}% Match</p>
                      </div>
                      <Button variant="secondary" onClick={() => window.open(job.applyUrl, '_blank')}>Apply</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p>No matching roles today. Check again tomorrow.</p>
                </div>
              )}
            </div>

            <div className="email-footer">
              <p>This digest was generated based on your preferences.</p>
              <p className="sim-note">Demo Mode: Daily 9AM trigger simulated manually.</p>
            </div>

            <div className="action-row flex gap-12 justify-center" style={{ marginTop: '40px' }}>
              <Button variant="secondary" onClick={copyToClipboard}>Copy to Clipboard</Button>
              <Button variant="secondary" onClick={createEmailDraft}>Create Email Draft</Button>
            </div>
          </div>
        ) : (
          <Card>
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ color: 'rgba(17,17,17,0.5)' }}>Click the button above to simulate your daily 9AM delivery.</p>
            </div>
          </Card>
        )}
      </div>

      <style jsx>{`
        .digest-page {
          padding: var(--s-64) 0;
          background: var(--bg);
          min-height: 80vh;
        }
        .page-title {
          font-size: 40px;
        }
        .subtitle {
          color: rgba(17,17,17,0.5);
          font-size: 18px;
        }
        .email-container {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05);
        }
        .email-header {
          padding: 40px;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .email-header h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          margin-bottom: 8px;
        }
        .email-header p {
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .email-body {
          padding: 24px 40px;
        }
        .digest-item {
          padding: 24px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .digest-item:last-child {
          border-bottom: none;
        }
        .job-title {
          font-family: var(--font-serif);
          font-size: 18px;
          margin-bottom: 4px;
        }
        .job-subtitle {
          font-weight: 600;
          font-size: 14px;
          color: rgba(17,17,17,0.8);
        }
        .job-meta {
          font-size: 13px;
          color: rgba(17,17,17,0.5);
          margin-top: 4px;
        }
        .email-footer {
          padding: 32px 40px;
          background: #fafaf9;
          text-align: center;
          font-size: 13px;
          color: rgba(17,17,17,0.4);
          border-top: 1px solid var(--border);
        }
        .sim-note {
          margin-top: 8px;
          font-style: italic;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};

export default DigestPage;
