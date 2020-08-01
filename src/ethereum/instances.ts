import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x9B9f2E24BB59372d6dd2D05813234D9a67Be85E2',
    timeallyManager: '0x1F3fE67eb6C2bE76DED8A054e0E29D89F18E405F',
    timeallyStakingTarget: '0x6D9a0D9FB39C7C47D6BAea3269D1Ee3aE8fE1474',
    validatorSet: '0xF3b22b71F534F6aa6EEfae0dBB7b53e693b8BC07',
    validatorManager: '0xF5D629AAb8d5417285d549dD879Cf9AeE0eC2337',
    randomnessManager: '0xf620b0F20F90Ef5bF8C05aD65981F26775f8a32B',
    blockRewardManager: '0xe021bf70cE7C47d9744b2BdbFC7bdA1b4C7cAbD9',
    prepaidEs: '0x3b2a928bd4Ab36Dd46C4C44C4d3C2dbD60B6c092',

    // local:
    // nrtManager: '0xAE519FC2Ba8e6fFE6473195c092bF1BAe986ff90',
    // timeallyManager: '0x73b647cbA2FE75Ba05B8e12ef8F8D6327D6367bF',
    // timeallyStakingTarget: '0x7d73424a8256C0b2BA245e5d5a3De8820E45F390',
    // validatorSet: '0x08425D9Df219f93d5763c3e85204cb5B4cE33aAa',
    // validatorManager: '0xA10A3B175F0f2641Cf41912b887F77D8ef34FAe8',
    // randomnessManager: '0x6E05f58eEddA592f34DD9105b1827f252c509De0',
    // blockRewardManager: '0x79EaFd0B5eC8D3f945E6BB2817ed90b046c0d0Af',
    // prepaidEs: '0x2Ce636d6240f8955d085a896e12429f8B3c7db26',
  },
};

window.provider = new ethers.providers.JsonRpcProvider('https://node0.testnet.eraswap.network');
// window.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

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
