import React from "react";

function App() {
  return (
    <nav className="header" data-testid="header">
      <img
        className="header__image"
        src={require("../images/profit-growth.png").default}
        alt="profit"
      />
      <h3 className="header__title">Finance Sockets</h3>
    </nav>
  );
}

export default App;
