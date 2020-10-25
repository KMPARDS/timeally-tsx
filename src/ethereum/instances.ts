import { ethers } from 'ethers';
import { CustomProvider, CustomProviderBase, addresses } from 'eraswap-sdk';

import {
  NrtManagerFactory,
  TimeAllyManagerFactory,
  ValidatorManagerFactory,
  PrepaidEsFactory,
  TimeAllyPromotionalBucketFactory,
} from 'eraswap-sdk/dist/typechain/ESN';

// const config = {
//   ESN: {
//     nrtManager: 'NRT_MANAGER',
//     timeallyManager: 'TIMEALLY_MANAGER',
//     timeallyStakingTarget: 'TIMEALLY_STAKING_TARGET',
//     validatorSet: 'VALIDATOR_SET',
//     validatorManager: 'VALIDATOR_MANAGER',
//     randomnessManager: 'RANDOMNESS_MANAGER',
//     blockRewardManager: 'BLOCK_REWARD',
//     prepaidEs: 'PREPAID_ES',
//     dayswappers: 'DAYSWAPPERS',
//     kycdapp: addresses['development'].ESN.kycdapp,
//     timeallyclub: 'TIMEALLY_CLUB',
//     timeAllyPromotionalBucket: 'TIMEALLY_PROMOTIONAL_BUCKET',
//   },
// };
const config = addresses['development'];

window.provider = new CustomProvider('testnet');

// if (true || process.env.REACT_APP_LOCAL_BLOCKCHAIN === 'true') {
//   config.ESN = {
//     nrtManager: '0x961D3860d840D6ACCeAA302fbF5C0bb83b801bb4',
//     timeallyManager: '0x89309551Fb7AbaaB85867ACa60404CDA649751d4',
//     timeallyStakingTarget: '0x7F87f9830baB8A591E6f94fd1A47EE87560B0bB0',
//     validatorSet: '0xA3C6cf908EeeebF61da6e0e885687Cab557b5e3F',
//     validatorManager: '0x44F70d80642998F6ABc424ceAf1E706a479De8Ce',
//     randomnessManager: '0x22E0940C1AE5D31B9efBaf7D674F7D62895FBde8',
//     blockRewardManager: '0x6D57FaDF31e62E28Ab059f3dCd565df055428c57',
//     prepaidEs: '0xCf535dB3c1EDbFbBdadbDe725119906BE20fb362',
//     dayswappers: '0x7DD7EDB18C271959156967bc7651D685E8C1B225',
//     kycdapp: '0x56578Ff4c37Fd4e02C8d75FF9982A22C095dD3c5',
//     timeallyclub: '0xee42b2Dcc3d32AD5E736df6245AD8A88a70ba6bF',
//     timeAllyPromotionalBucket: '0x8b2C9732137bAD7e629139B1fDa9E6094368f6B4',
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
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
}

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

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);
