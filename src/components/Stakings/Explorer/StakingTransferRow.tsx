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
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

export class StakingTransferRow extends Component<Props, State> {
  state: State = {
    principal: null,
    endMonth: null,
    timestamp: null,
    destroyStatus: null,
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.stakingTransferEvent.stakingContract,
    window.provider
  );

  componentDidMount = async () => {
    try {
      const principal = await this.instance.nextMonthPrincipalAmount();
      const endMonth = (await this.instance.endMonth()).toNumber();
      const block = await window.provider.getBlock(this.props.stakingTransferEvent.blockNumber);
      const timestamp = block.timestamp;

      this.setState({ principal, endMonth, timestamp });
    } catch (error) {
      const parsedLogs = (
        await this.instance.queryFilter(this.instance.filters.Destroy(null))
      ).map((log): [ethers.Event, ethers.utils.LogDescription] => [
        log,
        this.instance.interface.parseLog(log),
      ]);

      if (parsedLogs.length) {
        const reason: 0 | 1 | 2 = parsedLogs[0][1].args[0];
        const txHash = parsedLogs[0][0].transactionHash;
        let mergedIn: string | null = null;

        if (reason === 2) {
          const parsedLogs = (
            await window.timeallyManagerInstance.queryFilter(
              window.timeallyManagerInstance.filters.StakingMerge(null, this.instance.address)
            )
          ).map((log) => window.timeallyManagerInstance.interface.parseLog(log));

          if (parsedLogs.length) {
            mergedIn = parsedLogs[0].args[0];
          }
        }

        this.setState({
          destroyStatus: {
            reason,
            txHash,
            mergedIn,
          },
        });
      } else {
        throw error;
      }
    }
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

        {this.state.destroyStatus === null ? (
          <>
            <td>
              {this.state.principal !== null
                ? ethers.utils.formatEther(this.state.principal)
                : 'Loading...'}
            </td>
            <td>{this.state.endMonth !== null ? this.state.endMonth : 'Loading...'}</td>
          </>
        ) : (
          <td colSpan={2}>
            {(() => {
              switch (this.state.destroyStatus.reason) {
                case 0:
                  return <>IssTime Exit</>;
                case 1:
                  return <>IssTime Reported</>;
                case 2:
                  return this.state.destroyStatus.mergedIn ? (
                    <>
                      Merged in{' '}
                      <Link to={`/stakings/${this.state.destroyStatus.mergedIn}`}>
                        {this.state.destroyStatus.mergedIn.slice(0, 10)}...
                      </Link>
                    </>
                  ) : (
                    <>Merged</>
                  );
                default:
                  return 'Unknown destroy reason';
              }
            })()}
            (
            <a target="_blank" href={EraswapInfo.getTxHref(this.state.destroyStatus.txHash)}>
              View destroy Tx
            </a>
            )
          </td>
        )}
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
