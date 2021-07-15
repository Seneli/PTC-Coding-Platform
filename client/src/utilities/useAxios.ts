import { useState, useEffect } from 'react';

import axios from 'axios';

export interface Props {
  type: 'get' | 'put' | 'delete' | 'post' | string;
  endpoint: string;
  body?: object;
}

export const useAxios = ({ type, endpoint, body }: Props) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState<any>();

  useEffect(() => {
    try {
      setData(null);
      setLoading(true);
      setErrors({});
      switch (type) {
        case 'get':
          getAxios(endpoint);
          break;
        case 'put':
          putAxios(endpoint, body);
          break;
        case 'post':
          postAxios(endpoint, body);
          break;
        case 'delete':
          deleteAxios(endpoint);
          break;
        default:
          getAxios(endpoint);
      }
    } catch (error) {
      console.log('useAxios error', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, endpoint, type]);

  async function getAxios(endpoint: string) {
    const res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/${endpoint}`
    );
    setData(res.data);
  }

  async function putAxios(endpoint: string, body?: object) {
    const res = await axios.put(
      `${process.env.REACT_APP_ENDPOINT}/${endpoint}`,
      body
    );
    setData(res.data);
  }

  async function postAxios(endpoint: string, body?: object) {
    const res = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/${endpoint}`,
      body
    );
    setData(res.data);
  }

  async function deleteAxios(endpoint: string) {
    const res = await axios.delete(
      `${process.env.REACT_APP_ENDPOINT}/${endpoint}`
    );
    setData(res.data);
  }

  return { loading, errors, data };
};
