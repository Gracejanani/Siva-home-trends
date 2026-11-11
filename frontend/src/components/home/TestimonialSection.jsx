import React from 'react'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Priya Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    text: 'The Kanchi cotton saree I ordered arrived in just 2 days. The colour combination and zari finish exceeded my expectations! Highly recommend SJ Sri Jananin Saree for weddings and family functions.',
    date: '3 days ago',
  },
  {
    name: 'Ananya Ramesh',
    location: 'Bangalore, Karnataka',
    rating: 5,
    text: 'Purchased the Temple Haram and matching bangles. The gold polish is stunning and does not fade. The packaging in the velvet box was so royal!',
    date: '1 week ago',
  },
  {
    name: 'Kavitha Natarajan',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    text: 'Ordered 4 semi silk sarees for my daughter’s engagement. Very soft fabric and drape is so elegant. Customer support on WhatsApp was very prompt and helpful.',
    date: '2 weeks ago',
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs uppercase tracking-widest font-semibold">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold mt-2">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-gold text-gold" />
            ))}
            <span className="ml-2 font-body font-semibold text-brand-dark">4.9 / 5.0</span>
            <span className="text-brand-muted text-sm">(70+ Verified Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-primary-light/40 border border-brand-border/60 rounded-2xl p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 text-primary/15 w-12 h-12" />

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-brand-body text-sm leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="border-t border-brand-border/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-semibold text-brand-dark">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-brand-muted">{rev.location}</p>
                </div>
                <span className="text-xs text-brand-muted">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
