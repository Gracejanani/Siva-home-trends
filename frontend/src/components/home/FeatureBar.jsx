import React from 'react'
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react'

export default function FeatureBar() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: 'Free Shipping',
      desc: 'On orders over ₹999',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: '100% Genuine Products',
      desc: 'Authentic Quality Assured',
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-primary" />,
      title: 'Easy Returns',
      desc: '7 Days Return Policy',
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: '24/7 Dedicated Support',
      desc: 'Quick WhatsApp Assistance',
    },
  ]

  return (
    <section className="bg-primary-light border-y border-brand-border/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-brand-border/50 shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-brand-dark leading-snug">
                  {f.title}
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
