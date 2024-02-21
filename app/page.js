"use client";

import CheckoutSection from "../components/checkout_section";

function Home() {
  return (
    <>
      <div className="Summary-row flex justify-between">
        <h2 className="Heading">Order summary</h2>
      </div>
      <div className="Summary-row flex justify-between">
        <h3>Cash</h3>
        <u>Change</u>
      </div>
      <div className="Summary-row flex justify-between">
        <span>£157,350</span>
      </div>
      <div className="Summary-row flex justify-between">
        <span>Taxes and fees - £1,270</span>
      </div>
      <div className="Summary-total flex justify-between">
      </div>
      <div className="Summary-row flex justify-between">
        <h3>Delivered to your home</h3>
        <u>Change</u>
      </div>
      <div className="Summary-row flex justify-between">
        <span>Fri May 10, 2024 | 123, Holburn Street, AB10 6DN</span>
      </div>
      <div className="Summary-total flex justify-between">
        <h3>Due today</h3>
        <span><bold>£1,270</bold></span>
      </div>
      <div className="Summary-row flex justify-between">
        <span>Refundable reservation Fee</span>
      </div>
      <CheckoutSection />
    </>
  );
}

export default Home;
