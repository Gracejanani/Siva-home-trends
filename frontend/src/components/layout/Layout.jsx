import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'
import { MessageCircle } from 'lucide-react'
import { STORE_WHATSAPP, STORE_NAME } from '../../services/api'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />

      {/* Floating WhatsApp Chat Button (Desktop & Tablet) */}
      <a
        href={`https://wa.me/91${STORE_WHATSAPP}?text=Hello%20${encodeURIComponent(STORE_NAME)}%2C%20I%20am%20interested%20in%20your%20saree%20collection.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 items-center justify-center group"
      >
        <MessageCircle size={28} className="fill-white text-[#25D366]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-xs text-white px-0 group-hover:px-2">
          Chat With Us
        </span>
      </a>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  )
}
