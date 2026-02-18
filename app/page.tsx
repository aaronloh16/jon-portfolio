const profile = {
  name: "Jonathan Loh",
  pronouns: "He/Him",
  headline:
    "Mechanical Engineering @ McMaster University | Prev @ ArcelorMittal Dofasco Global R&D",
  location: "Hamilton, Ontario, Canada",
  email: "jonathanloh21@gmail.com",
  linkedin: "https://www.linkedin.com/in/jonathan-daniel-loh/",
  intro:
    "Mechanical engineering student focused on thermo-fluids, design, and CAD. Building practical systems that improve manufacturing quality and process reliability.",
  about:
    "Previously worked as a process engineer in ArcelorMittal Dofasco Global R&D, optimizing steel manufacturing and designing lab-scale air knives for galvanized steel wipe studies.",
  targetRole:
    "Currently preparing for full-time mechanical engineering roles aligned with design, manufacturing, and experimental R&D.",
};

const roadmap = [
  {
    phase: "Phase 1: Foundation (now)",
    items: [
      "Publish concise positioning statement for recruiters.",
      "Add 3 project stubs with metrics placeholders.",
      "Add resume link + contact CTA above the fold.",
    ],
  },
  {
    phase: "Phase 2: Proof (next)",
    items: [
      "Convert each project into a full case study (problem, constraints, process, results).",
      "Add diagrams/photos from CAD models and test setups.",
      "Quantify outcomes: cycle time, measurement accuracy, quality impact.",
    ],
  },
  {
    phase: "Phase 3: Job Search Enablement (later)",
    items: [
      "Tailor project ordering by role type (design vs. manufacturing vs. R&D).",
      "Add downloadable one-page resume + project brief PDF.",
      "Set up simple analytics for contact clicks and case study views.",
    ],
  },
];

const projects = [
  {
    title: "Air Knife Geometry for Galvanizing Wipe Studies",
    status: "Case study draft",
    summary:
      "Designed and 3D printed lab-scale air knives for hot-dip pilot testing at University of Toronto.",
    placeholder: "[Add quantified result: pressure profile improvement, flow stability, or defect reduction.]",
  },
  {
    title: "Disk Polishing + Laser Thickness Measurement Workflow",
    status: "Case study draft",
    summary:
      "Built a non-contact measurement setup and custom program to evaluate thickness and variability faster.",
    placeholder:
      "[Add quantified result: throughput increase, repeatability change, and surface damage reduction.]",
  },
  {
    title: "Project Placeholder #3",
    status: "Waiting for content",
    summary:
      "Reserve this slot for your strongest upcoming mechanical design or test automation project.",
    placeholder:
      "[Add project name, challenge, design process, and measurable outcome.]",
  },
];

const experience = [
  {
    title: "Research Assistant (Co-op)",
    org: "ArcelorMittal Dofasco",
    period: "May 2024 - Apr 2025",
    location: "Hamilton, ON (On-site)",
    bullets: [
      "Developed and tested new process designs for specialized technical teams with high independence.",
      "Designed CAD air knife variants for flow behavior experiments on a hot dip pilot.",
      "Created a custom process and program for faster non-contact thickness/variability measurement.",
    ],
  },
  {
    title: "Waterfront Director",
    org: "Camp Mini-Yo-We",
    period: "Jul 2022 - Aug 2022",
    location: "Seasonal",
    bullets: [
      "Led waterfront operations and safety procedures.",
      "Applied problem solving and first aid in dynamic environments.",
    ],
  },
  {
    title: "Landscaper",
    org: "The Better Way Property Maintenance",
    period: "May 2021 - Aug 2021",
    location: "Seasonal",
    bullets: [
      "Delivered landscaping work with client-facing communication.",
      "Built consistency under physical and schedule constraints.",
    ],
  },
];

const education = {
  school: "McMaster University",
  degree: "Bachelor of Mechanical Engineering (BE)",
  period: "2021 - 2026",
  certs: ["MATLAB Certified (MathWorks, issued May 2023)"],
  skills: [
    "Geometric Dimensioning & Tolerancing",
    "Computer-Aided Design (CAD)",
    "Creativity and Innovation",
  ],
};

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero card rise-in">
        <p className="eyebrow">
          {profile.name} · {profile.pronouns}
        </p>
        <h1>{profile.headline}</h1>
        <p className="lede">{profile.intro}</p>
        <p className="muted">{profile.about}</p>
        <div className="hero-meta">
          <span>{profile.location}</span>
          <span>{profile.targetRole}</span>
        </div>
        <div className="hero-actions">
          <a href={`mailto:${profile.email}`}>Email Jonathan</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

      <section className="card rise-in stagger-1">
        <h2>Portfolio Plan</h2>
        <div className="phase-grid">
          {roadmap.map((phase) => (
            <article key={phase.phase} className="phase">
              <h3>{phase.phase}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="card rise-in stagger-2">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project">
              <p className="chip">{project.status}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="placeholder">{project.placeholder}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card rise-in stagger-3">
        <h2>Experience</h2>
        <div className="timeline">
          {experience.map((role) => (
            <article key={role.title + role.org} className="role">
              <h3>{role.title}</h3>
              <p className="role-meta">
                {role.org} · {role.period} · {role.location}
              </p>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="card rise-in stagger-4">
        <h2>Education & Credentials</h2>
        <p>
          {education.school} · {education.degree} · {education.period}
        </p>
        <div className="split">
          <article>
            <h3>Certification</h3>
            <ul>
              {education.certs.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Core Skills</h3>
            <ul>
              {education.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
