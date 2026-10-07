/**
 * src/api.js
 * Centralised data layer for Axon Forge.
 * Fetches content from Strapi CMS.
 * Falls back to FastAPI for contact form (SMTP).
 */

import axios from 'axios'

const STRAPI_URL  = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337'
const FASTAPI_URL = import.meta.env.VITE_API_URL        || 'http://localhost:8000'

const strapi = axios.create({ baseURL: STRAPI_URL })

/* ─── Helpers ────────────────────────────────────────────────────── */

/**
 * Strapi v5 returns: { data: [ { id, ...attributes } ] }  (flattened in v5)
 * Strapi v4 returns: { data: [ { id, attributes: {...} } ] }
 * This helper normalises both into a flat object.
 */
function normalise(item) {
  if (!item) return null
  const attrs = item.attributes ? item.attributes : item
  return { id: item.id, ...attrs }
}

/** Build a full media URL from a Strapi media object */
function mediaUrl(media) {
  if (!media) return null
  // Strapi v4: media.data.attributes.url
  // Strapi v5: media.url
  const url = media?.data?.attributes?.url || media?.url
  return url ? `${STRAPI_URL}${url}` : null
}

/* ─── Exported API functions ────────────────────────────────────── */

/** Fetch all active services */
export async function getServices() {
  try {
    const res  = await strapi.get('/api/services?populate=*&filters[is_active][$eq]=true&sort=order_index:asc')
    const list = res.data.data.map(item => {
      const flat = normalise(item)
      return {
        ...flat,
        photo_url: mediaUrl(flat.photo_url),
        features:  Array.isArray(flat.features) ? flat.features : [],
      }
    })
    return { data: { services: list } }
  } catch (err) {
    console.error('getServices error:', err)
    return { data: { services: [] } }
  }
}

/** Fetch site-wide stats (Single Type) */
export async function getStats() {
  try {
    const res = await strapi.get('/api/stats?populate=*')
    const raw = res.data.data
    // Single Type can return { id, attributes } or a flat object
    const flat = raw?.attributes ? raw.attributes : raw
    return { data: flat || {} }
  } catch (err) {
    console.error('getStats error:', err)
    return { data: {} }
  }
}

/** Fetch testimonials */
export async function getTestimonials() {
  try {
    const res  = await strapi.get('/api/testimonials?populate=*&sort=createdAt:desc')
    const list = res.data.data.map(item => normalise(item))
    return { data: { testimonials: list } }
  } catch (err) {
    console.error('getTestimonials error:', err)
    return { data: { testimonials: [] } }
  }
}

/** Fetch team members */
export async function getTeam() {
  try {
    const res  = await strapi.get('/api/team-members?populate=*&sort=order_index:asc')
    const list = res.data.data.map(item => {
      const flat = normalise(item)
      return {
        ...flat,
        avatar: flat.avatar || flat.name?.slice(0, 2).toUpperCase(),
        skills: Array.isArray(flat.skills) ? flat.skills : [],
      }
    })
    return { data: { team: list } }
  } catch (err) {
    console.error('getTeam error:', err)
    return { data: { team: [] } }
  }
}

/** Submit contact form → FastAPI (handles SMTP email) */
export async function submitContact(formData) {
  return axios.post(`${FASTAPI_URL}/api/contact`, formData)
}

export default strapi