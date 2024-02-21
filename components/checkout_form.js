"use client";

import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  ExpressCheckoutElement,
  linkAuthenticationElement
} from "@stripe/react-stripe-js";


const expressCheckoutOptions = {
  buttonTheme: {
    applePay: 'black',
    googlePay: 'black'
  },
  layout: {
    maxColumns: 1
  }
};

const paymentElementOptions = {
  layout: {
    type: 'accordion',
    spacedAccordionItems: true
  },
  defaultValues: {
    billingDetails: {
      name: "John Doe",
      email: "ejanicas@stripe.com",
      address: {
        line1: "Holburn Street",
        line2: "123",
        country: "GB",
        postal_code: "AB10 6DN"
      }
    }
  },
  savePaymentMethod: {
    messages: {
      // Optionally override the descriptor text.
      saveLabel: "Save for future payments",
      // Optionally override the warning shown prior to removing a payment method.
      removeSavedDialogBody: `This payment method will be removed permanently. Are you sure you want to continue?`
    }
  }
};


const CheckoutForm = ({customer_id}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    try {
      event.preventDefault();
    } catch {
      
    }
    

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
      
      // Create the ConfirmationToken using the details collected by the Payment Element
      const {CTerror, confirmationToken} = await stripe.createConfirmationToken({
        elements,
      });
      
      if (CTerror) {
        setErrorMessage(CTerror.message);
        return;
      }
      
      console.log(confirmationToken);
      
      // Create the payment intent
      const req = await fetch("/api/create_payment_intent", {
        method: "POST",
        body: JSON.stringify({
          amount: 150000,
          currency: "gbp",
          customer_id: customer_id
        }),
      });
      const {client_secret} = await req.json();
      
      // Handle any next actions, e.g. 3DS or a bank redirect and confirm the payment
      const {error} = await stripe.confirmPayment({
      clientSecret: client_secret,
      confirmParams: {
        confirmation_token: confirmationToken.id,
        return_url: window.location + 'complete',
      },
    });
      
      if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer.
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit}>
      <section>
        <div className="Summary-row flex justify-between">
          <h2 className="Heading">Payment</h2>
        </div>
        <ExpressCheckoutElement options={expressCheckoutOptions} onConfirm={handleSubmit} />
        <PaymentElement options={paymentElementOptions} />
        <div className="error-message" role="alert"></div>
        <div className = "billing-address">
          <input type="radio" name="address" id="saved-billing-address" value="saved" />
          <label for="saved-billing-address">
            Saved address
            <p>123, Holburn Street, AB10 6DN</p>
          </label>
          <input type="radio" name="address" id="new-billing-address" value="new" />
          <label for="new-billing-address">
            Use a different billing address
          </label>
        </div>
        <button type='submit' id="submit-btn" className="Button" disabled={!stripe}>
          <span className="Button-loader">PLACE ORDER</span>
        </button>
      </section>
    </form>
  );
};

export default CheckoutForm;
