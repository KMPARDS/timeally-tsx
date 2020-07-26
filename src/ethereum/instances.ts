import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x2BFFA44bcFa70F603357255C8BCdF4E69c71947D',
    timeallyManager: '0xCf9d50bAc66BA0bDbddb9cEbEf6b758ff1503A05',
    timeallyStakingTarget: '0xb12cECe1A328d737a7170959756f3E491d0aF1e8',
    validatorSet: '0xF3b22b71F534F6aa6EEfae0dBB7b53e693b8BC07',
    validatorManager: '0x69f288B79486Cd5D552139FeFC656F19a3Ae916F',
    randomnessManager: '0xf620b0F20F90Ef5bF8C05aD65981F26775f8a32B',
    blockRewardManager: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
    prepaidEs: '0x8Eb81e05dbeB960909eb2e672EAd940D3B1d2649',
  },
};

window.provider = new ethers.providers.JsonRpcProvider('https://node0.testnet.eraswap.network');

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
