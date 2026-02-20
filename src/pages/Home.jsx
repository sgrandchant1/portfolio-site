import { Link } from 'react-router-dom';
import { loadData } from '../data/store';
import ParticleBackground from '../components/ParticleBackground';
import JourneyTimeline from '../components/JourneyTimeline';
import '../styles/home.css';

export default function Home() {
  const data = loadData();
  const { resume, projects } = data;
  const visibleProjects = (projects || []).filter((p) => p.visible);
  const visibleExperience = (resume.experience || []).filter((e) => e.visible);

  return (
    <section className="home-page">
      {/* Personal info — left side */}
      <div className="home-info">
        <ParticleBackground />
        <div className="home-info-inner">
          <div className="hero-photo-wrapper">
            <img
              src="/profile.jpg"
              alt={resume.name}
              className="hero-photo"
            />
          </div>
          <h1 className="hero-name">{resume.name}</h1>
          <p className="hero-title">
            <span className="accent-primary">{resume.title}</span>
          </p>
          <p className="hero-summary">{resume.summary}</p>

          <div className="hero-contact">
            {resume.location && (
              <span className="hero-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {resume.location}
              </span>
            )}
            {resume.email && (
              <a href={`mailto:${resume.email}`} className="hero-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                {resume.email}
              </a>
            )}
          </div>

          <div className="hero-socials">
            {resume.github && (
              <a href={resume.github} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
            )}
            {resume.linkedin && (
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Timeline — first 2 items right, then alternating */}
      <JourneyTimeline
        experience={visibleExperience}
        projects={visibleProjects}
        forceRightCount={2}
      />
    </section>
  );
}
