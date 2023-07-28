import { uint256ToBN } from "starknet/dist/utils/uint256";

import { callContract } from "./call";

import { StarkModuleConfig, StarkModuleField } from "./types";

export const name = "ERC-721";

export const fields: StarkModuleField[] = [
  {
    id: "contractAddress",
    question: "What's the ERC-721 contract address?",
  },
];

export const shouldHaveRole = async (
  starknetWalletAddress: string,
  starknetNetwork: "mainnet" | "goerli",
  starkModuleConfig: StarkModuleConfig
): Promise<boolean> => {
  const result = await callContract({
    starknetNetwork,
    contractAddress: starkModuleConfig.contractAddress,
    entrypoint: "balanceOf",
    calldata: [starknetWalletAddress],
  });
  const balance = uint256ToBN({ low: result[0], high: result[1] });
  if (balance >= 1) {
    return true;
  }
  return false;
};