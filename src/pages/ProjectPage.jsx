import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadData } from '../data/store';
import '../styles/project.css';

export default function ProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const data = loadData();
  const project = data.projects.find(
    (p) => p.slug === slug && p.visible
  );

  if (!project) {
    return (
      <section className="project-not-found">
        <h1>404</h1>
        <p>Project not found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </section>
    );
  }

  const hasLinks = project.liveUrl || project.repoUrl;
  const hasTech = project.techStack && project.techStack.length > 0;

  return (
    <article className="project-page">
      {/* Back link */}
      <Link to="/" className="project-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Two-column layout */}
      <div className="project-layout">
        {/* Left column — visuals, tech stack, links (all fixed) */}
        <div className="project-visuals">
          {/* Screenshot */}
          {project.image ? (
            <div className="project-screenshot project-screenshot--has-image">
              <img src={project.image} alt={project.title} />
            </div>
          ) : (
            <div className="project-screenshot">
              <svg className="project-screenshot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="project-screenshot-label">Screenshot Coming Soon</span>
            </div>
          )}

          {/* Demo Video */}
          {project.demoVideo && (
            <div className="project-demo-video">
              <h2>Live Demo</h2>
              <video controls playsInline preload="metadata">
                <source src={project.demoVideo} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Combined tech stack + links card */}
          {(hasTech || hasLinks) && (
            <div className="project-info-card">
              {hasTech && (
                <div className="project-info-section">
                  <h3>Tech Stack</h3>
                  <div className="project-tech-list">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {hasLinks && (
                <div className="project-info-section">
                  <h3>Links</h3>
                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-primary"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <path d="M15 3h6v6" />
                          <path d="M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-secondary"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                        </svg>
                        View Source
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column — scrollable text content */}
        <div className="project-text">
          {/* Header */}
          <header className="project-header">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-subtitle">{project.shortDescription}</p>
          </header>

          {/* Full description */}
          <section className="project-description-section">
            <h2>About This Project</h2>
            <p className="project-description">{project.fullDescription}</p>
          </section>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section className="project-features">
              <h2>Key Features</h2>
              <ul>
                {project.features.map((feature, i) => (
                  <li key={i}>
                    <svg className="feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
