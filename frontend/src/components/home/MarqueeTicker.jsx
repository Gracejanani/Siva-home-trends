import React from 'react'

export default function MarqueeTicker() {
  const messages = [
    '✨ Worldwide Fast Shipping Service',
    '⚡ 2 Days Delivery For South India',
    '📦 Same Day Dispatch Available',
    '💵 Cash on Delivery All Over Tamil Nadu',
    '💳 Easy Multiple Payment Options',
    '🎁 Free Gift Box with Every Order',
  ]

  return (
    <div className="bg-primary text-white py-3 overflow-hidden shadow-inner select-none">
      <div className="flex w-max animate-marquee space-x-12 font-body text-xs md:text-sm font-medium tracking-wider uppercase">
        {/* Render twice for infinite smooth marquee */}
        {messages.concat(messages).concat(messages).map((msg, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span>{msg}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
