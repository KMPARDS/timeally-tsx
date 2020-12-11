import { create } from 'apisauce';
import config from '../config';

const api = create({
  baseURL: config.baseUrl,
});

export const withdrawPetPrepaidIncentives = async (walletAddress: string) =>
  await api.post(`/withdraw-request/make-request`,{ requester: walletAddress, typeOfWithdraw: 'PET_PREPAID_INCENTIVE' });
