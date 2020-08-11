import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Table, Alert } from 'react-bootstrap';
import { EraswapInfo, routine } from '../../utils';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import copy from 'copy-to-clipboard';

type State = {
  liquid: BigNumber | null;
  prepaid: BigNumber | null;
  addressCopied: boolean;
};

export class Wallet extends Component<{}, State> {
  state: State = {
    liquid: null,
    prepaid: null,
    addressCopied: false,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.updateBalances, 10000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateBalances = async () => {
    if (window.wallet) {
      const liquid = await window.provider.getBalance(window.wallet.address);
      const prepaid = await window.prepaidEsInstance.balanceOf(window.wallet.address);
      this.setState({ liquid, prepaid });
    }
  };

  copyAddress = () => {
    if (copy(window.wallet?.address ?? 'wallet.address is nullish')) {
      this.setState({ addressCopied: true });
      setTimeout(() => this.setState({ addressCopied: false }), 2000);
    }
  };

  render() {
    return (
      <Layout title="My Wallet">
        {!window.wallet ? (
          <Alert variant="danger">Wallet is not loaded. Please load your wallet</Alert>
        ) : (
          <>
            <Table>
              <tbody>
                <tr>
                  <td>Wallet Address</td>
                  <td onClick={this.copyAddress} style={{ cursor: 'pointer' }}>
                    <span className="hex-string">
                      {window.wallet?.address ?? 'wallet.address is nullish'}
                    </span>{' '}
                    {this.state.addressCopied ? <>[Copied]</> : <>[Copy]</>}
                  </td>
                </tr>
                <tr>
                  <td>Liquid (Native ES)</td>
                  <td>
                    {this.state.liquid ? `${formatEther(this.state.liquid)} ES` : 'Loading...'}
                  </td>
                </tr>
                <tr>
                  <td>Prepaid (Wrapped ES)</td>
                  <td>
                    {this.state.prepaid ? `${formatEther(this.state.prepaid)} ES` : 'Loading...'}
                  </td>
                </tr>
              </tbody>
            </Table>

            <p>
              View transaction history on{' '}
              <a target="_blank" href={EraswapInfo.getAddressHref(window.wallet.address)}>
                <strong>
                  <u>Eraswap.Info</u>{' '}
                </strong>
              </a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}
