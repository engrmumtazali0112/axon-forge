// src/components/PostImage.jsx
// Blog cover: shows the post's photo, and falls back to the generated PostCover
// if the post has no image or the image fails to load.
import { useState } from 'react'
import PostCover from './PostCover'
import './PostImage.css'

export default function PostImage({ slug, category, image, showTag = true }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) return <PostCover slug={slug} category={category} />

  return (
    <div className="pi-cover">
      <img src={image} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      {showTag && category && <span className="pi-tag">{category}</span>}
    </div>
  )
}
