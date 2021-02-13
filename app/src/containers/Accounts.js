import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";

import Spinner from "../components/utilities/Spin";
import RateUsd from "./RateUsd";
import WALLETABI from "../contract/SharedWallet.abi.json";
import { shorter } from "../utils";

const TableAccounts = (props) => {
  const { items } = props;

  console.log("items:", items);
  return (
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="col-7">
            Address
          </th>
          <th scope="col">Balance</th>
          <th scope="col">USD Value</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td class="col-7">{item.address}</td>
            <td>{item.balance} ETH</td>
            <td>{item.balanceUsd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const Accounts = (props) => {
  const { contractAddress } = props;
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account, library } = useWeb3React();

  useEffect(() => {
    const contract = new Contract(
      contractAddress,
      WALLETABI.abi,
      library.getSigner()
    );

    console.log("Contract:", contract.owner());
    contract.getAllowances().then((result) => {
      setLoading(true);
      const data = dataProcessing(result);
      setAccounts(data);
    });
  }, []);

  const dataProcessing = (data) => {
    const [keys, balances] = data;
    let wallets = [];

    keys.map((current, index) => {
      const balance = parseFloat(formatUnits(balances[index])).toPrecision(4);
      wallets.push({
        id: index + 1,
        address: shorter(current),
        balance,
        balanceUsd: <RateUsd ethers={balance} />,
      });
    });

    return wallets;
  };

  return (
    <div class="card m-t2">
      <div class="card-body">
        <h5 className="card-title">Accounts</h5>
        <div class="col py-9">{<TableAccounts items={accounts} />}</div>
      </div>
    </div>
  );
};

export default Accounts;
