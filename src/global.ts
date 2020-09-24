import { ethers } from 'ethers';
import { NrtManager } from './ethereum/typechain/NrtManager';
import { TimeAllyManager } from './ethereum/typechain/TimeAllyManager';
import { ValidatorManager } from './ethereum/typechain/ValidatorManager';
import { PrepaidEs } from './ethereum/typechain/PrepaidEs';
import { CustomProvider } from './ethereum/custom-provider';

declare global {
  interface Window {
    provider: CustomProvider;
    wallet: ethers.Wallet | undefined;
    nrtManagerInstance: NrtManager;
    timeallyManagerInstance: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
    prepaidEsInstance: PrepaidEs;
    ethereum: ethers.providers.ExternalProvider;
  }
}
