import { ethers } from 'ethers';
import { NrtManager } from './ethereum/typechain/NrtManager';
import { TimeAllyManager } from './ethereum/typechain/TimeAllyManager';
import { ValidatorManager } from './ethereum/typechain/ValidatorManager';
import { CustomSigner } from './ethereum/custom-signer';

declare global {
  interface Window {
    provider: ethers.providers.JsonRpcProvider;
    wallet: CustomSigner;
    nrtManagerInstance: NrtManager;
    timeallyManager: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
  }
}
