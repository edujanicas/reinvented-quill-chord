"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./checkout_form";

const appearance = {
  theme: "flat",
  variables: {
    fontFamily: "Land Rover",
    fontWeightMedium: "600",
    colorPrimary: "#000000",
    borderRadius: '4px',
    accordionItemSpacing: '10px',
  },
};

const fonts = [
  {
    family: "Land Rover",
    src: "url(https://cdn.glitch.global/4e8e738c-5d83-4620-9930-4bf90353d1d6/LandRoverOT4-Medium.ttf?v=1700732835484)",
    weight: "400",
  },
  {
    family: "Land Rover",
    src: "url(https://cdn.glitch.global/4e8e738c-5d83-4620-9930-4bf90353d1d6/LandRoverOT4-Medium.ttf?v=1700732835484)",
    weight: "600",
  },
  {
    family: "Land Rover",
    src: "url(https://cdn.glitch.global/4e8e738c-5d83-4620-9930-4bf90353d1d6/LandRoverOT4-Medium.ttf?v=1700732835484)",
    weight: "bold",
  },
];

const get_customer_session = async () => {
  const req = await fetch("/api/create_customer_session");
  const data = await req.json();
  return data
};


const CheckoutSection = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB, {
    betas: ["elements_saved_payment_methods_beta_1"],
  });
  const [customerSession, setCustomerSession] = React.useState(null);
  
  React.useEffect(() => {
    get_customer_session().then(session => setCustomerSession(session))
  }, [])
  
  if (!customerSession) {
    return <></>
  }
  
  const options = {
    mode: "payment",
    currency: "gbp",
    amount: 150000,
    customerSessionClientSecret: customerSession.customer_session_client_secret,
    paymentMethodCreation: "manual",
    appearance: appearance,
    fonts: fonts,
    loader: 'auto'
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm customer_id={customerSession.customer_id} />
    </Elements>
  );
};

export default CheckoutSection;
