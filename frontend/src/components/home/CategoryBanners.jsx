import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CategoryBanners() {
  const banners = [
    {
      title: 'PURE SILK SAREES',
      subtitle: 'Kanchipuram & Bridal Silk',
      description: 'Heirloom pure pattu sarees with pure gold zari pallu, woven for royal celebrations.',
      link: '/shop/pure-silk-saree',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'KANCHI COTTON SAREES',
      subtitle: 'Breathable Handloom Weaves',
      description: 'Authentic 80s count handloom cotton sarees with contrast temple borders and rich motifs.',
      link: '/shop/kanchi-cotton-saree',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((b, idx) => (
            <div
              key={idx}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${b.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
                <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
                  {b.subtitle}
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-semibold mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-white/80 max-w-sm mb-6 line-clamp-2">
                  {b.description}
                </p>
                <div>
                  <Link
                    to={b.link}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-md group-hover:gap-3"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
