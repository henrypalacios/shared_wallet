import React from "react";

const Header = () => {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom shadow-sm">
      <p className="h5 my-0 me-md-auto fw-normal text-white">Shared Wallet</p>
      <nav className="my-2 my-md-0 me-md-3">
        <a className="p-2 text-white" href="#">
          Wallet
        </a>
      </nav>
    </header>
  );
};

export default Header;
