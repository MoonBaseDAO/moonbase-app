import ethProvider from "./ethProvider";

export const getWalletProvider = (chain, provider, uiConsole) => {
  return ethProvider(provider, uiConsole);
};
