import { WALLET } from "./wallet";
import { Near, WalletConnection, keyStores, utils } from "near-api-js";

let near = null;
export let wallet = null;

export const initSDK = async () => {
  if(near != null) return;
  near = new Near({
    networkId: WALLET.NETWORK_ID,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: WALLET.NODE_URL,
    walletUrl: WALLET.WALLET_URL,
  });

  wallet = new WalletConnection(near, "MoonBase");
}

export const signIn = async () => {
  await wallet?.requestSignIn({ contractId: WALLET.CONTRACT_ID });
};

export const signOut = () => {
  wallet?.signOut();
}

export const view = async (name, args = {}) => {
  const result = await wallet?.account().viewFunction(WALLET.CONTRACT_ID, name, args);
  return result;
};

export const call = async (name, args = {}, deposit = "0") => {
  const result = await wallet?.account().functionCall({
    contractId: WALLET.CONTRACT_ID,
    methodName: name,
    args: args,
    attachedDeposit: utils.format.parseNearAmount(deposit),
  });
  return result;
}