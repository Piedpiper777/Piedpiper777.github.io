import { aboutData } from '../data/aboutData'

function AboutView() {
  return (
    <section className="about-view">
      <div className="about-card">
        <div className="about-header">
          <img src={aboutData.avatar} alt={aboutData.name} className="about-avatar" />
          <h2>{aboutData.name}</h2>
          <p className="about-bio">{aboutData.bio}</p>
        </div>

        <div className="about-section">
          <h3>关于我</h3>
          <p>{aboutData.description}</p>
        </div>

        <div className="about-section">
          <h3>技术栈</h3>
          <div className="tech-tags">
            {aboutData.techStack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h3>联系方式</h3>
          <div className="social-links">
            {aboutData.social.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="social-btn">
                {s.platform === 'GitHub' ? '🐙' : '✉️'} {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutView
