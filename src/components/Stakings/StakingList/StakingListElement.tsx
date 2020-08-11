import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { ethers } from 'ethers';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import { EraswapInfo } from '../../../utils';

type StakingListElementProps = {
  stakingContract: string;
  status: string;
  txHash: string;
};

type StakingListElementState = {
  principal: string | null;
  issTimeLimit: string | null;
  startMonth: number | null;
  endMonth: number | null;
  timestamp: number | null;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

export class StakingListElement extends Component<
  StakingListElementProps,
  StakingListElementState
> {
  state: StakingListElementState = {
    principal: null,
    issTimeLimit: null,
    startMonth: null,
    endMonth: null,
    timestamp: null,
    destroyStatus: null,
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.stakingContract,
    window.wallet ?? new ethers.VoidSigner(ethers.constants.AddressZero)
  );

  // @TODO: handel errors
  componentDidMount = async () => {
    // fetchs data parallelly
    try {
      const principalPromise = this.instance.nextMonthPrincipalAmount();
      const issTimeLimitPromise = this.instance.issTimeLimit();
      const startMonthPromise = this.instance.startMonth();
      const endMonthPromise = this.instance.endMonth();
      const timestampPromise = this.instance.timestamp();

      // sets the state when all the promises are resolved
      this.setState({
        principal: ethers.utils.formatEther(await principalPromise),
        issTimeLimit: ethers.utils.formatEther(await issTimeLimitPromise),
        startMonth: (await startMonthPromise).toNumber(),
        endMonth: (await endMonthPromise).toNumber(),
        timestamp: (await timestampPromise).toNumber(),
      });
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
    const { principal, issTimeLimit, startMonth, endMonth, timestamp } = this.state;
    let linkPrepend = window.location.pathname;
    if (linkPrepend.charAt(linkPrepend.length - 1) === '/') {
      linkPrepend = linkPrepend.substring(0, linkPrepend.length - 1);
    }

    return (
      <tr>
        <td className="hex-string">
          <Link to={`${linkPrepend}/${this.instance.address}`}>{this.instance.address}</Link>
        </td>
        {this.props.status === 'hold' ? (
          <>
            <td>{principal === null ? <>Loading...</> : <>{principal} ES</>}</td>
            <td>{issTimeLimit === null ? <>Loading...</> : <>{issTimeLimit} ES</>}</td>
            <td>{startMonth ?? <>Loading...</>}</td>
            <td>{endMonth ?? <>Loading...</>}</td>
            <td>
              {timestamp === null ? (
                <>Loading...</>
              ) : (
                <>{new Date(timestamp * 1000).toLocaleString()}</>
              )}
            </td>
          </>
        ) : (
          <>
            <td colSpan={5}>
              {this.props.status} during Tx{' '}
              <a
                target="_blank"
                href={EraswapInfo.getTxHref(this.props.txHash)}
                className="hex-string"
              >
                {this.props.txHash.slice(0, 8)}..
              </a>
              {this.state.destroyStatus !== null ? (
                <>
                  {' '}
                  by{' '}
                  {(() => {
                    switch (this.state.destroyStatus.reason) {
                      case 0:
                        return <>IssTime Exit</>;
                      case 1:
                        return <>IssTime Report</>;
                      case 2:
                        return this.state.destroyStatus.mergedIn ? (
                          <>
                            merging inside{' '}
                            <Link
                              to={`/stakings/${this.state.destroyStatus.mergedIn}`}
                              className="hex-string"
                            >
                              {this.state.destroyStatus.mergedIn.slice(0, 6)}..
                            </Link>
                          </>
                        ) : (
                          <>Merged</>
                        );
                      default:
                        return 'Unknown destroy reason';
                    }
                  })()}
                </>
              ) : (
                <> loading reason...</>
              )}
            </td>
          </>
        )}

        <td>
          <Link to={`${linkPrepend}/${this.instance.address}`} className="btn btn-primary view">
            <i className="fa fa-eye" aria-hidden="true"></i>
          </Link>
        </td>
      </tr>
    );
  }
}
