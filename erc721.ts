import { uint256ToBN } from "starknet/dist/utils/uint256";

import { callContract } from "./call";

import { StarkModuleConfig } from "./types";

export const name = "ERC-721";
const { Contract }= require('./config');



export const shouldHaveRole = async (
  starknetWalletAddress: string,
  starknetNetwork: "mainnet" | "goerli",
): Promise<boolean> => {
  const result = await callContract({
    starknetNetwork,
    contractAddress: Contract,
    entrypoint: "balanceOf",
    calldata: [starknetWalletAddress],
  });
  const balance = uint256ToBN({ low: result[0], high: result[1] });
  if (balance >= 1) {
    return true;
  }
  return false;
};

shouldHaveRole("0x005Cc69A03EA5F3E7Fe06767F62B16AAD764Ba76a4f4f27ef94EB96CCA425774","mainnet").then(e=> console.log(""))