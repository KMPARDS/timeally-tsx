import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { ethers } from 'ethers';

type StakingListElementProps = {
  instance: TimeAllyStaking;
};

type StakingListElementState = {
  principal: string | null;
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
    startMonth: null,
    endMonth: null,
    timestamp: null,
  };

  // @TODO: handel errors
  componentDidMount = async () => {
    // fetchs data parallelly
    const principalPromise = this.props.instance.nextMonthPrincipalAmount();
    const startMonthPromise = this.props.instance.startMonth();
    const endMonthPromise = this.props.instance.endMonth();
    const timestampPromise = this.props.instance.timestamp();

    // sets the state when all the promises are resolved
    this.setState({
      principal: ethers.utils.formatEther(await principalPromise),
      startMonth: (await startMonthPromise).toNumber(),
      endMonth: (await endMonthPromise).toNumber(),
      timestamp: (await timestampPromise).toNumber(),
    });
  };

  render() {
    const { principal, startMonth, endMonth, timestamp } = this.state;
    let linkPrepend = window.location.pathname;
    if (linkPrepend.charAt(linkPrepend.length - 1) === '/') {
      linkPrepend = linkPrepend.substring(0, linkPrepend.length - 1);
    }

    return (
      <tr>
        <td>{this.props.instance.address}</td>
        <td>{principal === null ? <>Loading...</> : <>{principal} ES</>}</td>
        <td>{startMonth ?? <>Loading...</>}</td>
        <td>{endMonth ?? <>Loading...</>}</td>
        <td>
          {timestamp === null ? <>Loading...</> : <>{new Date(timestamp).toLocaleString()}</>}
        </td>
        <td>
          <Link
            to={`${linkPrepend}/${this.props.instance.address}`}
            className="btn btn-default main-btn-blue view"
          >
            View Staking
          </Link>
        </td>
      </tr>
    );
  }
}
