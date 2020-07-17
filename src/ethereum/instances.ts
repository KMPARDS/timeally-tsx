import { ethers } from 'ethers';
import { CustomSigner } from './custom-signer';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';

const config = {
  ESN: {
    nrtManager: '0x2B7e1FF3D2D14c5b80907a61D70DA04Ae6DFEAEb',
    timeallyManager: '0xee42b2Dcc3d32AD5E736df6245AD8A88a70ba6bF',
    validatorSet: '0x7b0E5aCA6F088691561022A0dB37830b56cb581a',
    validatorManager: '0x56d38C60793b64aeab5E62630a2b690C695779da',
    randomnessManager: '0x8b2C9732137bAD7e629139B1fDa9E6094368f6B4',
    blockRewardManager: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
  },
};

// Temporary wallet
const wallet = new ethers.Wallet(
  '0xC8C32AE192AB75269C4F1BC030C2E97CC32E63B80B0A3CA008752145CF7ACEEA'
);

window.provider = new ethers.providers.JsonRpcProvider(
  'https://node0.testnet.eraswap.network'
);

window.wallet = new CustomSigner(wallet, window.provider);

window.nrtManagerInstance = NrtManagerFactory.connect(
  config.ESN.nrtManager,
  window.provider
);

window.timeallyManager = TimeAllyManagerFactory.connect(
  config.ESN.timeallyManager,
  window.provider
);

window.validatorManagerInstance = ValidatorManagerFactory.connect(
  config.ESN.validatorManager,
  window.provider
);
