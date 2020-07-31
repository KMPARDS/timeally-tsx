import React, { Component } from 'react';

export class Nominee extends Component {
  render() {
    return (
      <>
        <h3>Nominee</h3>
        <p>
          Earlier TimeAlly products had an inbuilt nominee function which not only increased
          complications in the smart contract but also it's size. TimeAlly had a %shares based
          nominee concept while TSGAP and PET had Appointee concept. On ESN version of TimeAlly, the
          transfer feature of stakings would cause the staking to be transferred along with set
          nominee address, so we are moving it out to a multi-sig system. In which one can use a
          multi-sig if they want to set a nominee. In future, Era Swap has plans to develop
          customized multi-sig contracts for making it easier for community to use a multi-sig by
          developing user-friendly software. Until that, advanced users can try using{' '}
          <a href="https://github.com/ConsenSys/MultiSigWallet" target="_blank">
            ConsenSys Multisig Wallet
          </a>{' '}
          or{' '}
          <a
            href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v1.2.0/contracts/MultisigWallet.sol"
            target="_blank"
          >
            OpenZeppelin Multisig Wallet
          </a>
          .
        </p>
      </>
    );
  }
}
