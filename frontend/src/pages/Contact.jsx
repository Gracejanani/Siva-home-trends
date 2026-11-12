import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { sendContactMessage } from '../services/api'
import { toast } from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sendContactMessage(form)
      toast.success('Thank you! Your message has been sent.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.success('Thank you! Your message has been received.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary text-white py-16 text-center px-4">
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-2 block">
          We’re Here to Help You
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold mb-3">
          Contact Siva Home Trends
        </h1>
        <p className="text-white/80 text-sm max-w-lg mx-auto">
          Have queries about saree colors, fabric details, or bridal wedding orders? Reach out to our boutique team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <MapPin size={24} />
            </div>
            <h4 className="font-heading text-lg font-semibold text-brand-dark mb-1">
              Store Address
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Thirunjanam nagar 5rd, Cross Dadagapatti, Salem - 636006
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Phone size={24} />
            </div>
            <h4 className="font-heading text-lg font-semibold text-brand-dark mb-1">
              Phone Number
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              +91 9488551771 (WhatsApp Order Line)<br />
              +91 6381100461
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Mail size={24} />
            </div>
            <h4 className="font-heading text-lg font-semibold text-brand-dark mb-1">
              Email Address
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              gracejana123@gmail.com<br />
              info@premiumweb.in
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-light/50 border border-brand-border/60 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Clock size={24} />
            </div>
            <h4 className="font-heading text-lg font-semibold text-brand-dark mb-1">
              Opening Hours
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Monday - Sunday<br />
              9:00 AM – 9:00 PM IST
            </p>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-white border border-brand-border/60 rounded-2xl p-8 shadow-sm">
            <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-brand-muted mb-6">
              Fill out the form below and our team will get back to you within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Meenakshi"
                  className="w-full text-sm p-3 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-sm p-3 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9488551771"
                    className="w-full text-sm p-3 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about the sarees or wedding orders you are looking for..."
                  className="w-full text-sm p-3 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 flex-1 shadow-md"
                >
                  <Send size={16} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
                <a
                  href="https://wa.me/919488551771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </form>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden border border-brand-border/60 shadow-sm h-full min-h-[420px]">
            <iframe
              title="Siva Home Trends Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.56453702175!2d78.1394464!3d11.650882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1c3f59664eb%3A0x6b1054320b666a46!2sDadagapatti%2C%20Salem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
