import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";

import Balance from "./Balance";
import Accounts from "./Accounts";
import { CONTRACT_BY_NETWORK } from "../utils/connectors";
import WALLETABI from "../contract/SharedWallet.abi.json";

const MainLayout = (props) => {
  const { children } = props;

  return (
    <main class="container">
      <div class="d-grid gap-4">{children}</div>
    </main>
  );
};

const Home = ({ chainId }) => {
  const contractAddress = CONTRACT_BY_NETWORK[chainId].address;
  const { data: balance, mutate } = useSWR([
    "getBalance",
    contractAddress,
    "latest",
  ]);

  const formatBalance = (balance) => {
    let result = null;

    if (balance) {
      result = parseFloat(formatUnits(balance)).toPrecision(3);
    }
    return result;
  };

  return (
    <MainLayout>
      <Balance
        balance={formatBalance(balance)}
        contractAddress={contractAddress}
        chainId={chainId}
        etherScan={CONTRACT_BY_NETWORK[chainId].etherScan}
      />
      <Accounts contractAddress={contractAddress} />
    </MainLayout>
  );
};

export default Home;
