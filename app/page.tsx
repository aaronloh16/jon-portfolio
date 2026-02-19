"use client";

import { useState } from "react";
import Image from "next/image";

/* ─── Data ─── */

const profile = {
  name: "Jonathan Loh",
  role: "Mechanical Engineering",
  school: "McMaster University · Graduating May 2026",
  bio: "Fifth-year mechanical engineering student at McMaster with a year of industry research experience at ArcelorMittal Dofasco Global R&D. Strong background in fluid mechanics, CAD design, and experimental methods.",
  detail:
    "Seeking full-time roles in design, manufacturing, energy, or R&D. Comfortable working independently on open-ended problems and presenting technical findings to cross-functional teams.",
  email: "jonathanloh21@gmail.com",
  phone: "(905) 320-9450",
  linkedin: "https://www.linkedin.com/in/jonathan-daniel-loh/",
  resumePath: "/Jonathans_Resume_VI.pdf",
};

const skillGroups = [
  {
    label: "CAD & Design",
    items: ["SolidWorks", "Autodesk Inventor", "GD&T", "Sheet Metal", "Surface Modeling", "3D Printing"],
  },
  {
    label: "Analysis & Programming",
    items: ["MATLAB", "Python", "VBA", "Data Analysis", "Power BI"],
  },
];

type GalleryCategory =
  | "all"
  | "wireframe"
  | "surface"
  | "sheetmetal";

const galleryItems: {
  src: string;
  label: string;
  category: GalleryCategory;
}[] = [
  { src: "/jon-project-images/assembly-flanged-pipe-model.png", label: "Flanged Pipe Valve Body", category: "all"  },
  { src: "/jon-project-images/parametric-bearing-block.png",   label: "Bearing Block",      category: "all"       },
  { src: "/jon-project-images/parametric-revolved-spindle.png",label: "Revolved Spindle",   category: "all"       },
  { src: "/jon-project-images/wireframe-crank-handle.png",     label: "Crank Handle",       category: "all"       },
  { src: "/jon-project-images/wireframe-ribbed-arch.png",      label: "Ribbed Arch",        category: "all"       },
  { src: "/jon-project-images/surface-complex-shell-part.png", label: "Complex Shell Part", category: "all"       },
  { src: "/jon-project-images/wireframe-helical-coil.png",     label: "Helical Coil",       category: "wireframe" },
  { src: "/jon-project-images/wireframe-twisted-helix.png",    label: "Twisted Helix",      category: "wireframe" },
  { src: "/jon-project-images/surface-extension-spring.png",   label: "Extension Spring",   category: "wireframe" },
  { src: "/jon-project-images/surface-wireframe-ornament.png", label: "Wireframe Ornament", category: "wireframe" },
  { src: "/jon-project-images/surface-freeform-body.png",      label: "Freeform Body",      category: "surface"   },
  { src: "/jon-project-images/surface-ergonomic-handle.png",   label: "Ergonomic Handle",   category: "surface"   },
  { src: "/jon-project-images/sheetmetal-bracket-shell.png",   label: "Bracket Shell",      category: "surface"   },
  { src: "/jon-project-images/sheetmetal-fan-housing.png",     label: "Fan Housing",        category: "sheetmetal"},
];

const galleryTabs: { key: GalleryCategory; label: string }[] = [
  { key: "all",        label: "All"             },
  { key: "wireframe",  label: "3D Sketch"       },
  { key: "surface",    label: "Surface Modeling"},
  { key: "sheetmetal", label: "Sheet Metal"     },
];

const assemblyGroups = [
  {
    title: "Bench Vice",
    model:           { src: "/jon-project-images/assembly-bench-vice-model.png",     label: "Assembly model"         },
    assemblyDrawing: { src: "/jon-project-images/assembly-bench-vice-drawing.png",   label: "Assembly drawing & BOM" },
    detailDrawings: [
      { src: "/jon-project-images/assembly-vice-body-drawing.png",      label: "Vice body" },
      { src: "/jon-project-images/assembly-vice-jaw-drawing.png",       label: "Vice jaw"  },
      { src: "/jon-project-images/assembly-vice-leadscrew-drawing.png", label: "Lead screw"},
    ],
  },
  {
    title: "Radial Engine",
    model:           { src: "/jon-project-images/assembly-radial-engine-model.png",   label: "5-cylinder assembly"    },
    assemblyDrawing: { src: "/jon-project-images/assembly-radial-engine-drawing.png", label: "Drawing & parts list"   },
    detailDrawings: [],
  },
  {
    title: "Flanged Pipe Valve Body",
    model:           { src: "/jon-project-images/assembly-flanged-pipe-model.png",   label: "3-way valve body"    },
    assemblyDrawing: { src: "/jon-project-images/assembly-flanged-pipe-drawing.png", label: "Engineering drawing" },
    detailDrawings: [],
  },
];

const experience = [
  {
    title: "Research & Development Intern",
    org: "ArcelorMittal Dofasco — Global R&D",
    period: "May 2024 – Apr 2025",
    location: "Hamilton, ON",
    bullets: [
      "Analyzed aerodynamic impacts of air-knife design parameters using experimental data and fluid-mechanics principles; participated in technical design reviews improving manufacturability and performance.",
      "Translated CAD concepts into functional air-knife prototypes tested on a new hot-dip pilot at the University of Toronto, iterating through design–build–test cycles.",
      "Improved Stribeck testing by collaborating with other teams to use a custom 3D-printed attachment on a laser thickness gauge for contactless polished-disk uniformity measurement, reducing waste and increasing accuracy.",
      "Built Python and MATLAB tools to automatically process test data, automate calculations, and visualize trends for senior engineers.",
      "Developed and validated XRF calibration standards for Al/Si-coated samples; used VBA to generate topographical surface graphs for standard selection.",
      "Synthesized tribological test results into technical reports used by engineers globally for project planning.",
    ],
  },
  {
    title: "Waterfront Director",
    org: "Camp Mini-Yo-We",
    period: "Summer 2022",
    location: "Seasonal",
    bullets: [
      "Managed waterfront operations and enforced safety protocols for 200+ campers.",
      "Coordinated and trained a team of junior staff.",
    ],
  },
];

const education = {
  school: "McMaster University",
  degree: "Bachelor of Engineering, Mechanical",
  period: "Sept 2021 – May 2026",
  gpa: "",
  certs: ["MATLAB Certified — MathWorks, May 2023"],
  coursework: [
    "Fluid Mechanics & Heat Transfer",
    "Mechanics of Machines",
    "Manufacturing Processes",
    "Engineering Design",
    "Control Systems",
    "Technical Communication",
  ],
};

/* ─── Component ─── */

export default function Home() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeTab);

  return (
    <>
      {/* ── Nav ── */}
      <nav className="site-nav">
        <div className="nav-inner">
          <span className="nav-logo">Jonathan Loh</span>
          <ul className="nav-links">
            <li><a href="#capstone">Capstone</a></li>
            <li><a href="#dofasco">Dofasco</a></li>
            <li><a href="#cad">CAD Work</a></li>
            <li><a href="#assemblies">Assemblies</a></li>
            <li><a href="#experience">Experience</a></li>
          </ul>
          <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn nav-cta">
            Resume
          </a>
        </div>
      </nav>

      <main className="site-shell">

        {/* ── Hero ── */}
        <section className="hero">
          <p className="hero-role">Mechanical Engineering · McMaster University</p>
          <h1>
            Building systems<br />that work in practice.
          </h1>
          <p className="hero-bio">{profile.bio}</p>
          <p className="hero-detail">{profile.detail}</p>
          <div className="hero-actions">
            <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn btn-primary">
              Download Resume
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary">
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              LinkedIn
            </a>
          </div>
          <hr className="hero-divider" />
        </section>

        {/* ── Capstone ── */}
        <section className="section" id="capstone">
          <div className="section-header">
            <span className="section-label">Capstone</span>
          </div>
          <h2 className="section-title">Laminar Flow Device</h2>
          <p className="section-desc">
            Designing a compact flow conditioner to achieve coherence in a high-speed jet — combining
            hydraulic flip through flow conditioning and a sharp orifice nozzle. Applies core
            fluid-mechanics principles to model velocity and pressure gradients, validated through
            controlled experiments. This is the second working prototype, integrating custom-designed
            and off-the-shelf components while staying under budget.
          </p>
          <div className="capstone-layout">
            <div
              className="capstone-main"
              onClick={() => setLightbox("/jon-project-images/capstone-prototype-side-view.png")}
            >
              <Image
                src="/jon-project-images/capstone-prototype-side-view.png"
                alt="Capstone prototype — second iteration"
                width={1200}
                height={480}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div
              className="capstone-sub"
              onClick={() => setLightbox("/jon-project-images/capstone-exploded-assembly.png")}
            >
              <Image
                src="/jon-project-images/capstone-exploded-assembly.png"
                alt="Exploded assembly view"
                width={600}
                height={400}
                style={{ objectFit: "contain", background: "#fafafa" }}
              />
              <div className="capstone-sub-label">Exploded assembly</div>
            </div>
            <div
              className="capstone-sub"
              onClick={() => setLightbox("/jon-project-images/capstone-parts-list.png")}
            >
              <Image
                src="/jon-project-images/capstone-parts-list.png"
                alt="Parts list"
                width={600}
                height={400}
                style={{ objectFit: "contain", background: "#fafafa" }}
              />
              <div className="capstone-sub-label">Parts list</div>
            </div>
          </div>
        </section>

        {/* ── Dofasco Work ── */}
        <section className="section" id="dofasco">
          <div className="section-header">
            <span className="section-label">Industry Work</span>
          </div>
          <h2 className="section-title">ArcelorMittal Dofasco — Global R&amp;D</h2>
          <p className="section-desc">
            One-year co-op in the Global R&amp;D group, working on two distinct engineering problems:
            air knife design for galvanized steel wipe studies, and a custom measurement process
            for polished disk uniformity.
          </p>
          <div className="dofasco-grid">
            <div className="dofasco-card">
              <div
                className="dofasco-img"
                onClick={() => setLightbox("/jon-project-images/dofasco-air-knife-prototype.png")}
              >
                <Image
                  src="/jon-project-images/dofasco-air-knife-prototype.png"
                  alt="3D-printed air knife prototype"
                  width={600}
                  height={480}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="dofasco-body">
                <p className="dofasco-title">Air Knife Design &amp; Prototyping</p>
                <p className="dofasco-desc">
                  Analyzed aerodynamic impacts of air knife geometry using experimental data and
                  fluid-mechanics principles. Translated CAD concepts into 3D-printed functional
                  prototypes that were tested on a new hot-dip pilot at the University of Toronto,
                  iterating through design–build–test cycles to improve zinc wipe uniformity and
                  performance. Participated in technical design reviews with senior engineers.
                </p>
              </div>
            </div>
            <div className="dofasco-card">
              <div
                className="dofasco-img"
                onClick={() => setLightbox("/jon-project-images/dofasco-disk-thickness-gauge.png")}
              >
                <Image
                  src="/jon-project-images/dofasco-disk-thickness-gauge.png"
                  alt="Keyence laser gauge on Stribeck test rig"
                  width={600}
                  height={480}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="dofasco-body">
                <p className="dofasco-title">Contactless Disk Thickness Measurement</p>
                <p className="dofasco-desc">
                  Improved Stribeck test efficiency by designing a custom 3D-printed attachment that
                  mounts a Keyence laser displacement gauge directly on the test rig for contactless
                  polished-disk uniformity measurement. Eliminated surface damage from prior contact
                  methods and reduced waste. Built Python and MATLAB tools to automatically process
                  gauge data, automate calculations, and visualize thickness trends for future
                  process improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAD Gallery ── */}
        <section className="section" id="cad">
          <div className="section-header">
            <span className="section-label">CAD Work</span>
          </div>
          <h2 className="section-title">Part Modeling</h2>
          <p className="section-desc">
            Parts created in Autodesk Inventor covering parametric modeling, 3D sketch and wireframe
            techniques, surface modeling with complex curves, and sheet metal design. Click any image
            to enlarge.
          </p>
          <div className="gallery-tabs">
            {galleryTabs.map((tab) => (
              <button
                key={tab.key}
                className={`gallery-tab${activeTab === tab.key ? " active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filtered.map((item) => (
              <div
                key={item.src}
                className="gallery-item"
                onClick={() => setLightbox(item.src)}
              >
                <div className="gallery-img-wrap">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="gallery-item-label">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Assemblies & Drawings ── */}
        <section className="section" id="assemblies">
          <div className="section-header">
            <span className="section-label">Assemblies & Drawings</span>
          </div>
          <h2 className="section-title">Assembly Projects</h2>
          <p className="section-desc">
            Full assemblies with complete drawing packages — orthographic views, bills of materials,
            and part detail drawings per ANSI/ASME standards.
          </p>
          {assemblyGroups.map((group) => (
            <div key={group.title} className="assembly-group">
              <h3 className="assembly-group-name">{group.title}</h3>
              <div className="assembly-pair">
                <div
                  className="assembly-card"
                  onClick={() => setLightbox(group.model.src)}
                >
                  <Image
                    src={group.model.src}
                    alt={group.model.label}
                    width={560}
                    height={420}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="assembly-card-label">{group.model.label}</div>
                </div>
                <div
                  className="assembly-card"
                  onClick={() => setLightbox(group.assemblyDrawing.src)}
                >
                  <Image
                    src={group.assemblyDrawing.src}
                    alt={group.assemblyDrawing.label}
                    width={560}
                    height={420}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="assembly-card-label">{group.assemblyDrawing.label}</div>
                </div>
              </div>
              {group.detailDrawings.length > 0 && (
                <div className="assembly-drawings">
                  {group.detailDrawings.map((d) => (
                    <div
                      key={d.src}
                      className="assembly-card"
                      onClick={() => setLightbox(d.src)}
                    >
                      <Image
                        src={d.src}
                        alt={d.label}
                        width={380}
                        height={290}
                        style={{ objectFit: "contain" }}
                      />
                      <div className="assembly-card-label">{d.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* ── Course Project ── */}
        <section className="section" id="project">
          <div className="section-header">
            <span className="section-label">Academic Project</span>
          </div>
          <h2 className="section-title">Truth-Finding Tool</h2>
          <div className="project-card">
            <p className="project-card-title">Sentence Similarity &amp; PDF Fact Highlighting</p>
            <p className="project-card-desc">
              Built a Python-based fact-checking system using Sentence-BERT to perform semantic
              similarity analysis between document statements and reference texts. Implemented a PDF
              highlighting feature that categorizes sentences as True, Uncertain, or False based on
              cosine similarity thresholds. Fine-tuned the model on the FEVER dataset, improving
              accuracy for real-world fact-checking applications.
            </p>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">Sentence-BERT</span>
              <span className="tag">PyTorch</span>
              <span className="tag">FEVER Dataset</span>
              <span className="tag">PyMuPDF</span>
              <span className="tag">Google Colab</span>
            </div>
            <a
              href="/lohj1_Course_Project.ipynb"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              View Notebook
            </a>
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="section" id="experience">
          <div className="section-header">
            <span className="section-label">Experience</span>
          </div>
          <h2 className="section-title">ArcelorMittal Dofasco</h2>
          <p className="section-desc">
            One year as a Research Assistant in Global R&D, working across fluid mechanics experiments,
            process improvement, and data analysis tooling.
          </p>
          <div className="timeline">
            {experience.map((role) => (
              <div key={role.title + role.org} className="timeline-item">
                <div className="timeline-period">
                  {role.period}
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{role.location}</span>
                </div>
                <div className="timeline-content">
                  <p className="tl-title">{role.title}</p>
                  <p className="tl-org">{role.org}</p>
                  <ul>
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education & Skills ── */}
        <section className="section" id="education">
          <div className="section-header">
            <span className="section-label">Education</span>
          </div>
          <h2 className="section-title">{education.school}</h2>
          <p className="section-desc">
            {education.degree} · {education.period}
          </p>
          <div className="info-grid">
            <div className="info-card">
              <p className="info-card-title">Relevant Coursework</p>
              <ul>
                {education.coursework.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            {skillGroups.map((g) => (
              <div key={g.label} className="info-card">
                <p className="info-card-title">{g.label}</p>
                <ul>
                  {g.items.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <span className="footer-left">&copy; {new Date().getFullYear()} Jonathan Loh</span>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={`tel:${profile.phone.replace(/\D/g, "")}`}>Phone</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.resumePath} target="_blank" rel="noreferrer">Resume PDF</a>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <Image
            src={lightbox}
            alt="Enlarged view"
            width={1400}
            height={900}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
}
