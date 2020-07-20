import { ethers } from 'ethers';
import { NrtManager } from './ethereum/typechain/NrtManager';
import { TimeAllyManager } from './ethereum/typechain/TimeAllyManager';
import { ValidatorManager } from './ethereum/typechain/ValidatorManager';
import { CustomWallet } from './ethereum/custom-wallet';

declare global {
  interface Window {
    provider: ethers.providers.JsonRpcProvider;
    wallet: CustomWallet;
    nrtManagerInstance: NrtManager;
    timeallyManager: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
  }
}
