import styles from '../pages/Content.module.css'

/** Decorative cover for blog cards (no image files needed). Variant is picked from the slug. */
const LAYOUTS = [
  [{ l: 140, t: 90, w: 170, r: 28 }, { l: 140, t: 90, w: 160, r: -24 }],
  [{ l: 90, t: 120, w: 200, r: -10 }, { l: 200, t: 70, w: 150, r: 38 }],
  [{ l: 120, t: 60, w: 180, r: 22 }, { l: 120, t: 150, w: 190, r: -18 }],
]

export default function PostCover({ slug, category }) {
  const idx = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % LAYOUTS.length
  return (
    <div className={styles.cover} aria-hidden>
      <div className={`${styles.coverTag} ${styles.coverTop}`}><i /> AXON FORGE · JOURNAL</div>
      {LAYOUTS[idx].map((s, i) => (
        <span key={i} className={styles.coverLine}
          style={{ left: `${s.l}px`, top: `${s.t}px`, width: s.w, transform: `rotate(${s.r}deg)` }} />
      ))}
      <div className={styles.coverGlow} />
      <div className={`${styles.coverTag} ${styles.coverBottom}`}><b /> {category}</div>
    </div>
  )
}
