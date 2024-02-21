import "../global.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="Checkout">
          <header className="Header">
            <div className="container">
              <img
                className="rr-logo"
                src="https://cdn.glitch.global/2ca345a9-5ec2-43ea-a0c2-ad8c9208e9b1/Range_Rover.svg?v=1708424819219"
              />
            </div>
          </header>
    <div className="layout">
          <div className="image-wrapper">
            <div className="canvas-image" style={{ overflow: "hidden" }}>
              <img
                src="https://cdn.glitch.global/2ca345a9-5ec2-43ea-a0c2-ad8c9208e9b1/2024_Range_Rover-7-removebg-preview.png?v=1708428044709"
              ></img>
            </div>
          </div>
          <div className="Summary">
            <div className="container">
              <div className="OrderSummary">{children}</div>
            </div>
          </div>
</div>
        </div>
      </body>
    </html>
  );
}
