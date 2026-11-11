import React from 'react';

const StarRating = ({ rating = 0, maxStars = 5, size = 'md', showCount = false, count = 0, className = '' }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: maxStars }, (_, i) => {
    const starValue = i + 1;
    if (rating >= starValue) return 'full';
    if (rating >= starValue - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars.map((type, i) => (
          <svg
            key={i}
            className={`${sizeClasses[size] || sizeClasses.md} ${
              type === 'empty' ? 'text-gray-200' : 'text-gold'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {type === 'full' && (
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            )}
            {type === 'half' && (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="currentColor"/>
                    <stop offset="50%" stopColor="#e5e7eb"/>
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#half-${i})`}
                />
              </>
            )}
            {type === 'empty' && (
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            )}
          </svg>
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="text-xs text-brand-muted font-body">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
