import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    name: 'Pure Silk',
    slug: 'pure-silk-saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    count: '85+ Sarees',
  },
  {
    name: 'Kanchi Cotton',
    slug: 'kanchi-cotton-saree',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    count: '60+ Sarees',
  },
  {
    name: 'Soft Silk',
    slug: 'soft-silk-saree',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    count: '45+ Sarees',
  },
  {
    name: 'Wedding Silk',
    slug: 'wedding-saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    count: '30+ Sarees',
  },
  {
    name: 'Tissue Saree',
    slug: 'tissue-saree',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    count: '25+ Sarees',
  },
  {
    name: 'Semi Silk',
    slug: 'semi-silk-saree',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    count: '40+ Sarees',
  },
  {
    name: 'Fancy Saree',
    slug: 'fancy-saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    count: '35+ Sarees',
  },
  {
    name: 'Chettinad Cotton',
    slug: 'chettinad-cotton',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    count: '28+ Sarees',
  },
]

export default function CategoryCircles() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold">
          Shop by Saree Categories
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="h-0.5 w-12 bg-gold/50" />
          <span className="text-gold text-lg">❦</span>
          <span className="h-0.5 w-12 bg-gold/50" />
        </div>
        <p className="text-brand-muted text-sm mt-2">
          Discover our wide variety of authentic South Indian handloom sarees
        </p>

        {/* Circular category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-4 mt-12">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop/${cat.slug}`}
              className="group flex flex-col items-center focus:outline-none"
            >
              {/* Circle container with decorative gold border */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-gold/60 group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title & Item count */}
              <h3 className="font-heading text-base sm:text-lg font-semibold text-brand-dark mt-3 group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-brand-muted">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
