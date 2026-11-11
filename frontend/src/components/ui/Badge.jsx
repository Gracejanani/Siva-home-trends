import React from 'react';

const variantClasses = {
  sale: 'bg-primary text-white',
  new: 'bg-green-500 text-white',
  featured: 'bg-gold text-white',
  hot: 'bg-orange-500 text-white',
  out: 'bg-gray-400 text-white',
};

const Badge = ({ variant = 'sale', text, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-body font-semibold tracking-wide uppercase
        ${variantClasses[variant] || variantClasses.sale} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;
