import { ethers } from 'ethers';
import {
  NrtManager,
  TimeAllyManager,
  ValidatorManager,
  PrepaidEs,
  Tsgap,
  TimeAllyPromotionalBucket,
  PetLiquidFundsBucket,
  PetLiquidTimeAllyPet,
  DayswappersWithMigration,
  PetPrepaidTimeAllyPet,
  KycDapp,
} from 'eraswap-sdk/dist/typechain/ESN';

import { PetLiquidFlattenTimeAllyPet } from './ethereum/PetLiquidFlattenTimeAllyPet';

import { CustomProvider, CustomJsonRpcProvider } from 'eraswap-sdk';
import { DistributeIncentive } from './ethereum/DistributeIncentive/DistributeIncentive';
import { PetConvert } from './ethereum/PetConvert/PetConvert';
import { Incentive } from './ethereum/DistributeIncentive/Incentive';

declare global {
  interface Window {
    wallet: ethers.Wallet | undefined;
    nrtManagerInstance: NrtManager;
    timeallyManagerInstance: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
    prepaidEsInstance: PrepaidEs;
    timeallyPromotionalBucketInstance: TimeAllyPromotionalBucket;
    dayswappersInstance: DayswappersWithMigration;
    ethereum: ethers.providers.ExternalProvider;
    provider: CustomProvider | CustomJsonRpcProvider;
    tsgapLiquidInstance: Tsgap;
    petInstance: PetPrepaidTimeAllyPet;
    // petLiquidInstance: PetLiquidTimeAllyPet;
    petLiquidInstance: PetLiquidFlattenTimeAllyPet;
    petFundsInstance: PetLiquidFundsBucket;
    returnLocationAfterLoadWallet: any;
    distributeIncentiveInstance: DistributeIncentive;
    kycInst: KycDapp;
    petConvert: PetConvert;
    incentiveInst: Incentive;
  }
}
