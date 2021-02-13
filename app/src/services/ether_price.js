let instance;

const loadUsdPrice = async () => {
  let result = null;
  const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";

  try {
    const query = await fetch(url);
    result = await query.json();
  } catch {
    console.error("Error to request min-api.cryptocompare.com");
  } finally {
    return result;
  }
};

class EtherPriceService {
  constructor(ratePrice) {
    if (typeof ratePrice === "undefined") {
      throw new Error("Cannot be called directcly");
    }

    this.rates = ratePrice;
  }

  static async build() {
    if (!instance) {
      var ratePrice = await loadUsdPrice();
      instance = new EtherPriceService(ratePrice);
    }

    return instance;
  }

  toUsd(etherQty) {
    const result = etherQty * this.rates.USD;

    return result.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}

export default EtherPriceService;
