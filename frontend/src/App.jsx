import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home         from './pages/Home'
import About        from './pages/About'
import Services     from './pages/Services'
import Testimonials from './pages/Testimonials'
import Contact      from './pages/Contact'
import Portfolio    from './pages/Portfolio'
import Expertise    from './pages/Expertise'
import Blog         from './pages/Blog'
import BlogPost     from './pages/BlogPost'
import ServicesAdmin from './pages/ServicesAdmin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* ── Admin route (no Navbar/Footer) ── */}
        <Route path="/admin/services" element={<ServicesAdmin />} />

        {/* ── Public routes ── */}
        <Route path="/*" element={
          <>
            <div className="noise-overlay" />
            <Navbar />
            <main style={{ paddingTop: '80px' }}>
              <Routes>
                <Route path="/"             element={<Home />}         />
                <Route path="/about"        element={<About />}        />
                <Route path="/services"     element={<Services />}     />
                <Route path="/team"         element={<Navigate to="/about#experts" replace />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/portfolio"    element={<Portfolio />}    />
                <Route path="/expertise"    element={<Expertise />}    />
                <Route path="/blog"         element={<Blog />}         />
                <Route path="/blog/:slug"   element={<BlogPost />}     />
                <Route path="/contact"      element={<Contact />}      />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}