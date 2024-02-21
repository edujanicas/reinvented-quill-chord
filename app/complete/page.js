"use client";


function Complete() {
  return (
    <div style={{height: '100vh', paddingTop: '40vh'}}>
      <span>Thankyou for your order</span>
    <button className="Button" onClick={() => window.location = window.location.origin}>
          <span className="Button-loader">BACK</span>
        </button>
    </div>
  );
}

export default Complete;
