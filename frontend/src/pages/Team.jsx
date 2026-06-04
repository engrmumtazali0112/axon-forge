import { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { getTeam } from '../api'
import styles from './Team.module.css'

export default function Team() {
  const [team, setTeam]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeam().then(r => setTeam(r.data.team)).finally(() => setLoading(false))
  }, [])

  return (
    <div>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroLine} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowDot} />
              The People
            </div>
            <h1 className={styles.heroTitle}>
              Meet the Minds<br />
              <span className={styles.gold}>Behind the Innovation</span>
            </h1>
            <p className={styles.heroDesc}>
              A small, high-impact team of passionate engineers. We don't have a bench of
              average developers — every team member is exceptional at what they do.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section className={styles.teamSection}>
        <div className="container">
          {loading ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : (
            <div className={styles.teamGrid}>
              {team.map((member, i) => (
                <div key={member.id} className={styles.memberCard} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={styles.cardGlow} />
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>{member.avatar}</div>
                    <div className={styles.avatarRing} />
                    <div className={styles.avatarRing2} />
                  </div>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p className={styles.bio}>{member.bio}</p>
                  <div className={styles.skills}>
                    {member.skills.map(s => (
                      <span key={s} className={styles.skill}>{s}</span>
                    ))}
                  </div>
                  <div className={styles.socials}>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
                    <a href={member.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
                    <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Hiring Banner ── */}
      <section className={styles.hiringSection}>
        <div className="container">
          <div className={styles.hiringBox}>
            <div className={styles.hiringLeft}>
              <div className={styles.secLabel}>We're Growing</div>
              <h2 className={styles.hiringTitle}>Interested in Joining Us?</h2>
              <p className={styles.hiringDesc}>
                We're always looking for exceptional engineers who share our passion for clean code,
                AI-first thinking, and genuine client impact. Remote-first, flexible, and rewarding.
              </p>
            </div>
            <a href="mailto:careers@aidjango.dev" className={styles.btnGold}>
              Send Your CV →
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}