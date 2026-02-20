import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadData } from '../data/store';
import '../styles/resume.css';

function ExpItem({ exp }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = exp.bullets && exp.bullets.length > 2;
  const visibleBullets = expanded ? exp.bullets : (exp.bullets || []).slice(0, 2);

  return (
    <div className="resume-exp-item">
      <div className="resume-exp-top">
        <div>
          <span className="resume-exp-role">{exp.role}</span>
          <span className="resume-exp-company">
            {exp.company}{exp.location ? ` · ${exp.location}` : ''}
          </span>
        </div>
        <span className="resume-exp-dates">{exp.dates}</span>
      </div>
      {visibleBullets.length > 0 && (
        <ul className="resume-exp-bullets">
          {visibleBullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {hasMore && (
        <button className="resume-exp-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'See all details'}
        </button>
      )}
    </div>
  );
}

export default function Resume() {
  const data = loadData();
  const resume = data.resume || {};
  const projects = data.projects || [];
  const sections = resume.sections || {};

  const visibleEducation = (resume.education || []).filter((e) => e.visible);
  const visibleExperience = (resume.experience || []).filter((e) => e.visible);
  const visibleProjects = (projects || []).filter((p) => p.visible);

  const skillCategories = resume.skills
    ? Object.entries(resume.skills).map(([key, items]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        items,
      }))
    : [];

  return (
    <div className="resume-page">
      {/* Header */}
      <header className="resume-header">
        <h1 className="resume-name">{resume.name}</h1>
        <p className="resume-title">{resume.title}</p>

        <div className="resume-contact">
          {resume.email && (
            <a href={`mailto:${resume.email}`} className="resume-contact-item">
              {resume.email}
            </a>
          )}
          <a href="mailto:santiagodegrandchant1@gmail.com" className="resume-contact-item">
            santiagodegrandchant1@gmail.com
          </a>
        </div>

        {resume.summary && (
          <p className="resume-summary">{resume.summary}</p>
        )}

        <a href="/resume.pdf" download className="btn btn-primary resume-download">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Full Resume
        </a>
      </header>

      {/* Education */}
      {sections.education?.visible !== false && visibleEducation.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-heading">Education</h2>
          {visibleEducation.map((edu) => (
            <div key={edu.id} className="resume-edu-item">
              <div className="resume-edu-top">
                <div>
                  <span className="resume-edu-school">{edu.school}</span>
                  <p className="resume-edu-degree">{edu.degree}</p>
                </div>
                <span className="resume-edu-dates">{edu.dates}</span>
              </div>
              {edu.concentrations && (
                <p className="resume-edu-detail">{edu.concentrations}</p>
              )}
              {edu.gpa && (
                <p className="resume-edu-detail">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {sections.experience?.visible !== false && visibleExperience.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-heading">Experience</h2>
          {visibleExperience.map((exp) => (
            <ExpItem key={exp.id} exp={exp} />
          ))}
        </section>
      )}

      {/* Projects */}
      {visibleProjects.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-heading">Projects</h2>
          {visibleProjects.map((proj) => (
            <div key={proj.id} className="resume-proj-item">
              <div className="resume-proj-top">
                <span className="resume-proj-title">{proj.title}</span>
                {proj.dates && <span className="resume-proj-dates">{proj.dates}</span>}
              </div>
              <p className="resume-proj-desc">{proj.shortDescription}</p>
              {proj.techStack && (
                <div className="resume-proj-tech">
                  {proj.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
              {proj.slug && (
                <Link to={`/projects/${proj.slug}`} className="resume-proj-link">
                  View full project &rarr;
                </Link>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {sections.skills?.visible !== false && skillCategories.length > 0 && (
        <section className="resume-section">
          <h2 className="resume-section-heading">Skills</h2>
          <div className="resume-skills-grid">
            {skillCategories.map((cat) => (
              <div key={cat.key} className="resume-skill-group">
                <h3 className="resume-skill-category">{cat.label}</h3>
                <div className="resume-skill-tags">
                  {cat.items.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
