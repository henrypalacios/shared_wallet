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
  const { account, library } = useWeb3React();
  const contractAddress = CONTRACT_BY_NETWORK[chainId].address;
  const contract = new Contract(
    contractAddress,
    WALLETABI.abi,
    library.getSigner()
  );
  const { data: balance, mutate } = useSWR([
    "getBalance",
    contractAddress,
    "latest",
  ]);

  console.log(balance);

  return (
    <MainLayout>
      <Balance
        balance={
          null ? !balance : parseFloat(formatUnits(balance)).toPrecision(4)
        }
        address={contractAddress}
      />
      <Accounts />
    </MainLayout>
  );
};

export default Home;
