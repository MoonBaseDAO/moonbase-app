import { getConfig } from "src/config/near";
import { initSDK, signIn, signOut, wallet } from "src/near/near";
import { Contract } from "near-api-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

export const useNear = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [factoryContract, setFactoryContract] = useState(null);
  const [daoContract, setDaoContract] = useState(null);

  useEffect(() => {
    initSDK();
    if (wallet?.getAccountId()) {
      setConnected(true);
      setAccountId(wallet?.getAccountId());
      initContracts();
    }
  }, []);

  const initContracts = async () => {
    if (!wallet?.getAccountId) return;

    const contract = await new Contract(
      wallet?.account(),
      nearConfig.contractName,
      {
        viewMethods: ['get_dao_list', 'get_number_daos', 'get_daos'],
        changeMethods: ['create']
      }
    );

    setFactoryContract(contract);
  }

  const getDaoContract = (addr) => {
    if (!wallet?.getAccountId) return;

    const daoContract = new Contract(wallet?.account(), addr, {
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

  const connectWithNear = async () => {
    if (isConnected) {
      await signOut();
      setConnected(false);
      setAccountId(null);
      router.replace('/');
    }
    else {
      await signIn();
      setPending(true);
    }
  }

  const handleConnect = (key) => {
    const keyString = key;
    if (keyString == "Near")
      connectWithNear();
  }

  return { factoryContract, isConnected, isPending, accountId, handleConnect, getDaoContract };
}