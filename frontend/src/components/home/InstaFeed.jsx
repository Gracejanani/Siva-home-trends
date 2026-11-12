import React from 'react'
import { Instagram } from 'lucide-react'

const INSTA_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1611591475844-030999553642?auto=format&fit=crop&w=600&q=80',
]

export default function InstaFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-2">
          <Instagram size={18} />
          <span>@sivahometrends</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold">
          Follow Us On Instagram
        </h2>
        <p className="text-brand-muted text-sm mt-1">
          Tag #SivaHomeTrends to be featured on our official handle
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {INSTA_IMAGES.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-brand-border/40"
          >
            <img
              src={img}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <Instagram size={28} className="transform group-hover:scale-110 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
