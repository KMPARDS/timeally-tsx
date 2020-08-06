import React, { Component } from 'react';
import { TimeAllyStakingFactory } from '../../ethereum/typechain/TimeAllyStakingFactory';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { EraswapInfo } from '../../utils';

export interface NewStaking {
  owner: string;
  stakingContract: string;
  blockNumber: number;
  txHash: string;
}

type Props = {
  newStaking: NewStaking;
};

type State = {
  principal: ethers.BigNumber | null;
  timestamp: number | null;
};

export class NewStakingRow extends Component<Props, State> {
  state: State = {
    principal: null,
    timestamp: null,
  };

  instance = TimeAllyStakingFactory.connect(this.props.newStaking.stakingContract, window.provider);

  componentDidMount = async () => {
    const principal = await this.instance.nextMonthPrincipalAmount();
    const block = await window.provider.getBlock(this.props.newStaking.blockNumber);
    const timestamp = block.timestamp;

    this.setState({ principal, timestamp });
  };

  render() {
    return (
      <tr>
        <td>
          <Link to={`/stakings/${this.props.newStaking.stakingContract}`} className="hex-string">
            {this.props.newStaking.stakingContract.slice(0, 20)}...
          </Link>
        </td>
        <td>
          <span className="hex-string">
            <a target="_blank" href={EraswapInfo.getAddressHref(this.props.newStaking.owner)}>
              {this.props.newStaking.owner.slice(0, 20)}...
            </a>
          </span>
        </td>
        <td>
          {this.state.principal !== null
            ? ethers.utils.formatEther(this.state.principal)
            : 'Loading...'}
        </td>
        <td>
          {this.state.timestamp !== null
            ? new Date(this.state.timestamp * 1000).toLocaleString()
            : 'Loading...'}
        </td>
        <td>
          <a target="_blank" href={EraswapInfo.getTxHref(this.props.newStaking.txHash)}>
            View tx on Eraswap.Info
          </a>
          {}
        </td>
      </tr>
    );
  }
}
