import * as nearApi from 'near-api-js';
import { Account } from "near-api-js";
import { useEffect, useState } from "react";
import { wallet } from "src/near/near";
import { nearConfig, yoktoNear } from "src/utils/utility";

const provider = new nearApi.providers.JsonRpcProvider(nearConfig.nodeUrl);
const connection = new nearApi.Connection(nearConfig.nodeUrl, provider, {});

export const useDaoState = (addr) => {
  const [funds, setFunds] = useState('0');

  const init = async () => {
    try {
      const state = await new nearApi.Account(connection, addr).state();
      const amountYokto = state.amount;
      setFunds((amountYokto / yoktoNear).toFixed(2));
    } catch (error) {
      console.log(error);
      setFunds('0');
    }
  }

  useEffect(() => {
    init();
  }, [addr])

  return [funds];
}