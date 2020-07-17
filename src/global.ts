import { ethers } from 'ethers';
import { NrtManager } from './ethereum/typechain/NrtManager';
import { TimeAllyManager } from './ethereum/typechain/TimeAllyManager';
import { ValidatorManager } from './ethereum/typechain/ValidatorManager';

declare global {
  interface Window {
    provider: ethers.providers.JsonRpcProvider;
    wallet: ethers.Wallet;
    nrtManagerInstance: NrtManager;
    timeallyManager: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
  }
}
