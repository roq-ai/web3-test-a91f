import axios from 'axios';
import queryString from 'query-string';
import { CollateralInterface, CollateralGetQueryInterface } from 'interfaces/collateral';
import { GetQueryInterface } from '../../interfaces';

export const getCollaterals = async (query?: CollateralGetQueryInterface) => {
  const response = await axios.get(`/api/collaterals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCollateral = async (collateral: CollateralInterface) => {
  const response = await axios.post('/api/collaterals', collateral);
  return response.data;
};

export const updateCollateralById = async (id: string, collateral: CollateralInterface) => {
  const response = await axios.put(`/api/collaterals/${id}`, collateral);
  return response.data;
};

export const getCollateralById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/collaterals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCollateralById = async (id: string) => {
  const response = await axios.delete(`/api/collaterals/${id}`);
  return response.data;
};
