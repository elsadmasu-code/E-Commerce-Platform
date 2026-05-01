import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

// @desc    Create Stripe payment intent
// @route   POST /api/payment/create-payment-intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert to cents
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});
