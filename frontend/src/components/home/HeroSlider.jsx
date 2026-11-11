import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=80',
    tagline: 'TRADITIONAL HANDWOVEN SAREES',
    title: 'Grace in Every Thread & Weave',
    subtitle: 'Explore authentic silk and cotton sarees crafted for life’s brightest celebrations.',
    cta: 'Explore Sarees',
    link: '/shop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=80',
    tagline: 'PURE KANCHIPURAM SILK',
    title: 'Bridal Opulence & Gold Zari Pattu',
    subtitle: 'Heirloom pure silk wedding sarees woven with rich gold zari for timeless auspicious moments.',
    cta: 'Shop Bridal Silk',
    link: '/shop/wedding-saree',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80',
    tagline: 'HANDLOOM KANCHI COTTON',
    title: 'Breathable Grace for Every Day',
    subtitle: 'Vibrant natural dyes, temple borders, and comfortable pure cotton handloom crafted in Tamil Nadu.',
    cta: 'Shop Cotton Sarees',
    link: '/shop/kanchi-cotton-saree',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section className="relative h-[80vh] md:h-[88vh] w-full overflow-hidden bg-brand-dark">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark luxury gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Slide Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-white max-w-2xl">
            <span className="inline-block py-1 px-3 mb-4 rounded-full bg-primary/30 border border-gold/40 text-gold text-xs md:text-sm font-body tracking-[0.25em] uppercase font-semibold">
              {slide.tagline}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight text-white mb-6 drop-shadow-md">
              {slide.title}
            </h1>
            <p className="font-body text-base md:text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={slide.link}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-body font-medium transition-all duration-300 shadow-lg shadow-primary/30 hover:scale-105"
              >
                {slide.cta}
              </Link>
              <Link
                to="/about"
                className="border-2 border-white/80 hover:border-gold hover:text-gold text-white px-8 py-3.5 rounded-full font-body font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Our Weavers
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-gold' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
