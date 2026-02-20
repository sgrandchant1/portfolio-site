import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function JourneyTimeline({ experience = [], projects = [], hideLegend = false, forceRightCount = 2 }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [modalItem, setModalItem] = useState(null);
  const [visibleIds, setVisibleIds] = useState(new Set());

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  // Close on Escape
  useEffect(() => {
    if (!modalItem) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalItem]);

  // Merge projects + experience, then sort newest-first
  const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  const extractSortKey = (d) => {
    if (!d) return 0;
    const ym = d.match(/(\d{4})/);
    const year = ym ? parseInt(ym[1], 10) : 0;
    const mm = d.toLowerCase().match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/);
    const month = mm ? MONTHS[mm[1]] : 13; // no month = treat as latest in that year
    return year * 100 + month;
  };

  const items = [
    ...projects.map((proj) => ({
      type: 'project',
      id: proj.id,
      title: proj.title,
      subtitle: null,
      date: proj.dates || null,
      bullets: null,
      techStack: proj.techStack,
      slug: proj.slug,
      role: proj.role || null,
      description: proj.shortDescription,
      fullDescription: proj.fullDescription || null,
      features: proj.features || null,
      liveUrl: proj.liveUrl || null,
      repoUrl: proj.repoUrl || null,
      image: proj.image || null,
    })),
    ...experience.map((exp) => ({
      type: 'work',
      id: exp.id,
      title: exp.role,
      subtitle: exp.location ? `${exp.company} · ${exp.location}` : exp.company,
      date: exp.dates,
      bullets: exp.bullets || [],
      techStack: null,
      slug: null,
      description: null,
      fullDescription: null,
      features: null,
      liveUrl: null,
      repoUrl: null,
      image: exp.logo || null,
    })),
  ].sort((a, b) => extractSortKey(b.date) - extractSortKey(a.date));

  // Scroll-reveal — track in React state so re-renders don't lose visibility
  useEffect(() => {
    const nodes = ref.current?.querySelectorAll('.jt-item');
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newIds = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            newIds.push(entry.target.dataset.id);
            observer.unobserve(entry.target);
          }
        });
        if (newIds.length > 0) {
          setVisibleIds((prev) => {
            const next = new Set(prev);
            newIds.forEach((id) => next.add(id));
            return next;
          });
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <>
      {!hideLegend && (
        <div className="jt-legend">
          <span className="jt-legend-item">
            <span className="jt-legend-dot jt-legend-dot--work" />
            Work Experience
          </span>
          <span className="jt-legend-item">
            <span className="jt-legend-dot jt-legend-dot--project" />
            Projects
          </span>
        </div>
      )}

      <div className="jtimeline" ref={ref}>
        {items.map((item, i) => {
          const side = i < forceRightCount
            ? 'jt-right'
            : ((i - forceRightCount) % 2 === 0 ? 'jt-left' : 'jt-right');

          return (
            <div
              key={item.id}
              data-id={item.id}
              className={`jt-item ${side} jt-${item.type}${visibleIds.has(item.id) ? ' jt-visible' : ''}`}
            >
              <div className="jt-dot" />
              <div className="jt-connector" />
              <div className="jt-card" onClick={() => item.slug ? navigate(`/projects/${item.slug}`) : openModal(item)}>
                <div className="jt-card-top">
                  <div className="jt-card-body">
                    <span className={`jt-badge jt-badge-${item.type}`}>
                      {item.type === 'work' ? 'Work' : 'Project'}
                    </span>
                    {item.date && <span className="jt-date">{item.date}</span>}
                    <h3 className="jt-title">{item.title}</h3>
                    {item.role && <p className="jt-role">{item.role}</p>}
                    {item.subtitle && <p className="jt-subtitle">{item.subtitle}</p>}
                  </div>
                  <div className="jt-card-image">
                    {item.image
                      ? <img src={item.image} alt={item.title} />
                      : <div className="jt-card-image-placeholder" />
                    }
                  </div>
                </div>
                {item.description && <p className="jt-desc">{item.description}</p>}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="jt-bullets">
                    {item.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
                {item.techStack && (
                  <div className="jt-tech">
                    {item.techStack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
                <span className="jt-expand-hint">{item.slug ? 'Click to view project' : 'Click for details'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- MODAL POPUP ---- */}
      {modalItem && (
        <div className="jt-modal-backdrop" onClick={closeModal}>
          <div className={`jt-modal jt-modal--${modalItem.type}`} onClick={(e) => e.stopPropagation()}>
            <button className="jt-modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>

            {modalItem.image && (
              <div className="jt-modal-image">
                <img src={modalItem.image} alt={modalItem.title} />
              </div>
            )}

            <div className="jt-modal-body">
              <span className={`jt-badge jt-badge-${modalItem.type}`}>
                {modalItem.type === 'work' ? 'Work Experience' : 'Project'}
              </span>
              {modalItem.date && <span className="jt-modal-date">{modalItem.date}</span>}
              <h2 className="jt-modal-title">{modalItem.title}</h2>
              {modalItem.subtitle && <p className="jt-modal-subtitle">{modalItem.subtitle}</p>}

              {modalItem.description && <p className="jt-modal-desc">{modalItem.description}</p>}

              {modalItem.fullDescription && (
                <div className="jt-modal-section">
                  <h4>About</h4>
                  <p>{modalItem.fullDescription}</p>
                </div>
              )}

              {modalItem.bullets && modalItem.bullets.length > 0 && (
                <div className="jt-modal-section">
                  <h4>Key Contributions</h4>
                  <ul className="jt-modal-bullets">
                    {modalItem.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {modalItem.features && modalItem.features.length > 0 && (
                <div className="jt-modal-section">
                  <h4>Key Features</h4>
                  <ul className="jt-modal-features">
                    {modalItem.features.map((f, fi) => (
                      <li key={fi}>
                        <span className="jt-feature-check">&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalItem.techStack && (
                <div className="jt-modal-section">
                  <h4>Tech Stack</h4>
                  <div className="jt-modal-tech">
                    {modalItem.techStack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {(modalItem.liveUrl || modalItem.repoUrl) && (
                <div className="jt-modal-actions">
                  {modalItem.liveUrl && (
                    <a href={modalItem.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Live Demo
                    </a>
                  )}
                  {modalItem.repoUrl && (
                    <a href={modalItem.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      View Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
