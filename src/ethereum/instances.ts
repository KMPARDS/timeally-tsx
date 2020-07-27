import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x48a855668506BDb5afC9A4d7f752670ABC77CA36',
    timeallyManager: '0x9EB2e1ADA4135FEF18393164bf46993cde16aEcC',
    timeallyStakingTarget: '0xe1914671CAa7de55AE7bFD16251028Dc489FF95a',
    validatorSet: '0xF3b22b71F534F6aa6EEfae0dBB7b53e693b8BC07',
    validatorManager: '0x5A4a1F8894e1172071804B8ab0A5ec8d4DC61F25',
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
