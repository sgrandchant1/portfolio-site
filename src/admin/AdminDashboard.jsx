import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadData, saveData, generateId } from '../data/store';
import '../styles/admin.css';

const TABS = [
  { key: 'info', label: 'Resume Info' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'visibility', label: 'Visibility' },
];

export default function AdminDashboard() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState('info');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const persist = (updated) => {
    setData(updated);
    saveData(updated);
    setSaved(true);
  };

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(t);
  }, [saved]);

  const handleLogout = () => {
    const d = { ...data, admin: { ...data.admin, isLoggedIn: false } };
    saveData(d);
    navigate('/admin/login');
  };

  // --- Helpers for deep cloning data before mutation ---
  const cloneData = () => JSON.parse(JSON.stringify(data));

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/">View Public Site</Link>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-content">
        <nav className="admin-nav">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={tab === t.key ? 'active' : ''}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'info' && <ResumeInfoSection data={data} persist={persist} cloneData={cloneData} />}
        {tab === 'education' && <EducationSection data={data} persist={persist} cloneData={cloneData} />}
        {tab === 'experience' && <ExperienceSection data={data} persist={persist} cloneData={cloneData} />}
        {tab === 'skills' && <SkillsSection data={data} persist={persist} cloneData={cloneData} />}
        {tab === 'projects' && <ProjectsSection data={data} persist={persist} cloneData={cloneData} />}
        {tab === 'visibility' && <VisibilitySection data={data} persist={persist} cloneData={cloneData} />}
      </main>

      {saved && <div className="admin-save-msg">Changes saved</div>}
    </div>
  );
}

/* ============================================
   RESUME INFO SECTION
   ============================================ */
function ResumeInfoSection({ data, persist, cloneData }) {
  const update = (field, value) => {
    const d = cloneData();
    d.resume[field] = value;
    persist(d);
  };

  const r = data.resume;

  return (
    <div className="admin-section">
      <h2>Resume Info</h2>
      <div className="admin-field-row">
        <Field label="Full Name" value={r.name} onChange={(v) => update('name', v)} />
        <Field label="Title" value={r.title} onChange={(v) => update('title', v)} />
      </div>
      <div className="admin-field-row">
        <Field label="Email" value={r.email} onChange={(v) => update('email', v)} />
        <Field label="Phone" value={r.phone} onChange={(v) => update('phone', v)} />
      </div>
      <div className="admin-field-row">
        <Field label="Location" value={r.location} onChange={(v) => update('location', v)} />
        <Field label="LinkedIn URL" value={r.linkedin} onChange={(v) => update('linkedin', v)} />
      </div>
      <Field label="GitHub URL" value={r.github} onChange={(v) => update('github', v)} />
      <Field label="Summary" value={r.summary} onChange={(v) => update('summary', v)} textarea />
    </div>
  );
}

/* ============================================
   EDUCATION SECTION
   ============================================ */
function EducationSection({ data, persist, cloneData }) {
  const [editing, setEditing] = useState(null);

  const addItem = () => {
    const d = cloneData();
    const newItem = {
      id: generateId('edu'),
      school: '',
      degree: '',
      dates: '',
      gpa: '',
      coursework: '',
      visible: true,
    };
    d.resume.education.push(newItem);
    persist(d);
    setEditing(newItem.id);
  };

  const removeItem = (id) => {
    const d = cloneData();
    d.resume.education = d.resume.education.filter((e) => e.id !== id);
    persist(d);
    if (editing === id) setEditing(null);
  };

  const updateItem = (id, field, value) => {
    const d = cloneData();
    const item = d.resume.education.find((e) => e.id === id);
    if (item) { item[field] = value; persist(d); }
  };

  return (
    <div className="admin-section">
      <h2>Education</h2>
      {data.resume.education.map((edu) => (
        <div className="admin-item" key={edu.id}>
          <div className="admin-item-header">
            <h3>{edu.school || 'New Education Entry'}</h3>
            <div className="admin-item-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(editing === edu.id ? null : edu.id)}
              >
                {editing === edu.id ? 'Collapse' : 'Edit'}
              </button>
              <button className="btn btn-danger" onClick={() => removeItem(edu.id)}>Remove</button>
            </div>
          </div>
          {editing === edu.id && (
            <>
              <Field label="School" value={edu.school} onChange={(v) => updateItem(edu.id, 'school', v)} />
              <Field label="Degree" value={edu.degree} onChange={(v) => updateItem(edu.id, 'degree', v)} />
              <div className="admin-field-row">
                <Field label="Dates" value={edu.dates} onChange={(v) => updateItem(edu.id, 'dates', v)} />
                <Field label="GPA" value={edu.gpa} onChange={(v) => updateItem(edu.id, 'gpa', v)} />
              </div>
              <Field label="Coursework" value={edu.coursework} onChange={(v) => updateItem(edu.id, 'coursework', v)} textarea />
            </>
          )}
        </div>
      ))}
      <button className="btn btn-primary" onClick={addItem}>+ Add Education</button>
    </div>
  );
}

/* ============================================
   EXPERIENCE SECTION
   ============================================ */
function ExperienceSection({ data, persist, cloneData }) {
  const [editing, setEditing] = useState(null);

  const addItem = () => {
    const d = cloneData();
    const newItem = {
      id: generateId('exp'),
      company: '',
      role: '',
      dates: '',
      logo: '',
      bullets: [''],
      visible: true,
    };
    d.resume.experience.push(newItem);
    persist(d);
    setEditing(newItem.id);
  };

  const removeItem = (id) => {
    const d = cloneData();
    d.resume.experience = d.resume.experience.filter((e) => e.id !== id);
    persist(d);
    if (editing === id) setEditing(null);
  };

  const updateItem = (id, field, value) => {
    const d = cloneData();
    const item = d.resume.experience.find((e) => e.id === id);
    if (item) { item[field] = value; persist(d); }
  };

  const updateBullet = (id, idx, value) => {
    const d = cloneData();
    const item = d.resume.experience.find((e) => e.id === id);
    if (item) { item.bullets[idx] = value; persist(d); }
  };

  const addBullet = (id) => {
    const d = cloneData();
    const item = d.resume.experience.find((e) => e.id === id);
    if (item) { item.bullets.push(''); persist(d); }
  };

  const removeBullet = (id, idx) => {
    const d = cloneData();
    const item = d.resume.experience.find((e) => e.id === id);
    if (item) { item.bullets.splice(idx, 1); persist(d); }
  };

  return (
    <div className="admin-section">
      <h2>Experience</h2>
      {data.resume.experience.map((exp) => (
        <div className="admin-item" key={exp.id}>
          <div className="admin-item-header">
            <h3>{exp.company || 'New Experience Entry'}{exp.role ? ` - ${exp.role}` : ''}</h3>
            <div className="admin-item-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(editing === exp.id ? null : exp.id)}
              >
                {editing === exp.id ? 'Collapse' : 'Edit'}
              </button>
              <button className="btn btn-danger" onClick={() => removeItem(exp.id)}>Remove</button>
            </div>
          </div>
          {editing === exp.id && (
            <>
              <div className="admin-field-row">
                <Field label="Company" value={exp.company} onChange={(v) => updateItem(exp.id, 'company', v)} />
                <Field label="Role" value={exp.role} onChange={(v) => updateItem(exp.id, 'role', v)} />
              </div>
              <Field label="Dates" value={exp.dates} onChange={(v) => updateItem(exp.id, 'dates', v)} />
              <ImageField
                label="Company Logo URL"
                value={exp.logo || ''}
                onChange={(v) => updateItem(exp.id, 'logo', v)}
              />
              <div className="admin-bullets">
                <label style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
                  Bullet Points
                </label>
                {exp.bullets.map((bullet, idx) => (
                  <div className="admin-bullet-row" key={idx}>
                    <input
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, idx, e.target.value)}
                      placeholder={`Bullet ${idx + 1}`}
                    />
                    <button className="btn btn-danger" onClick={() => removeBullet(exp.id, idx)}>x</button>
                  </div>
                ))}
                <button className="btn btn-secondary" onClick={() => addBullet(exp.id)} style={{ marginTop: 'var(--space-xs)' }}>
                  + Add Bullet
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <button className="btn btn-primary" onClick={addItem}>+ Add Experience</button>
    </div>
  );
}

/* ============================================
   SKILLS SECTION
   ============================================ */
function SkillsSection({ data, persist, cloneData }) {
  const [newSkills, setNewSkills] = useState({ languages: '', frameworks: '', tools: '', concepts: '' });
  const categories = Object.keys(data.resume.skills);

  const addSkill = (cat) => {
    const value = newSkills[cat].trim();
    if (!value) return;
    const d = cloneData();
    if (!d.resume.skills[cat].includes(value)) {
      d.resume.skills[cat].push(value);
      persist(d);
    }
    setNewSkills({ ...newSkills, [cat]: '' });
  };

  const removeSkill = (cat, skill) => {
    const d = cloneData();
    d.resume.skills[cat] = d.resume.skills[cat].filter((s) => s !== skill);
    persist(d);
  };

  return (
    <div className="admin-section">
      <h2>Skills</h2>
      {categories.map((cat) => (
        <div className="admin-skills-category" key={cat}>
          <h3>{cat}</h3>
          <div className="admin-skills-list">
            {data.resume.skills[cat].map((skill) => (
              <span className="admin-skill-tag" key={skill}>
                {skill}
                <button onClick={() => removeSkill(cat, skill)} title="Remove">&times;</button>
              </span>
            ))}
          </div>
          <div className="admin-skill-add">
            <input
              value={newSkills[cat]}
              onChange={(e) => setNewSkills({ ...newSkills, [cat]: e.target.value })}
              placeholder={`Add ${cat.slice(0, -1)}...`}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(cat); } }}
            />
            <button className="btn btn-primary" onClick={() => addSkill(cat)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================
   PROJECTS SECTION
   ============================================ */
function ProjectsSection({ data, persist, cloneData }) {
  const [editing, setEditing] = useState(null);

  const addProject = () => {
    const d = cloneData();
    const newProj = {
      id: generateId('proj'),
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      techStack: [],
      features: [],
      liveUrl: '',
      repoUrl: '',
      image: '',
      screenshotPlaceholder: true,
      visible: true,
    };
    d.projects.push(newProj);
    persist(d);
    setEditing(newProj.id);
  };

  const removeProject = (id) => {
    const d = cloneData();
    d.projects = d.projects.filter((p) => p.id !== id);
    persist(d);
    if (editing === id) setEditing(null);
  };

  const updateProject = (id, field, value) => {
    const d = cloneData();
    const proj = d.projects.find((p) => p.id === id);
    if (proj) { proj[field] = value; persist(d); }
  };

  return (
    <div className="admin-section">
      <h2>Projects</h2>
      {data.projects.map((proj) => (
        <div className="admin-item" key={proj.id}>
          <div className="admin-item-header">
            <h3>{proj.title || 'New Project'}</h3>
            <div className="admin-item-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(editing === proj.id ? null : proj.id)}
              >
                {editing === proj.id ? 'Collapse' : 'Edit'}
              </button>
              <button className="btn btn-danger" onClick={() => removeProject(proj.id)}>Remove</button>
            </div>
          </div>
          {editing === proj.id && <ProjectEditor proj={proj} updateProject={updateProject} />}
        </div>
      ))}
      <button className="btn btn-primary" onClick={addProject}>+ Add Project</button>
    </div>
  );
}

function ProjectEditor({ proj, updateProject }) {
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const addTech = () => {
    const v = newTech.trim();
    if (!v) return;
    const updated = [...proj.techStack];
    if (!updated.includes(v)) updated.push(v);
    updateProject(proj.id, 'techStack', updated);
    setNewTech('');
  };

  const removeTech = (tech) => {
    updateProject(proj.id, 'techStack', proj.techStack.filter((t) => t !== tech));
  };

  const addFeature = () => {
    const v = newFeature.trim();
    if (!v) return;
    updateProject(proj.id, 'features', [...proj.features, v]);
    setNewFeature('');
  };

  const removeFeature = (idx) => {
    const updated = [...proj.features];
    updated.splice(idx, 1);
    updateProject(proj.id, 'features', updated);
  };

  const updateFeature = (idx, value) => {
    const updated = [...proj.features];
    updated[idx] = value;
    updateProject(proj.id, 'features', updated);
  };

  return (
    <>
      <div className="admin-field-row">
        <Field label="Title" value={proj.title} onChange={(v) => updateProject(proj.id, 'title', v)} />
        <Field label="Slug" value={proj.slug} onChange={(v) => updateProject(proj.id, 'slug', v)} />
      </div>
      <Field label="Short Description" value={proj.shortDescription} onChange={(v) => updateProject(proj.id, 'shortDescription', v)} textarea />
      <Field label="Full Description" value={proj.fullDescription} onChange={(v) => updateProject(proj.id, 'fullDescription', v)} textarea />
      <div className="admin-field-row">
        <Field label="Live URL" value={proj.liveUrl} onChange={(v) => updateProject(proj.id, 'liveUrl', v)} />
        <Field label="Repository URL" value={proj.repoUrl} onChange={(v) => updateProject(proj.id, 'repoUrl', v)} />
      </div>
      <ImageField
        label="Project Image URL"
        value={proj.image || ''}
        onChange={(v) => updateProject(proj.id, 'image', v)}
      />

      {/* Tech Stack */}
      <div className="admin-skills-category">
        <h3>Tech Stack</h3>
        <div className="admin-skills-list">
          {proj.techStack.map((tech) => (
            <span className="admin-skill-tag" key={tech}>
              {tech}
              <button onClick={() => removeTech(tech)}>&times;</button>
            </span>
          ))}
        </div>
        <div className="admin-skill-add">
          <input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add technology..."
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
          />
          <button className="btn btn-primary" onClick={addTech}>Add</button>
        </div>
      </div>

      {/* Features */}
      <div className="admin-bullets">
        <label style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: 'var(--space-xs)', display: 'block' }}>
          Features
        </label>
        {proj.features.map((feat, idx) => (
          <div className="admin-bullet-row" key={idx}>
            <input
              value={feat}
              onChange={(e) => updateFeature(idx, e.target.value)}
              placeholder={`Feature ${idx + 1}`}
            />
            <button className="btn btn-danger" onClick={() => removeFeature(idx)}>x</button>
          </div>
        ))}
        <div className="admin-skill-add" style={{ marginTop: 'var(--space-xs)' }}>
          <input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add feature..."
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
          />
          <button className="btn btn-secondary" onClick={addFeature}>+ Add Feature</button>
        </div>
      </div>
    </>
  );
}

/* ============================================
   VISIBILITY SECTION
   ============================================ */
function VisibilitySection({ data, persist, cloneData }) {
  const sections = data.resume.sections;

  const toggleSection = (key) => {
    const d = cloneData();
    d.resume.sections[key].visible = !d.resume.sections[key].visible;
    persist(d);
  };

  const toggleItem = (collection, id) => {
    const d = cloneData();
    const list = collection === 'projects' ? d.projects : d.resume[collection];
    const item = list.find((i) => i.id === id);
    if (item) { item.visible = !item.visible; persist(d); }
  };

  return (
    <div className="admin-section">
      <h2>Visibility Controls</h2>

      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 'var(--space-md) 0 var(--space-sm)' }}>Sections</h3>
      {Object.keys(sections).map((key) => (
        <div className="admin-toggle-row" key={key}>
          <span>{key}</span>
          <ToggleSwitch checked={sections[key].visible} onChange={() => toggleSection(key)} />
        </div>
      ))}

      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 'var(--space-lg) 0 var(--space-sm)' }}>Education Items</h3>
      {data.resume.education.map((edu) => (
        <div className="admin-toggle-row" key={edu.id}>
          <span>{edu.school || 'Untitled'}</span>
          <ToggleSwitch checked={edu.visible} onChange={() => toggleItem('education', edu.id)} />
        </div>
      ))}

      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 'var(--space-lg) 0 var(--space-sm)' }}>Experience Items</h3>
      {data.resume.experience.map((exp) => (
        <div className="admin-toggle-row" key={exp.id}>
          <span>{exp.company || 'Untitled'}{exp.role ? ` - ${exp.role}` : ''}</span>
          <ToggleSwitch checked={exp.visible} onChange={() => toggleItem('experience', exp.id)} />
        </div>
      ))}

      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 'var(--space-lg) 0 var(--space-sm)' }}>Projects</h3>
      {data.projects.map((proj) => (
        <div className="admin-toggle-row" key={proj.id}>
          <span>{proj.title || 'Untitled'}</span>
          <ToggleSwitch checked={proj.visible} onChange={() => toggleItem('projects', proj.id)} />
        </div>
      ))}
    </div>
  );
}

/* ============================================
   SHARED COMPONENTS
   ============================================ */
function Field({ label, value, onChange, textarea }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="admin-field">
      <label>{label}</label>
      <Tag value={value} onChange={(e) => onChange(e.target.value)} rows={textarea ? 3 : undefined} />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.png"
      />
      {value && (
        <div className="admin-image-preview">
          <img
            src={value}
            alt="Preview"
            onError={(e) => { e.target.style.display = 'none'; }}
            onLoad={(e) => { e.target.style.display = 'block'; }}
          />
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider" />
    </label>
  );
}
