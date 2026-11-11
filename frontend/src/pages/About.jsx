import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Award, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react'
import StatsCounter from '../components/home/StatsCounter'

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-primary text-white py-16 md:py-24 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
            Our Story & Heritage
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold mb-4">
            About Us
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Bringing timeless South Indian silk traditions and divine temple jewellery to your auspicious celebrations.
          </p>
        </div>
      </div>

      {/* Main Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/40 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Silk Sarees"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Your Style, Your Beauty, Your Boutique
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold leading-tight">
                “Celebrate Every Moment with Beautiful Sarees and Elegant Jewellery.”
              </h2>
              <p className="text-brand-body text-sm md:text-base leading-relaxed">
                SJ Sri Jananin Saree brings you a beautiful collection of sarees and jewellery to make every occasion special. From traditional sarees to stylish designs, we offer choices for weddings, festivals, family functions, and everyday wear.
              </p>
              <p className="text-brand-body text-sm md:text-base leading-relaxed">
                Rooted in Dadagapatti, Salem, we work directly with experienced master weavers from Kanchipuram, Arani, and Salem to craft genuine pure silks, cottons, and temple ornaments that preserve our rich cultural roots.
              </p>

              <div className="pt-2">
                <Link to="/shop" className="btn-primary">
                  Explore Our Boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-xs uppercase tracking-widest font-semibold">
              Our Core Values
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold mt-2">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Sparkles size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Elegant Designs
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Contemporary styling blended with authentic South Indian heritage motifs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Award size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Premium Quality
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Silk-mark certified threads and anti-tarnish hallmarked temple gold finish.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Affordable Prices
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Direct weaver-to-door pricing without retail middleman commissions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <HeartHandshake size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                Trusted Service
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Over 8,000+ satisfied brides, families, and global retail shoppers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Location Callout */}
      <section className="bg-brand-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <MapPin size={32} className="mx-auto text-gold" />
          <h3 className="font-heading text-3xl font-semibold">
            Visit Our Boutique in Salem
          </h3>
          <p className="text-sm text-white/80 max-w-lg mx-auto">
            Thirunjanam nagar 5rd, Cross Dadagapatti, Salem - 636006, Tamil Nadu
          </p>
          <div className="pt-2">
            <Link to="/contact" className="btn-gold inline-flex">
              Get Directions & Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
