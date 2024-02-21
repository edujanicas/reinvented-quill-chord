export const dynamic = "force-dynamic";

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SEC);

export async function POST(request) {
  const { amount, currency, customer_id } =
    await request.json();
  
  const intent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer_id,
    automatic_payment_methods: {enabled: true},
  });
  return Response.json({client_secret: intent.client_secret});
}
