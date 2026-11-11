import React from 'react'

const POLICIES = {
  terms: {
    title: 'Terms & Conditions',
    updated: 'November 2026',
    content: (
      <>
        <p>Welcome to SJ Sri Jananin Saree. By accessing and purchasing from our website (jewellery1.premiumweb.in) or our offline boutique in Salem, Tamil Nadu, you agree to be bound by the following terms and conditions.</p>
        <h3>1. Product Authenticity & Color Variations</h3>
        <p>All our silk sarees and temple jewellery collections are genuine handloom and handcrafted pieces. Slight variations in color shade or zari reflection may occur between digital photographs and the physical weave due to digital screen lighting.</p>
        <h3>2. Pricing & Orders</h3>
        <p>Prices are listed in Indian Rupees (INR) and are inclusive of standard taxes. Shipping charges may apply depending on your order total and delivery pincode.</p>
        <h3>3. Governing Law</h3>
        <p>Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Salem, Tamil Nadu, India.</p>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'November 2026',
    content: (
      <>
        <p>At SJ Sri Jananin Saree, we respect your privacy and protect your personal identification data.</p>
        <h3>Information We Collect</h3>
        <p>When you place an order or contact us, we collect your name, phone number, delivery address, and email to process shipments and send tracking notifications via SMS/WhatsApp.</p>
        <h3>Payment Security</h3>
        <p>We do not store complete debit/credit card numbers or UPI PINs on our servers. All transactions are securely routed through certified payment gateways.</p>
      </>
    ),
  },
  shipping: {
    title: 'Shipping Policy',
    updated: 'November 2026',
    content: (
      <>
        <p>We strive to deliver your orders promptly and safely across India and worldwide.</p>
        <h3>Delivery Timelines</h3>
        <ul>
          <li><strong>Tamil Nadu & South India:</strong> 1 to 2 business days.</li>
          <li><strong>Rest of India:</strong> 3 to 5 business days.</li>
          <li><strong>Dispatches:</strong> Orders received before 1:00 PM IST are processed for same-day dispatch.</li>
        </ul>
        <h3>Shipping Charges</h3>
        <p>We offer <strong>Free Shipping on all orders above ₹999</strong>. A standard nominal fee of ₹50 is applied to orders below ₹999.</p>
      </>
    ),
  },
  returns: {
    title: 'Returns & Exchanges',
    updated: 'November 2026',
    content: (
      <>
        <p>We want you to love what you wear. If you are not completely satisfied, we offer an easy return policy.</p>
        <h3>7-Day Return Guarantee</h3>
        <p>You may initiate a return or exchange within 7 days from the date of package delivery. Items must be unused, unwashed, and in their original packaging with all security tags attached.</p>
        <h3>Refund Processing</h3>
        <p>Once we receive and inspect the returned saree or jewellery, your refund will be credited to your original payment method or bank account within 2-4 business days.</p>
      </>
    ),
  },
  cancellation: {
    title: 'Cancellation Policy',
    updated: 'November 2026',
    content: (
      <>
        <p>You can cancel your order prior to dispatch by messaging our customer support team directly at <strong>+91 90255 74074</strong> with your order reference number.</p>
        <p>Once the parcel has been picked up by our courier partners, cancellation is not possible; you may instead request a return after delivery.</p>
      </>
    ),
  },
}

export default function PolicyPage({ type = 'terms' }) {
  const policy = POLICIES[type] || POLICIES.terms

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary text-white py-16 text-center px-4">
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold mb-2">
          {policy.title}
        </h1>
        <p className="text-white/80 text-xs">Last Updated: {policy.updated}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-pink max-w-none text-brand-body text-sm md:text-base leading-relaxed space-y-4">
          {policy.content}
        </div>
      </div>
    </div>
  )
}
