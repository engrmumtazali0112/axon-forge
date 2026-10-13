import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home         from './pages/Home'
import About        from './pages/About'
import Services     from './pages/Services'
import Testimonials from './pages/Testimonials'
import Contact      from './pages/Contact'
import Portfolio    from './pages/Portfolio'
import Expertise    from './pages/Expertise'
import Blog         from './pages/Blog'
import BlogPost     from './pages/BlogPost'
import CaseStudy    from './pages/CaseStudy'
import ServicesAdmin from './pages/ServicesAdmin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const THEME_KEY = 'axon-theme'

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(THEME_KEY) || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/admin/services" element={<ServicesAdmin />} />

        <Route path="/*" element={
          <>
            <div className="noise-overlay" />
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main style={{ paddingTop: '80px' }}>
              <Routes>
                <Route path="/"             element={<Home />}         />
                <Route path="/about"        element={<About />}        />
                <Route path="/services"     element={<Services />}     />
                <Route path="/team"         element={<Navigate to="/about#experts" replace />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/portfolio"    element={<Portfolio />}    />
                <Route path="/work/:slug"   element={<CaseStudy />}    />
                <Route path="/expertise"    element={<Expertise />}    />
                <Route path="/blog"         element={<Blog />}         />
                <Route path="/blog/:slug"   element={<BlogPost />}     />
                <Route path="/contact"      element={<Contact />}      />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}