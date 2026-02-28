import React from 'react';
import { TopBar, ContextHeader } from './components/Layout/Headers';
import { MainLayout, Card } from './components/Layout/Workspace';
import { Button, Input } from './components/UI/Base';
import { ProofFooter } from './components/Layout/ProofFooter';

function App() {
  const proofItems = [
    { label: 'UI Built', completed: true },
    { label: 'Logic Working', completed: false },
    { label: 'Test Passed', completed: false },
    { label: 'Deployed', completed: false },
  ];

  const sidebar = (
    <div className="sidebar-content">
      <Card title="Step Explanation">
        <p style={{ fontSize: '14px', marginBottom: '16px' }}>
          This is the primary design system foundation. It uses a 70/30 split between workspace and information panel.
        </p>
        <div className="prompt-box">
          <code>job-notification-system --init</code>
        </div>
      </Card>
      <div className="flex flex-col gap-16">
        <Button variant="primary" style={{ width: '100%' }}>Continue Process</Button>
        <Button variant="secondary" style={{ width: '100%' }}>Save Draft</Button>
      </div>
      <style jsx>{`
        .prompt-box {
          background: #efeee9;
          padding: 12px;
          border-radius: var(--radius);
          font-family: monospace;
          font-size: 13px;
          margin-bottom: var(--s-16);
        }
      `}</style>
    </div>
  );

  return (
    <div className="app-root">
      <TopBar step={1} totalSteps={4} status="In Progress" />

      <ContextHeader
        title="Job Notification System"
        subtitle="Manage your automated job discovery and notification workflows with precision."
      />

      <MainLayout sidebar={sidebar}>
        <Card title="Active Notifications">
          <p>
            Welcome to the new Job Notification App. This design system is built to feel
            calm, intentional, and premium. No unnecessary animations or neon colors.
          </p>
          <div className="flex flex-col gap-24" style={{ marginTop: '40px' }}>
            <Input label="Notification Name" placeholder="e.g. Senior Frontend Roles" />
            <Input label="Target Keywords" placeholder="React, Node, TypeScript..." />

            <div className="flex gap-16">
              <Button>Create Rule</Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </div>
        </Card>

        <Card title="System Performance">
          <p style={{ color: 'rgba(17, 17, 17, 0.6)', fontSize: '15px' }}>
            Placeholder for system metrics and activity logs. Everything follows the
            strict 8px, 16px, 24px, 40px, 64px spacing system.
          </p>
        </Card>
      </MainLayout>

      <ProofFooter items={proofItems} />

      <style jsx global>{`
        .app-root {
          min-height: 100vh;
          padding-bottom: 100px;
        }
      `}</style>
    </div>
  );
}

export default App;
