import { Contract } from "@ethersproject/contracts";
import { isAddress } from "@ethersproject/address";

export const fetcher = (library, abi) => (...args) => {
  const [arg1, arg2, ...params] = args;
  // it's a contract
  if (isAddress(arg1)) {
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library.getSigner());

    console.log(method, params);
    return contract[method](...params);
  }
  // it's a eth call
  const method = arg1;
  console.log(method, params);

  return library[method](arg2, ...params);
};
