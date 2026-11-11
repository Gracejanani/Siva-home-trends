import React from 'react'
import CountUp from 'react-countup'
import { Users, Package, Award, Sparkles } from 'lucide-react'

export default function StatsCounter() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      end: 8000,
      suffix: '+',
      label: 'Happy Customers',
      desc: 'Across India & Overseas',
    },
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      end: 250,
      suffix: '+',
      label: 'Products Category',
      desc: 'Exclusive Silk & Ornaments',
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      end: 100,
      suffix: '%',
      label: 'Quality Assured',
      desc: 'Hallmarked & Pure Silk Certified',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      end: 20,
      suffix: '+',
      label: 'Expert Staffs',
      desc: 'To Assist Your Orders',
    },
  ]

  return (
    <section className="bg-primary-light/60 py-16 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-brand-border/40 flex flex-col items-center transform transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-2xl mb-4">{s.icon}</div>
              <div className="font-heading text-4xl sm:text-5xl font-bold text-primary">
                <CountUp end={s.end} duration={3} enableScrollSpy scrollSpyOnce />
                <span>{s.suffix}</span>
              </div>
              <h4 className="font-heading text-lg font-semibold text-brand-dark mt-2">
                {s.label}
              </h4>
              <p className="text-xs text-brand-muted mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
