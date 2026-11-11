const { supabase, supabaseAdmin } = require('../config/supabase');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SJ${timestamp}${random}`;
}

// ─── createOrder ──────────────────────────────────────────────────────────────
/**
 * POST /api/orders
 * Body: { billingInfo, items: [{ product_id, variation_id?, name, price, quantity, image_url }],
 *         paymentMethod, notes, shippingInfo? }
 */
async function createOrder(req, res, next) {
  try {
    const {
      billingInfo,
      shippingInfo,
      sameAsBilling = true,
      items = [],
      paymentMethod = 'cod',
      notes = '',
    } = req.body;

    // ── Validate required fields ──────────────────────────────────────────────
    if (!billingInfo) {
      return res.status(400).json({ success: false, error: 'Billing information is required' });
    }

    const requiredBilling = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of requiredBilling) {
      if (!billingInfo[field]) {
        return res.status(400).json({
          success: false,
          error: `Billing field '${field}' is required`,
        });
      }
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Order must contain at least one item' });
    }

    // ── Calculate totals ─────────────────────────────────────────────────────
    const subtotal = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity, 10),
      0
    );
    const shippingAmount = subtotal > 999 ? 0 : 50;
    const totalAmount = subtotal + shippingAmount;

    const orderNumber = generateOrderNumber();

    // ── Shipping address ──────────────────────────────────────────────────────
    const shipping = sameAsBilling ? billingInfo : shippingInfo || billingInfo;

    // ── Insert order ──────────────────────────────────────────────────────────
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: req.user?.id || null,
        status: 'pending',
        subtotal: subtotal.toFixed(2),
        shipping_amount: shippingAmount.toFixed(2),
        discount_amount: '0.00',
        total_amount: totalAmount.toFixed(2),
        billing_name: billingInfo.name,
        billing_email: billingInfo.email || null,
        billing_phone: billingInfo.phone,
        billing_address: billingInfo.address,
        billing_city: billingInfo.city,
        billing_state: billingInfo.state,
        billing_pincode: billingInfo.pincode,
        shipping_name: shipping.name,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_pincode: shipping.pincode,
        same_as_billing: sameAsBilling,
        payment_method: paymentMethod,
        payment_status: 'pending',
        notes,
      })
      .select('id, order_number, total_amount, status')
      .single();

    if (orderError) throw orderError;

    // ── Insert order items ────────────────────────────────────────────────────
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      variation_id: item.variation_id || null,
      product_name: item.name,
      product_image: item.image_url || null,
      price: parseFloat(item.price).toFixed(2),
      quantity: parseInt(item.quantity, 10),
      subtotal: (parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2),
      color: item.color || null,
      size: item.size || null,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) throw itemsError;

    res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.order_number,
        total: order.total_amount,
        status: order.status,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ─── getOrderById ─────────────────────────────────────────────────────────────
/**
 * GET /api/orders/:id
 */
async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          id, product_name, product_image, price, quantity, subtotal, color, size,
          products ( id, slug )
        )
      `
      )
      .eq('id', id)
      .single();

    if (error || !order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // If the user is logged in, verify the order belongs to them
    if (req.user && order.user_id && order.user_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

// ─── getUserOrders ────────────────────────────────────────────────────────────
/**
 * GET /api/orders/my-orders   (requires auth)
 */
async function getUserOrders(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        id, order_number, status, total_amount, payment_status,
        created_at,
        order_items ( id, product_name, product_image, quantity, price )
      `
      )
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ─── trackOrder ───────────────────────────────────────────────────────────────
/**
 * GET /api/orders/track/:orderNumber   (public, no auth required)
 */
async function trackOrder(req, res, next) {
  try {
    const { orderNumber } = req.params;

    const { data: order, error } = await supabase
      .from('orders')
      .select(
        `
        id, order_number, status, payment_status, tracking_number,
        created_at, updated_at,
        order_items ( product_name, product_image, quantity, price )
      `
      )
      .eq('order_number', orderNumber)
      .single();

    if (error || !order) {
      return res.status(404).json({ success: false, error: 'Order not found. Please check your order number.' });
    }

    // Return basic tracking info without sensitive billing details
    res.json({
      success: true,
      data: {
        orderNumber: order.order_number,
        status: order.status,
        paymentStatus: order.payment_status,
        trackingNumber: order.tracking_number,
        orderedAt: order.created_at,
        updatedAt: order.updated_at,
        items: order.order_items,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder, getOrderById, getUserOrders, trackOrder };
