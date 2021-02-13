import { InjectedConnector } from "@web3-react/injected-connector";

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [Networks.Rinkeby],
});

export const CONTRACT_BY_NETWORK = {
  [Networks.Rinkeby]: {
    address: "0x64c75b092e34200435384c186bd49e36e743c91f",
    etherScan: "https://rinkeby.etherscan.io/",
  },
};
