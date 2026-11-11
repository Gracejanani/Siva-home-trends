import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function ExclusiveBanner() {
  return (
    <section className="relative py-24 md:py-32 my-12 bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=80')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles size={14} />
          <span>Limited Time Offer</span>
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white mb-4">
          Exclusive Collections — Handpicked For You
        </h2>

        <p className="font-body text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Elegance woven into tradition. Adorn your celebratory moments with handcrafted South Indian heritage silks and temple gold jewellery.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-body font-medium transition-all duration-300 shadow-xl shadow-primary/40 hover:scale-105"
          >
            Explore Collection
          </Link>
          <a
            href="https://wa.me/919025574074"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-3.5 rounded-full font-body font-medium transition-all duration-300 backdrop-blur-sm"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </section>
  )
}
