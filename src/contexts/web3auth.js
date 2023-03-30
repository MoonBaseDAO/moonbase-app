import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
export const useAuth = () => useContext(AuthContext);
// Initialize Web3AuthNoModal with the appropriate settings
const web3Auth = new Web3AuthNoModal({
    providers: WALLET_ADAPTERS.map((adapter) => new adapter()),
    chainNamespace: CHAIN_NAMESPACES.ETHEREUM,
    pollInterval: 12000,
  });
  
  // Export the instance of Web3AuthNoModal
  export default web3Auth;
  
