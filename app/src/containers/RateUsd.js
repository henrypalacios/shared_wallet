import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Spinner from "../components/utilities/Spin";
import EtherPriceService from "../services/ether_price";

const RateUsd = (props) => {
  const { ethers } = props;
  const [usdValue, setUsdValue] = useState(0);

  useEffect(() => {
    setUsdValue(null);
    (async () => {
      const service = await loadService();
      setUsdValue(service.toUsd(ethers));
    })();
  }, [ethers]);

  const loadService = async () => {
    return await EtherPriceService.build();
  };

  return usdValue ? <p>{usdValue} USD</p> : <Spinner />;
};

RateUsd.defaultProps = {
  ether: 0,
};

RateUsd.prototype = {
  ether: PropTypes.number,
  usdValue: PropTypes.number,
};

export default RateUsd;
