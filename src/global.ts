import { ethers } from 'ethers';
import { NrtManager } from './ethereum/typechain/NrtManager';
import { TimeAllyManager } from './ethereum/typechain/TimeAllyManager';
import { ValidatorManager } from './ethereum/typechain/ValidatorManager';
import { PrepaidEs } from './ethereum/typechain/PrepaidEs';
import { CustomWallet } from './ethereum/custom-wallet';

declare global {
  interface Window {
    provider: ethers.providers.JsonRpcProvider;
    wallet: CustomWallet;
    nrtManagerInstance: NrtManager;
    timeallyManagerInstance: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
    prepaidEsInstance: PrepaidEs;
  }
}
