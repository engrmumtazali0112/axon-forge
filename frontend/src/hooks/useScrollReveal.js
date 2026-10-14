// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const cards = root.querySelectorAll('.pc-card')
    if (!cards.length) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      cards.forEach((c) => c.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible')
            }, i * 70)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    )

    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [options])

  return containerRef
}