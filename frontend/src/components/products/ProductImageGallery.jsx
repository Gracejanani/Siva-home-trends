import React, { useState, useEffect } from 'react'

export default function ProductImageGallery({
  images = [],
  productName = 'Product',
  selectedImage = null,
}) {
  const imageList =
    Array.isArray(images) && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        ]

  const [activeImage, setActiveImage] = useState(selectedImage || imageList[0])

  // Automatically update the main image whenever selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      setActiveImage(selectedImage)
    } else if (imageList.length > 0) {
      setActiveImage(imageList[0])
    }
  }, [selectedImage, images])

  // Combine imageList with selectedImage if not already in list
  const allImages = selectedImage && !imageList.includes(selectedImage)
    ? [selectedImage, ...imageList]
    : imageList

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[520px] shrink-0 scrollbar-none">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
              activeImage === img
                ? 'border-primary ring-2 ring-primary/30 scale-105'
                : 'border-brand-border/60 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image */}
      <div className="flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-brand-border/60 relative group shadow-sm">
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  )
}
