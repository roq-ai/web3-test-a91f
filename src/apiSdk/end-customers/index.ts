import axios from 'axios';
import queryString from 'query-string';
import { EndCustomerInterface, EndCustomerGetQueryInterface } from 'interfaces/end-customer';
import { GetQueryInterface } from '../../interfaces';

export const getEndCustomers = async (query?: EndCustomerGetQueryInterface) => {
  const response = await axios.get(`/api/end-customers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEndCustomer = async (endCustomer: EndCustomerInterface) => {
  const response = await axios.post('/api/end-customers', endCustomer);
  return response.data;
};

export const updateEndCustomerById = async (id: string, endCustomer: EndCustomerInterface) => {
  const response = await axios.put(`/api/end-customers/${id}`, endCustomer);
  return response.data;
};

export const getEndCustomerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/end-customers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEndCustomerById = async (id: string) => {
  const response = await axios.delete(`/api/end-customers/${id}`);
  return response.data;
};
