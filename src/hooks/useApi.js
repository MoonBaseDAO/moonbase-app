import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://noco-db-production-30af.up.railway.app/api/";


const moonbaseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'xc-auth': 'b_tx5wHo3gOmDdwm9UTKh-ny8TvVsDNLBDlqKLqc',
    'xc-token': 'b_tx5wHo3gOmDdwm9UTKh-ny8TvVsDNLBDlqKLqc'
  }
});

export const useGetMessages = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getAxios = useCallback(async () => {
    setLoading(true);
    try {
  const result = await moonbaseAxios.get('/v1/db/data/noco/p_srgdu1r1f0optj/Messages/views/Messages', { offset: '0', limit: '25', where: '' });
      setLoading(false);
      setData(result.data);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getAxios();
  }, []);
  return { loading, data, getAxios };
}

export const usePostMessage = () => {
  const postAxios = useCallback(async (data) => {
    try {
      await moonbaseAxios.post('v1/db/data/noco/p_srgdu1r1f0optj/Messages/views/Messages', data);
    } catch (err) {
      console.log("err", err);
    }
  }, []);
  return { postAxios };
}
