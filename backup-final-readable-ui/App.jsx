import React, { useEffect, useMemo, useRef, useState } from "react";
import { profile, projects, skills } from "./data.js";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = [...node.querySelectorAll("[data-reveal]")];

    items.forEach((item, index) => {
      item.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 80, 320)}ms`
      );
    });

    const revealNow = (item) => {
      item.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    // Fallback: reveal anything already in the viewport immediately.
    requestAnimationFrame(() => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          revealNow(item);
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}

function VideoFrame({ src, title, index }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="video-frame" aria-label={`${title} demo preview`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <small>project-demo-{String(index).padStart(2, "0")}</small>
      </div>

      {src && !failed ? (
        <video
          className={loaded ? "project-video is-loaded" : "project-video"}
          src={src}
          autoPlay
          muted
          loop
          playsInline controls preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="video-placeholder">
          <div className="play-mark"></div>
          <strong>Demo video ready</strong>
          <span>Add the recorded MP4 to <code>public/videos</code>.</span>
        </div>
      )}

      <div className="video-caption">
        <span>Live product preview</span>
        <span className="video-status"></span>
      </div>
    </div>
  );
}

function App() {
  const pageRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    []
  );

  return (
    <div ref={pageRef} className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="Home">
            <span className="brand-mark">YM</span>
            <span>Yashwanth.</span>
          </a>

          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a className="nav-action" href={profile.resume}>
              View Resume
            </a>
            <a className="nav-action subtle" href={profile.resume} download>
              Download
            </a>
            <button
              className="theme-button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? "" : ""}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow">PYTHON FULL STACK DEVELOPER</div>
              <h1>
                Building
                <span className="hero-accent"> practical </span>
                software for real-world workflows.
              </h1>
              <p className="hero-text">
                {profile.portfolioLine}
              </p>
              
              <div className="button-row">
                <a className="button primary" href="#projects">View Projects</a>
                <a className="button" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="button" href={profile.resume} download>Resume</a>
              </div>
            </div>

            <div className="hero-card" data-reveal>
              <div className="hero-card-top">
                <span>PROFILE 01</span>
                <span>{profile.location}</span>
              </div>
              <div className="hero-card-body">
                <div className="profile-photo-wrap"><img className="profile-photo" src="/yashs.png" alt="Yashwanth Madipeddi" /></div>
                <div>
                  <strong>{profile.name}</strong>
                  <p>Python  Django  React  PostgreSQL</p>
                </div>
              </div>
              <div className="hero-card-grid">
                <div>
                  <small>Focus</small>
                  <strong>Full Stack</strong>
                </div>
                <div>
                  <small>Approach</small>
                  <strong>Product-minded</strong>
                </div>
                <div>
                  <small>Base</small>
                  <strong>Hyderabad</strong>
                </div>
                <div>
                  <small>Status</small>
                  <strong className="available"><span /> Open to roles</strong>
                </div>
              </div>
            </div>
          </div></section>

        <section id="about" className="section ruled">
          <div className="container split-section">
            <div data-reveal>
              <div className="eyebrow">ABOUT</div>
              <h2>Engineer first. Product minded.</h2>
            </div>
            <div className="body-copy" data-reveal>
              <p>
                I enjoy turning business requirements into complete web products:
                useful interfaces, clear APIs, structured data, and deployment workflows
                that hold together from development to production.
              </p>
              <p>
                My current focus is Python full-stack development with Django and React,
                backed by PostgreSQL and practical cloud deployment. I also keep building
                my Python Full Stack foundations alongside product development.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
  <div className="container">
    <div className="section-heading skills-heading">
      <div>
        <div className="eyebrow">TECHNICAL SKILLS</div>
        <h2>Core toolkit</h2>
      </div>
      <p>
        The technologies I use most consistently across my full-stack projects.
      </p>
    </div>

    <div className="skills-grid">
      {skills.map((group, index) => (
        <article
          className="skill-card skill-card-visible"
          key={group.title}
          style={{ "--skill-delay": `${index * 80}ms` }}
        >
          <span className="skill-index">
            {group.title.charAt(0)}
          </span>

          <h3>{group.title}</h3>

          <div className="tag-list">
            {group.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

<section id="projects" className="section ruled">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">SELECTED WORK</div>
                <h2>Projects that show how I build.</h2>
              </div>
              <p>
                Each project is presented as a product story, not just a list of technologies.
              </p>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article
                  className={`project-showcase ${index % 2 ? "reverse" : ""}`}
                  data-reveal
                  key={project.title}
                >
                  <VideoFrame src={project.video} title={project.title} index={index + 1} />
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>{project.number} / 05</span>
                      <span>{project.featured ? "Featured project" : "Additional project"}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <div className="project-subtitle">{project.subtitle}</div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <div className="button-row">
                      {project.live ? (
                        <a className="button primary" href={project.live} target="_blank" rel="noreferrer">
                          Launch Application 
                        </a>
                      ) : (
                        <button className="button primary disabled" type="button" title="Add your final live demo URL in src/data.js">
                          Launch Application 
                        </button>
                      )}
                      {project.github ? (
                        <a className="button" href={project.github} target="_blank" rel="noreferrer">
                          GitHub 
                        </a>
                      ) : (
                        <button className="button disabled" type="button" title="Add your GitHub URL in src/data.js">
                          GitHub 
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="section">
  <div className="container">
    <div className="section-heading" data-reveal>
      <div>
        <div className="eyebrow">JOURNEY</div>
        <h2>Learning by shipping.</h2>
      </div>
    </div>

    <div className="journey-grid">
      <div className="journey-line" />

      <article data-reveal className="journey-item">
        <span className="journey-dot">01</span>
        <div>
          <small>NOW</small>
          <h3>Python Full Stack</h3>
          <p>
            Django, REST APIs, React, PostgreSQL, authentication, and deployment.
          </p>
        </div>
      </article>

      <article data-reveal className="journey-item">
        <span className="journey-dot">02</span>
        <div>
          <small>NEXT</small>
          <h3>Production Depth</h3>
          <p>
            Strengthening testing, cloud deployment, system design, and scalable application thinking.
          </p>
        </div>
      </article>
    </div>
  </div>
</section>

<section id="contact" className="section contact-section ruled">
          <div className="container contact-card" data-reveal>
            <div>
              <div className="eyebrow">CONTACT</div>
              <h2>Let's build something useful.</h2>
              <p>
                Open to Python full-stack, software engineering, and entry-level developer opportunities.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button primary" href={`mailto:${profile.email}`}>Email me</a>
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn </a>
              <a className="button" href={profile.github} target="_blank" rel="noreferrer">GitHub </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span> {new Date().getFullYear()} {profile.name}</span>
          <span>Python Full Stack Developer  Python Full Stack Developer</span>
        </div>
      </footer>
    </div>
  );
}

export default App;











