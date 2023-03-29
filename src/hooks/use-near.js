import { useWalletSelector } from "@/contexts/wallet-selector-context";
import { Contract } from "near-api-js";
import { useEffect, useState } from "react";
import { getConfig } from "src/config/near";

const nearConfig = getConfig(process.env.NODE_ENV || 'development');

export const useNear = () => {
  const { accountId, accounts } = useWalletSelector();
  const [factoryContract, setFactoryContract] = useState(null);

  useEffect(() => {
    if (accountId) {
      initContracts();
    }
  }, [accountId]);

  const initContracts = async () => {
    if (!accountId) return;

    console.log(accounts[0])

    const contract = await new Contract(
      accounts[0],
      nearConfig.contractName,
      {
        viewMethods: ['get_dao_list', 'get_number_daos', 'get_daos'],
        changeMethods: ['create']
      }
    );

    setFactoryContract(contract);
  }

  const getDaoContract = (addr) => {
    if (accountId) return;

    const daoContract = new Contract(accounts[0], addr, {
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