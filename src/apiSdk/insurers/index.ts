import axios from 'axios';
import queryString from 'query-string';
import { InsurerInterface, InsurerGetQueryInterface } from 'interfaces/insurer';
import { GetQueryInterface } from '../../interfaces';

export const getInsurers = async (query?: InsurerGetQueryInterface) => {
  const response = await axios.get(`/api/insurers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInsurer = async (insurer: InsurerInterface) => {
  const response = await axios.post('/api/insurers', insurer);
  return response.data;
};

export const updateInsurerById = async (id: string, insurer: InsurerInterface) => {
  const response = await axios.put(`/api/insurers/${id}`, insurer);
  return response.data;
};

export const getInsurerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/insurers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInsurerById = async (id: string) => {
  const response = await axios.delete(`/api/insurers/${id}`);
  return response.data;
};
