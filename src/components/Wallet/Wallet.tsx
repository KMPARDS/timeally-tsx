import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Table, Alert } from 'react-bootstrap';
import { EraswapInfo, routine } from '../../utils';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

type State = {
  liquid: BigNumber | null;
  prepaid: BigNumber | null;
};

export class Wallet extends Component<{}, State> {
  state: State = {
    liquid: null,
    prepaid: null,
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

  render() {
    return (
      <Layout title="Wallet">
        {!window.wallet ? (
          <Alert variant="danger">Wallet is not loaded. Please load your wallet</Alert>
        ) : (
          <>
            <Table>
              <tbody>
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
                Eraswap.Info
              </a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}
