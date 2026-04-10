import { useEffect } from "react";

const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { icon: "fab fa-html5", name: "HTML5", level: 95 },
      { icon: "fab fa-css3-alt", name: "CSS3", level: 90 },
      { icon: "fab fa-js-square", name: "JavaScript", level: 85 },
      { icon: "fab fa-js-square", name: "React", level: 90 },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { icon: "fab fa-node-js", name: "Node.js", level: 85 },
      { icon: "fas fa-server", name: "Express.js", level: 80 },
      { icon: "fas fa-server", name: "Next.js", level: 40 },
    ],
  },
  {
    category: "Database Management",
    skills: [
      { icon: "fas fa-database", name: "MongoDB", level: 70 },
      { icon: "fas fa-database", name: "MySQL", level: 30 },
      { icon: "fas fa-database", name: "PostgreSQL", level: 40 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { icon: "fab fa-git-alt", name: "Git", level: 70 },
      { icon: "fas fa-code", name: "VS Code", level: 95 },
      { icon: "fab fa-git-alt", name: "Antigravity", level: 80 },
    ],
  },
  {
    category: "UI/UX Design",
    skills: [
      { icon: "fab fa-figma", name: "Figma", level: 70 },
      { icon: "fas fa-palette", name: "Adobe XD", level: 75 },
      { icon: "fas fa-mobile-alt", name: "Responsive Design", level: 80 },
    ],
  },
  {
    category: "Mobile Development",
    skills: [
      { icon: "fab fa-react", name: "React Native", level: 70 },
      { icon: "fab fa-android", name: "Android", level: 70 },
      { icon: "fab fa-apple", name: "iOS", level: 70 },
    ],
  },
  {
    category: "Game Development",
    skills: [
      { icon: "fab fa-react", name: "Godot", level: 60 },
      { icon: "fab fa-apple", name: "Unity", level: 40 },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      { icon: "fab fa-react", name: "C++", level: 85 },
      { icon: "fab fa-android", name: "JAVA", level: 60 },
      { icon: "fab fa-apple", name: "Python", level: 80 },
    ],
  },
];

function Skill({ scrollReveal }) {
  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".skill-category");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-content">
          <div className="skills-grid">
            {skillsData.map(({ category, skills }) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <div className="skill-items">
                  {skills.map(({ icon, name, level }) => (
                    <div key={name} className="skill-item">
                      <i className={icon}></i>
                      <span>{name}</span>
                      <div className="skill-bar">
                        <div
                          className="skill-fill"
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;
