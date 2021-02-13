import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import Spinner from "../components/utilities/Spin";
import { shorter } from "../utils";
import RateUsd from "./RateUsd";

const Balance = (props) => {
  const { balance, contractAddress, etherScan } = props;
  const { account } = useWeb3React();
  const [usdValue, setUsdValue] = useState();
  const url = `${etherScan}/address/${contractAddress}`;

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
        <div className="d-flex flex-row justify-content-between">
          <h5 className="card-title">Balance Address</h5>
          <h6>
            current:
            <span class="ml-2 badge  badge-primary ">{shorter(account)}</span>
          </h6>
        </div>
        <ul className="my-9 list-group list-group-horizontal">
          <li className="col-8 list-group-item ">
            <a className="stretched-link" href={url} target="_blank">
              {shorter(contractAddress)}
            </a>
          </li>
          <li className="col-2 list-group-item d-flex justify-content-end">
            {renderBalance()}
          </li>
          <li className="col-2 list-group-item d-flex justify-content-end">
            <RateUsd ethers={balance} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Balance;
