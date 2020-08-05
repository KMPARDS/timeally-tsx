import React, { Component } from 'react';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { EraswapInfo } from '../../../utils';

export interface StakingTransferEvent {
  from: string;
  to: string;
  stakingContract: string;
  blockNumber: number;
  txHash: string;
}

type Props = {
  stakingTransferEvent: StakingTransferEvent;
};

type State = {
  principal: ethers.BigNumber | null;
  endMonth: number | null;
  timestamp: number | null;
};

export class StakingTransferRow extends Component<Props, State> {
  state: State = {
    principal: null,
    endMonth: null,
    timestamp: null,
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.stakingTransferEvent.stakingContract,
    window.provider
  );

  componentDidMount = async () => {
    const principal = await this.instance.nextMonthPrincipalAmount();
    const endMonth = (await this.instance.endMonth()).toNumber();
    const block = await window.provider.getBlock(this.props.stakingTransferEvent.blockNumber);
    const timestamp = block.timestamp;

    this.setState({ principal, endMonth, timestamp });
  };

  render() {
    return (
      <tr>
        <td>
          <Link
            to={`/stakings/${this.props.stakingTransferEvent.stakingContract}`}
            className="hex-string"
          >
            {this.props.stakingTransferEvent.stakingContract.slice(0, 20)}...
          </Link>
        </td>
        <td>
          <span className="hex-string">
            <a
              target="_blank"
              href={EraswapInfo.getAddressHref(this.props.stakingTransferEvent.from)}
            >
              {this.props.stakingTransferEvent.from.slice(0, 20)}...
            </a>
          </span>
        </td>
        <td>
          <span className="hex-string">
            <a
              target="_blank"
              href={EraswapInfo.getAddressHref(this.props.stakingTransferEvent.to)}
            >
              {this.props.stakingTransferEvent.to.slice(0, 20)}...
            </a>
          </span>
        </td>

        <td>
          {this.state.principal !== null
            ? ethers.utils.formatEther(this.state.principal)
            : 'Loading...'}
        </td>
        <td>{this.state.endMonth !== null ? this.state.endMonth : 'Loading...'}</td>
        <td>
          {this.state.timestamp !== null
            ? new Date(this.state.timestamp * 1000).toLocaleString()
            : 'Loading...'}
        </td>
        <td>
          <a target="_blank" href={EraswapInfo.getTxHref(this.props.stakingTransferEvent.txHash)}>
            View tx on Eraswap.Info
          </a>
        </td>
      </tr>
    );
  }
}
