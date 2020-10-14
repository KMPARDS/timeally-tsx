import { ethers } from 'ethers';
import { CustomProvider, CustomProviderBase, addresses } from 'eraswap-sdk';

import {
  NrtManagerFactory,
  TimeAllyManagerFactory,
  ValidatorManagerFactory,
  PrepaidEsFactory,
} from 'eraswap-sdk/dist/typechain/ESN';

const config = {
  ESN: {
    nrtManager: 'NRT_MANAGER',
    timeallyManager: 'TIMEALLY_MANAGER',
    timeallyStakingTarget: 'TIMEALLY_STAKING_TARGET',
    validatorSet: 'VALIDATOR_SET',
    validatorManager: 'VALIDATOR_MANAGER',
    randomnessManager: 'RANDOMNESS_MANAGER',
    blockRewardManager: 'BLOCK_REWARD',
    prepaidEs: 'PREPAID_ES',
    dayswappers: 'DAYSWAPPERS',
    kycdapp: addresses['development'].ESN.kycdapp,
    timeallyclub: 'TIMEALLY_CLUB',
    timeAllyPromotionalBucket: 'TIMEALLY_PROMOTIONAL_BUCKET',
  },
};

window.provider = new CustomProvider('testnet');

if (process.env.REACT_APP_LOCAL_BLOCKCHAIN === 'true') {
  config.ESN = {
    nrtManager: '0xAE519FC2Ba8e6fFE6473195c092bF1BAe986ff90',
    timeallyManager: '0x73b647cbA2FE75Ba05B8e12ef8F8D6327D6367bF',
    timeallyStakingTarget: '0x7d73424a8256C0b2BA245e5d5a3De8820E45F390',
    validatorSet: '0x08425D9Df219f93d5763c3e85204cb5B4cE33aAa',
    validatorManager: '0xA10A3B175F0f2641Cf41912b887F77D8ef34FAe8',
    randomnessManager: '0x6E05f58eEddA592f34DD9105b1827f252c509De0',
    blockRewardManager: '0x79EaFd0B5eC8D3f945E6BB2817ed90b046c0d0Af',
    prepaidEs: '0x2Ce636d6240f8955d085a896e12429f8B3c7db26',
    dayswappers: '',
    kycdapp: '',
    timeallyclub: '',
    timeAllyPromotionalBucket: '',
  };

  window.provider = new CustomProviderBase(
    'http://localhost:8545',
    config.ESN.kycdapp !== ''
      ? {
          name: 'Ganache',
          chainId: 1337,
          ensAddress: config.ESN.kycdapp,
        }
      : undefined
  );
}

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new ethers.Wallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
}

window.nrtManagerInstance = NrtManagerFactory.connect(config.ESN.nrtManager, window.provider);

window.timeallyManagerInstance = TimeAllyManagerFactory.connect(
  config.ESN.timeallyManager,
  window.provider
);

window.validatorManagerInstance = ValidatorManagerFactory.connect(
  config.ESN.validatorManager,
  window.provider
);

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);
