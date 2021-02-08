import React from "react";

import Spinner from "../components/utilities/Spin";
import { shorter } from "../utils";

const Balance = (props) => {
  const { balance, address } = props;

  const renderBalance = () => {
    let html = <Spinner />;

    if (balance) {
      html = <p>{balance} ETH</p>;
    }

    return html;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Balance</h5>
        <ul className="my-9 list-group list-group-horizontal">
          <li className="col-8 list-group-item ">{shorter(address)}</li>
          <li className="col-2 list-group-item d-flex justify-content-end">
            {renderBalance()}
          </li>
          <li className="col-2 list-group-item d-flex justify-content-end">
            {/* TODO */} ~ ...USD
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Balance;
