import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x162D0A1090435468982E890bfAc0A0A8B580d319',
    timeallyManager: '0xfd2e3292d8eC8CD5A7eD9e232a2641C07A17C84c',
    timeallyStakingTarget: '0xBf056B8B290e7726a426Ad168fac54F40C6Dd5F6',
    validatorSet: '0xF3b22b71F534F6aa6EEfae0dBB7b53e693b8BC07',
    validatorManager: '0xddb6bda5a6265Bb0018b2FBb484DDc8F5DF45238',
    randomnessManager: '0xf620b0F20F90Ef5bF8C05aD65981F26775f8a32B',
    blockRewardManager: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
    prepaidEs: '0x3b2a928bd4Ab36Dd46C4C44C4d3C2dbD60B6c092',
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
