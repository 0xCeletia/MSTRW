import { scroll } from "consts/chains";
import { MASTERWAVE_CONTRACT_OP } from "consts/contracts";

export const DOMAIN = {
  name: "masterwave",
  version: "1",
  verifyingContract: MASTERWAVE_CONTRACT_OP,
} as const;

// The named list of all type definitions
export const TYPES = {
  User: [
    { name: "address", type: "address" },
    { name: "message", type: "string" },
  ],
} as const;

export const getSignatureValue = (address: `0x${string}`, message: string) => {
  return {
    address,
    message,
  };
};
