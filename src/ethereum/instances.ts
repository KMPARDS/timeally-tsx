import { ethers } from 'ethers';
import { CustomProvider, CustomProviderBase, addresses } from 'eraswap-sdk';

import {
  NrtManagerFactory,
  TimeAllyManagerFactory,
  ValidatorManagerFactory,
  PrepaidEsFactory,
  TsgapFactory,
  TimeAllyPromotionalBucketFactory,
  DayswappersWithMigrationFactory,
} from 'eraswap-sdk/dist/typechain/ESN';

const config = {
  ESN: {
    proxyAdmin: '0xc3b32965b799E5f96d54A312ad3afA5E57044B20',
    nrtManager: '0x44EeD9580aEa47405F98173377296E75765074C8',
    timeallyManager: '0xF19Ea5D90cD8b9480f6B46880b020fe3eADd392F',
    timeallyStakingTarget: '0xDA7c99e1c5b8f6B6983502953540e621b092a69e',
    validatorSet: '0x8433035CBb293b0e460E99ad6B42274FdcE7099F',
    validatorManager: '0xd014d4149A57b9126F67c03F93FBC078810972Ef',
    randomnessManager: '0xB2D158fcc47320F580E96374c34394750EC07558',
    blockRewardManager: '0x69601642417b3fE47E5f8Cc893696a410e8F7448',
    prepaidEs: '0x6325e975a09E047720f6D8cF25bD2577fB706250',
    dayswappers: '0x38CB3aeF3aAD8fB063C03F5EFD067C992EEFfDEC',
    kycdapp: '0xe1347dAAffbd3102F6CD67edAEA9dfc8A8C4FaDB',
    timeallyclub: '0x8422da7f9bd28868796545D0cd9c15483bD6d214',
    timeAllyPromotionalBucket: '0xE30be1E70e944b800f4933A11EC90C8E44a42594',
    betdeex: '0xEcEB558CB9B905674544AB393414Aa2E2D2004c7',
    betImplementation: '0x0bD7e7a62Da3fE867E6dDae56801D79785E4FC0B',
    buildSurvey: '0x87D673fCc902EF19241633674f6617fcd5B95F15',
    rentingDappManager: '0xE79be7ba19d3fA67736A27EC0d0D30D6cfC146F7',
    tsgap: '0x3334690604871703d27DC0c25FE2f5A0A91551D1',
    petLiquid: '0x4125e6Ef70AbA4f4Ed7c4eB3d53a08DC53a9316D',
    petPrepaid: '0xEAFB2b46B523B5199311d46D160f1174BFfe9A9E',
  },
};
// const config = addresses[process.env.REACT_APP_ENV === 'production' ? 'production' : 'development'];

// window.provider = new CustomProvider(
//   process.env.REACT_APP_ENV === 'production' ? 'mainnet' : 'testnet'
// );
window.provider = new CustomProviderBase(
  // process.env.REACT_APP_ENV === 'production' ? 'mainnet' : 'testnet'
  'https://rpc-temp.mainnet.eraswap.network'
);

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

window.dayswappersInstance = DayswappersWithMigrationFactory.connect(
  config.ESN.dayswappers,
  window.provider
);

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);

window.tsgapLiquidInstance = TsgapFactory.connect(config.ESN.tsgap, window.provider);
