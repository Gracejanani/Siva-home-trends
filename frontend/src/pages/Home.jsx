import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import HeroSlider from '../components/home/HeroSlider'
import CategoryBanners from '../components/home/CategoryBanners'
import FeatureBar from '../components/home/FeatureBar'
import MarqueeTicker from '../components/home/MarqueeTicker'
import ProductSlider from '../components/products/ProductSlider'
import CategoryCircles from '../components/home/CategoryCircles'
import ExclusiveBanner from '../components/home/ExclusiveBanner'
import StatsCounter from '../components/home/StatsCounter'
import TestimonialSection from '../components/home/TestimonialSection'
import InstaFeed from '../components/home/InstaFeed'
import { getNewArrivals, getBestSellers, subscribeNewsletter } from '../services/api'

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [newArrivalsLoading, setNewArrivalsLoading] = useState(true)
  const [bestSellersLoading, setBestSellersLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    getNewArrivals()
      .then((data) => setNewArrivals(data?.products || data || []))
      .catch(() => setNewArrivals([]))
      .finally(() => setNewArrivalsLoading(false))
  }, [])

  useEffect(() => {
    getBestSellers()
      .then((data) => setBestSellers(data?.products || data || []))
      .catch(() => setBestSellers([]))
      .finally(() => setBestSellersLoading(false))
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your email address.')
      return
    }
    setSubscribing(true)
    try {
      await subscribeNewsletter(email)
      toast.success('Thank you for subscribing! 🎉')
      setEmail('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <main>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Category Banners */}
      <CategoryBanners />

      {/* 3. Feature Bar */}
      <FeatureBar />

      {/* 4. Marquee Ticker */}
      <MarqueeTicker />

      {/* 5. New Arrivals */}
      <ProductSlider
        title="New Arrivals"
        products={newArrivals}
        loading={newArrivalsLoading}
      />

      {/* 6. Category Circles */}
      <CategoryCircles />

      {/* 7. Exclusive Banner */}
      <ExclusiveBanner />

      {/* 8. Best Selling Collections */}
      <ProductSlider
        title="Best Selling Collections"
        products={bestSellers}
        loading={bestSellersLoading}
      />

      {/* 9. Stats Counter */}
      <StatsCounter />

      {/* 10. Testimonials */}
      <TestimonialSection />

      {/* 11. Instagram Feed */}
      <InstaFeed />

      {/* 12. Newsletter Signup */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 uppercase tracking-widest text-sm font-body mb-2">
            Stay in the loop
          </p>
          <h2 className="font-heading text-4xl text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 font-body mb-8 max-w-md mx-auto">
            Get the latest updates on new arrivals, exclusive offers and festive
            collections straight to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full text-gray-800 font-body focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button
              type="submit"
              disabled={subscribing}
              className="btn-gold px-8 py-3 rounded-full font-body font-semibold disabled:opacity-60"
            >
              {subscribing ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
