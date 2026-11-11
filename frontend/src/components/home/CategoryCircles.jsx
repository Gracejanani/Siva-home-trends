import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    name: 'Bangles',
    slug: 'bangles',
    image: 'https://images.unsplash.com/photo-1611591475844-030999553642?auto=format&fit=crop&w=400&q=80',
    count: '24+ Items',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
    count: '48+ Items',
  },
  {
    name: 'Haram',
    slug: 'haram',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
    count: '18+ Items',
  },
  {
    name: 'Necklace',
    slug: 'necklace',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=400&q=80',
    count: '32+ Items',
  },
  {
    name: 'Pendent',
    slug: 'pendent',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80',
    count: '15+ Items',
  },
  {
    name: 'Kanchi Cotton',
    slug: 'kanchi-cotton-saree',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    count: '60+ Items',
  },
  {
    name: 'Pure Silk',
    slug: 'pure-silk-saree',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    count: '85+ Items',
  },
  {
    name: 'Semi Silk',
    slug: 'semi-silk-saree',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    count: '40+ Items',
  },
]

export default function CategoryCircles() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold">
          Shop by Categories
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="h-0.5 w-12 bg-gold/50" />
          <span className="text-gold text-lg">❦</span>
          <span className="h-0.5 w-12 bg-gold/50" />
        </div>
        <p className="text-brand-muted text-sm mt-2">
          Explore our wide range of traditional ethnic collections
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
