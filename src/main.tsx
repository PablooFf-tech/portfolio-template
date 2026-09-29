import React from 'react';
import ReactDOM from 'react-dom/client';
import { sileo, Toaster } from 'sileo';
import 'sileo/styles.css';
import FloatingContactCards from '../components/ui/floating-contact-cards';
import { WorkExperienceTimeline, EducationTimeline } from '../components/ui/portfolio-timelines';
import { LetsWorkTogether } from '../components/ui/lets-work-section';
import { CompetenciesCards } from '../components/ui/competencies-cards';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Expose sileo globally for vanilla JS scripts
(window as any).sileo = sileo;

// Global Sileo Toaster syncing with active website theme
function GlobalToaster() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('light');

  React.useEffect(() => {
    const syncTheme = () => {
      const siteTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(siteTheme === 'light' ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return <Toaster position="top-center" theme={theme} options={{ duration: 1800 }} />;
}

const toasterRoot = document.getElementById('react-toaster-root');
if (toasterRoot) {
  ReactDOM.createRoot(toasterRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <GlobalToaster />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Floating Contact Cards
const contactRoot = document.getElementById('react-contact-cards-root');
if (contactRoot) {
  ReactDOM.createRoot(contactRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <FloatingContactCards />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Work Experience Timeline
const workRoot = document.getElementById('react-work-timeline-root');
if (workRoot) {
  ReactDOM.createRoot(workRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <WorkExperienceTimeline />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Education Timeline
const eduRoot = document.getElementById('react-education-timeline-root');
if (eduRoot) {
  ReactDOM.createRoot(eduRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <EducationTimeline />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Let's Work Together Contact Section
const letsWorkRoot = document.getElementById('react-lets-work-root');
if (letsWorkRoot) {
  ReactDOM.createRoot(letsWorkRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <LetsWorkTogether />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

// Competencies Cards Section (Sobre mí)
const compRoot = document.getElementById('react-competencies-root');
if (compRoot) {
  ReactDOM.createRoot(compRoot).render(
    <React.StrictMode>
      <ErrorBoundary>
        <CompetenciesCards />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
