import { useWalletSelector } from "@/contexts/wallet-selector-context";
import { ConnectedWalletAccount, Connection, Contract, utils, Near, WalletConnection, keyStores, providers, InMemorySigner } from "near-api-js";
import { useEffect, useState } from "react";
import { getConfig } from "src/config/near";
import { WALLET } from "src/near/wallet";

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

export const useNear = () => {
  const { selector, accountId, accounts } = useWalletSelector();
  const [factoryContract, setFactoryContract] = useState(null);

  useEffect(() => {
    if (accountId) {
      initContracts();
    }
  }, [accountId]);

  const getAccount = () => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore()
    const near = new Near({
      networkId: WALLET.NETWORK_ID,
      keyStore: keyStore,
      nodeUrl: WALLET.NODE_URL,
      walletUrl: WALLET.WALLET_URL,
    });

    const walletConnection = new WalletConnection(near, "MoonBase");
    const provider = new providers.JsonRpcProvider(nearConfig.nodeUrl);
    const signer = new InMemorySigner(keyStore);
    const connection = new Connection(nearConfig.nodeUrl, provider, signer);
    const account = new ConnectedWalletAccount(walletConnection, connection, accountId);
    return account;
  }

  const initContracts = async () => {
    if (!accountId) return;
    const account = getAccount();
    const contract = await new Contract(
      account,
      nearConfig.contractName,
      {
        viewMethods: ['get_dao_list', 'get_number_daos', 'get_daos'],
        changeMethods: ['create']
      }
    );

    setFactoryContract(contract);
  }

  const getDaoContract = (addr) => {
    if (!accountId) return;
    const account = getAccount();
    const daoContract = new Contract(account, addr, {
      viewMethods: [
        'get_config',
        'get_policy',
        'get_staking_contract',
        'get_available_amount',
        'delegation_total_supply',
        'get_proposals',
        'get_last_proposal_id',
        'get_proposal',
        'get_bounty',
        'get_bounties',
        'get_last_bounty_id',
        'get_bounty_claims',
        'get_bounty_number_of_claims',
        'delegation_balance_of',
        'has_blob'
      ],
      changeMethods: ['add_proposal', 'act_proposal']
    });
    return daoContract;
  }

  return { factoryContract, getDaoContract };
}