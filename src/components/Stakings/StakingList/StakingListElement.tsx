import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { ethers } from 'ethers';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';

type StakingListElementProps = {
  stakingContract: string;
  status: string;
};

type StakingListElementState = {
  principal: string | null;
  issTimeLimit: string | null;
  startMonth: number | null;
  endMonth: number | null;
  timestamp: number | null;
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
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.stakingContract,
    // @ts-ignore this is a bug in typescript
    window.wallet /* for prettier to get this on new line */
  );

  // @TODO: handel errors
  componentDidMount = async () => {
    // fetchs data parallelly
    if (this.props.status === 'hold') {
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
        <td>{this.instance.address}</td>
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
            <td colSpan={5}>{this.props.status}</td>
          </>
        )}

        <td>
          <Link
            to={`${linkPrepend}/${this.instance.address}`}
            className="btn btn-default main-btn-blue view"
          >
            View Staking
          </Link>
        </td>
      </tr>
    );
  }
}
