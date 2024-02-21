export const dynamic = "force-dynamic";

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SEC);

const customerID = "cus_Pb4WaGDMM0Su38"

export async function GET(request) {
  const customerSession = await stripe.customerSessions.create({
    customer: customerID,
    components: {
      payment_element: {
        enabled: true,
        features: {
          payment_method_remove: 'disabled',
          payment_method_save: 'enabled',
          payment_method_set_as_default: 'disabled',
          payment_method_update: 'disabled'
        }
      }
    }
  });
  return Response.json({ 
    customer_id: customerID,
    customer_session_client_secret: customerSession.client_secret 
  });
}
