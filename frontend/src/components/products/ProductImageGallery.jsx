import React, { useState } from 'react'

export default function ProductImageGallery({ images = [], productName = 'Product' }) {
  const imageList =
    Array.isArray(images) && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        ]

  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0">
        {imageList.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
              activeIdx === i ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`${productName} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Large Image */}
      <div className="flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-brand-border/60 relative group">
        <img
          src={imageList[activeIdx]}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
        />
      </div>
    </div>
  )
}
