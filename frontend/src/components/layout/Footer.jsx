import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const PhoneIconSmall = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const SocialButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-primary text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-xl">SJ</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Sri Jananin Saree
                </h3>
                <p className="text-white/75 text-sm font-body leading-relaxed mb-4">
                  SJ Sri Jananin Saree brings you an exquisite collection of pure silk, Kanchi cotton, and bridal sarees handwoven for every celebration.
                </p>
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <SocialButton href="https://facebook.com/srijananinsaree"><FacebookIcon /></SocialButton>
                  <SocialButton href="https://twitter.com"><TwitterIcon /></SocialButton>
                  <SocialButton href="https://instagram.com/srijananinsaree"><InstagramIcon /></SocialButton>
                  <SocialButton href="https://pinterest.com"><PinterestIcon /></SocialButton>
                  <SocialButton href="https://linkedin.com"><LinkedInIcon /></SocialButton>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-white mb-4 pb-2 border-b border-white/20">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Shop', to: '/shop' },
                  { label: 'Track Order', to: '/track-order' },
                  { label: 'Contact Us', to: '/contact' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm font-body transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:bg-white transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Saree Collections */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-white mb-4 pb-2 border-b border-white/20">
                Saree Collections
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Pure Silk Sarees', to: '/shop/pure-silk-saree' },
                  { label: 'Kanchi Cotton Sarees', to: '/shop/kanchi-cotton-saree' },
                  { label: 'Soft Silk Sarees', to: '/shop/soft-silk-saree' },
                  { label: 'Wedding & Bridal Silk', to: '/shop/wedding-saree' },
                  { label: 'Tissue Sarees', to: '/shop/tissue-saree' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm font-body transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:bg-white transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms & Policy */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-white mb-4 pb-2 border-b border-white/20">
                Terms &amp; Policy
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Terms & Condition', to: '/terms' },
                  { label: 'Privacy Policy', to: '/privacy' },
                  { label: 'Shipping Policy', to: '/shipping' },
                  { label: 'Refund Policy', to: '/refund' },
                  { label: 'Cancellation Policy', to: '/cancellation' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm font-body transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:bg-white transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-white mb-4 pb-2 border-b border-white/20">
                Get In Touch
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPinIcon />
                  <span className="text-white/75 text-sm font-body leading-relaxed">
                    Thirunjanam nagar 5rd, Cross Dadagapatti, Salem - 636006
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIconSmall />
                  <a href="tel:+916381100461" className="text-white/75 hover:text-white text-sm font-body transition-colors">
                    +91 6381100461
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon />
                  <a href="mailto:info@premiumweb.in" className="text-white/75 hover:text-white text-sm font-body transition-colors">
                    info@premiumweb.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIconSmall />
                  <div>
                    <p className="text-white/60 text-xs font-body">Customer Support</p>
                    <a href="tel:+919025574074" className="text-white/75 hover:text-white text-sm font-body transition-colors">
                      +91 90255 74074
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary border-t border-white/20 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 text-sm font-body">
            Designed by{' '}
            <a href="https://premiumweb.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors font-medium">
              Premiumweb
            </a>
            {' '}© All Rights Reserved by{' '}
            <span className="text-white font-medium">SJ Sri Jananin Saree</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
