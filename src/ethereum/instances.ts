import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x332c509103798b58E9f70C133493013Edf1A21aA',
    timeallyManager: '0x3A7814a61A5907E8cb66D970ab8590b424b75a9d',
    timeallyStakingTarget: '0x2D3B6A1e62B1F5c1a373810be03D562FE876fa3E',
    validatorSet: '0x51F3af8f51952578c31A75aD718599eE9F8Fd688',
    validatorManager: '0xcbA64449f6D2294447DF29827Bc2EA13ba46fC07',
    randomnessManager: '0xF9FCb8678dB15A5507A5f5414D68aBB2f4568E27',
    blockRewardManager: '0xC4336494606203e3907539d5b462A5cb7853B3C6',
    prepaidEs: '0x6D57FaDF31e62E28Ab059f3dCd565df055428c57',
  },
};

window.provider = new ethers.providers.JsonRpcProvider('https://node0.testnet.eraswap.network');

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
  };
  window.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
}

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new CustomWallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
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
