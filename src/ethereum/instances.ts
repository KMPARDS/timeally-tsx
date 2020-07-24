import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x1F44A1002404933d5Cb450b214fD7e412b166614',
    timeallyManager: '0x016fa071711e32222B3bEf51E24af64DcE7973D7',
    validatorSet: '0xF3b22b71F534F6aa6EEfae0dBB7b53e693b8BC07',
    validatorManager: '0x41D1d129b1A0F78c90CBAd10FbF531965Aa44a7f',
    randomnessManager: '0xf620b0F20F90Ef5bF8C05aD65981F26775f8a32B',
    blockRewardManager: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
    prepaidEs: '0x8Eb81e05dbeB960909eb2e672EAd940D3B1d2649',
  },
};

// Temporary wallet
const wallet = new CustomWallet(
  '0xC8C32AE192AB75269C4F1BC030C2E97CC32E63B80B0A3CA008752145CF7ACEEA'
);

window.provider = new ethers.providers.JsonRpcProvider('https://node0.testnet.eraswap.network');

window.wallet = new CustomWallet(wallet.privateKey, window.provider);

window.nrtManagerInstance = NrtManagerFactory.connect(config.ESN.nrtManager, window.provider);

window.timeallyManager = TimeAllyManagerFactory.connect(
  config.ESN.timeallyManager,
  window.provider
);

window.validatorManagerInstance = ValidatorManagerFactory.connect(
  config.ESN.validatorManager,
  window.provider
);

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);
