import { useEffect } from 'react'
import './ThemeToggle.css'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-track">
        <span className="tt-star tt-star-1" />
        <span className="tt-star tt-star-2" />
        <span className="tt-star tt-star-3" />

        <span className="tt-ray tt-ray-1" />
        <span className="tt-ray tt-ray-2" />
        <span className="tt-ray tt-ray-3" />
        <span className="tt-ray tt-ray-4" />
        <span className="tt-ray tt-ray-5" />
        <span className="tt-ray tt-ray-6" />
        <span className="tt-ray tt-ray-7" />
        <span className="tt-ray tt-ray-8" />

        <span className="theme-toggle-thumb">
          <span className="tt-crater tt-crater-1" />
          <span className="tt-crater tt-crater-2" />
          <span className="tt-crater tt-crater-3" />
        </span>
      </span>
    </button>
  )
}
