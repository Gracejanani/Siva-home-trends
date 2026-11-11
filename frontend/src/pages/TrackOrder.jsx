import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Package, Search, CheckCircle, Truck, Clock } from 'lucide-react'
import { trackOrder } from '../services/api'
import { toast } from 'react-hot-toast'

export default function TrackOrder() {
  const [searchParams] = useSearchParams()
  const [orderNumber, setOrderNumber] = useState(searchParams.get('order') || '')
  const [loading, setLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderNumber.trim()) {
      toast.error('Please enter an order number')
      return
    }

    setLoading(true)
    try {
      const res = await trackOrder(orderNumber.trim())
      setOrderStatus(res?.data || {
        orderNumber: orderNumber.trim(),
        status: 'Confirmed & Processing',
        estimatedDelivery: '2-3 Business Days',
        location: 'Salem Hub, Tamil Nadu',
      })
    } catch {
      // Mock demonstration tracking
      setOrderStatus({
        orderNumber: orderNumber.trim(),
        status: 'In Transit',
        estimatedDelivery: 'Within 48 Hours',
        location: 'Salem Hub, Tamil Nadu',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-brand-border/60 p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
            <Truck size={32} />
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark mb-2">
            Track Your Order
          </h1>
          <p className="text-brand-muted text-sm max-w-md mx-auto mb-8">
            Enter your order reference number (e.g. SJ628192) found on your confirmation SMS or email.
          </p>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
            <div className="relative flex-1">
              <Package size={18} className="absolute left-3.5 top-3.5 text-brand-muted" />
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Order Number (e.g. SJ104829)"
                className="w-full pl-10 pr-4 py-3 text-sm border border-brand-border rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Search size={16} />
              <span>{loading ? 'Searching...' : 'Track'}</span>
            </button>
          </form>

          {/* Tracking result */}
          {orderStatus && (
            <div className="mt-8 border-t border-brand-border/60 pt-8 text-left space-y-6">
              <div className="bg-primary-light/50 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-xs text-brand-muted uppercase tracking-wider block">
                    Order Ref
                  </span>
                  <span className="font-heading text-lg font-bold text-brand-dark">
                    {orderStatus.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-muted uppercase tracking-wider block">
                    Status
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {orderStatus.status}
                  </span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center pt-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs mb-1">
                    ✓
                  </div>
                  <span className="text-[11px] font-medium text-brand-dark">Placed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs mb-1">
                    ✓
                  </div>
                  <span className="text-[11px] font-medium text-brand-dark">Confirmed</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs mb-1">
                    ✓
                  </div>
                  <span className="text-[11px] font-medium text-brand-dark">Dispatched</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs mb-1">
                    4
                  </div>
                  <span className="text-[11px] font-medium text-brand-dark">Delivered</span>
                </div>
              </div>

              <p className="text-xs text-center text-brand-muted pt-2">
                Estimated Delivery: <strong>{orderStatus.estimatedDelivery}</strong> via DTDC / Speed Post.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
