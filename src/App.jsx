import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Method from './components/Method'
import Results from './components/Results'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  // Enhanced scroll reveal animation with multiple animation types
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .img-reveal').forEach(el =>
      observer.observe(el)
    )

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY
      document.querySelectorAll('.parallax-slow').forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.3)
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Method />
      <Results />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
