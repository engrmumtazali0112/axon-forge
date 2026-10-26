import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Mail, MapPin, Clock, DollarSign } from 'lucide-react'
import styles from './Footer.module.css'
import logo from '../assets/logo.jpg'

const NAV = [
  ['/', 'Home'], ['/about', 'About us'], ['/services', 'Services'],
  ['/team', 'Our team'], ['/testimonials', 'Testimonials'], ['/contact', 'Contact'],
]
const SERVICES = [
  'Web development', 'SaaS solutions', 'AI / ML integration',
  'Database design', 'Cloud & DevOps', 'Mobile apps',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Axon Forge home">
              <img src={logo} alt="Axon Forge" className={styles.logoImg} />
            </Link>
            <p className={styles.tagline}>
              Building intelligent, scalable full-stack solutions. From AI integrations
              to cloud-native apps, we turn your ideas into real business growth.
            </p>
            <div className={styles.socials}>
              <a href="https://pk.linkedin.com/company/axon-forge" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialBtn}><Linkedin size={16} /></a>
              <a href="https://x.com/Engrmumtazali01" target="_blank" rel="noreferrer" aria-label="X" className={styles.socialBtn}><Twitter size={16} /></a>
              <a href="mailto:engrmumtazali01@gmail.com" aria-label="Email" className={styles.socialBtn}><Mail size={16} /></a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul>
              {NAV.map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s}><Link to="/services">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.contact}`}>
            <h4 className={styles.colTitle}>Get in touch</h4>
            <ul className={styles.contactList}>
              <li><span className={styles.icon}><MapPin size={14} /></span>Lahore, Pakistan · Remote</li>
              <li><span className={styles.icon}><DollarSign size={14} /></span>Starting at $20 / hr</li>
              <li><span className={styles.icon}><Clock size={14} /></span>Reply within 24 hours</li>
              <li>
                <span className={styles.icon}><Mail size={14} /></span>
                <a href="mailto:engrmumtazali01@gmail.com" className={styles.email}>engrmumtazali01@gmail.com</a>
              </li>
            </ul>
            <Link to="/contact" className={styles.cta}>Start a project</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Axon Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
