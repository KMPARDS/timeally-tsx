import { ethers } from 'ethers';
import {
  NrtManager,
  TimeAllyManager,
  ValidatorManager,
  PrepaidEs,
  TimeAllyPromotionalBucket,
} from 'eraswap-sdk/dist/typechain/ESN';

import { CustomProvider } from 'eraswap-sdk';

declare global {
  interface Window {
    provider: CustomProvider;
    wallet: ethers.Wallet | undefined;
    nrtManagerInstance: NrtManager;
    timeallyManagerInstance: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
    prepaidEsInstance: PrepaidEs;
    timeallyPromotionalBucketInstance: TimeAllyPromotionalBucket;
    ethereum: ethers.providers.ExternalProvider;
  }
}
