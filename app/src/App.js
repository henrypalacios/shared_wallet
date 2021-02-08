import React, { useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { SWRConfig } from "swr";

import Header from "./components/Header";
import Home from "./containers/Home";
import WALLETABI from "./contract/SharedWallet.abi.json";
import { injectedConnector } from "./utils/connectors";
import { fetcher } from "./utils/fetcher";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;

  return library;
}

const MainLayout = (props) => {
  const { children } = props;

  return (
    <main class="container">
      <div class="d-grid gap-4">{children}</div>
    </main>
  );
};

const ProviderConfig = () => {
  const { chainId, active, activate, library, error } = useWeb3React();

  useEffect(() => {
    if (!active) {
      activate(injectedConnector);
    }
  }, [active, activate, library]);

  let html = (
    <button class="btn btn-primary" type="button" disabled>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );

  if (error) {
    alert("There has been an error loading metamask");
  } else if (active) {
    html = (
      <SWRConfig value={{ fetcher: fetcher(library, WALLETABI.abi) }}>
        <Home chainId={chainId} />
      </SWRConfig>
    );
  }

  return html;
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header />
      <MainLayout>
        <ProviderConfig />
      </MainLayout>
    </Web3ReactProvider>
  );
};

export default App;
