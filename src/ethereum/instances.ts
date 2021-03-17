import { ethers, providers } from 'ethers';
import { CustomProvider, addresses,CustomJsonRpcProvider } from 'eraswap-sdk';
import {
  NrtManagerFactory,
  TimeAllyManagerFactory,
  ValidatorManagerFactory,
  PrepaidEsFactory,
  TsgapFactory,
  TimeAllyPromotionalBucketFactory,
  DayswappersWithMigrationFactory,
  PetPrepaidTimeAllyPetFactory,
  PetLiquidTimeAllyPetFactory,
  PetLiquidFundsBucketFactory,
  PetLiquidTimeAllyPet,
  KycDappFactory,
} from 'eraswap-sdk/dist/typechain/ESN';

import { PetLiquidFlattenTimeAllyPetFactory } from './PetLiquidFlattenTimeAllyPetFactory';
import { DistributeIncentiveFactory } from './DistributeIncentive/DistributeIncentiveFactory';
import { PetConvertFactory } from './PetConvert/PetConvertFactory';
const config = addresses[process.env.REACT_APP_ENV === 'production' ? 'production' : 'development'];

window.provider = new CustomProvider('mainnet');

// window.provider = new CustomJsonRpcProvider('https://rpc-mumbai.mainnet.eraswap.network');


// if (process.env.REACT_APP_LOCAL_BLOCKCHAIN === 'true') {
//   config.ESN = {
//     nrtManager: '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
//     timeallyManager: '0xc4cfb05119Ea1F59fb5a8F949288801491D00110',
//     timeallyStakingTarget: '0x961D3860d840D6ACCeAA302fbF5C0bb83b801bb4',
//     validatorSet: '0x7eCb2899D9D66858D558391D448e6e4D1B4a86cF',
//     validatorManager: '0xcA4d0578c5e07F0964C7E7ccc87E606A234625b8',
//     randomnessManager: '0x89309551Fb7AbaaB85867ACa60404CDA649751d4',
//     blockRewardManager: '0x7F87f9830baB8A591E6f94fd1A47EE87560B0bB0',
//     prepaidEs: '0xA3C6cf908EeeebF61da6e0e885687Cab557b5e3F',
//     dayswappers: '0x8418249278d74D46014683A8029Fd6fbC88482a1',
//     kycdapp: '0xE14D14bd8D0E2c36f5E4D00106417d8cf1000e22',
//     timeallyclub: '0x44F70d80642998F6ABc424ceAf1E706a479De8Ce',
//     timeAllyPromotionalBucket: '0x2AA786Cd8544c50136e5097D5E19F6AE10E02543',
//     tsgapManager: '0x98dD383CE722eFc881354cE38922d50017C3eE89',
//   };

//   window.provider = new CustomProviderBase(
//     'http://localhost:8545',
//     config.ESN.kycdapp !== ''
//       ? {
//           name: 'Ganache',
//           chainId: 1337,
//           ensAddress: config.ESN.kycdapp,
//         }
//       : undefined
//   );
// }

// Temporary wallet
if (process.env.REACT_APP_NODE_ENV === 'development') {
  window.wallet = new ethers.Wallet(
    '0x26dfe99b98515fc4fd53a811b7db194afaaf6d4133aa371e7270b477bc086b07' ||
      process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY,
    window.provider
  );
}

window.kycInst = KycDappFactory.connect(config.ESN.kycdapp,window.provider);

window.nrtManagerInstance = NrtManagerFactory.connect(config.ESN.nrtManager, window.provider);

window.timeallyManagerInstance = TimeAllyManagerFactory.connect(
  config.ESN.timeallyManager,
  window.provider
);

window.timeallyPromotionalBucketInstance = TimeAllyPromotionalBucketFactory.connect(
  config.ESN.timeAllyPromotionalBucket,
  window.provider
);

window.validatorManagerInstance = ValidatorManagerFactory.connect(
  config.ESN.validatorManager,
  window.provider
);

window.dayswappersInstance = DayswappersWithMigrationFactory.connect(
  config.ESN.dayswappers,
  window.provider
);

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);

window.tsgapLiquidInstance = TsgapFactory.connect(
  /*config.ESN.tsgap*/ '0xa7D57ED5cF343db3BCa98a4e5E3310439dC03199',
  window.provider
);

// window.petInstance = PetLiquidTimeAllyPetFactory.connect(config.ESN.petPrepaid,window.provider);
window.petInstance = PetPrepaidTimeAllyPetFactory.connect(config.ESN.petPrepaid, window.provider);
// window.petLiquidInstance = PetLiquidTimeAllyPetFactory.connect(
//   config.ESN.petLiquid,
//   window.provider
// );

window.petLiquidInstance = PetLiquidFlattenTimeAllyPetFactory.connect(
  '0x0009006c385CE986A576D6ADCA928888AFC8cDDB',
  window.provider
);

window.petFundsInstance = PetLiquidFundsBucketFactory.connect(
  config.ESN.petPrepaid,
  window.provider
);

window.distributeIncentiveInstance = DistributeIncentiveFactory.connect(
  '0x4a64095E0f4Fcf0fF201FF0984E928908c269F25',
  window.provider
);

window.petConvert = PetConvertFactory.connect(
  '0x34646B0B42438a4dAd8f6Dc1DFA878D9CC84f7fc',
  window.provider
)
