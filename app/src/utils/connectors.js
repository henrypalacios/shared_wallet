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
    address: "0xEF4F6D943f1Ce766503f2763c89375E102A05780",
  },
};
