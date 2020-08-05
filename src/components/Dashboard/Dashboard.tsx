import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from '../Layout';
import { ethers } from 'ethers';
import { routine } from '../../utils';
import { TimeCounter } from '../TimeCounter';

type State = {
  currentNrtMonth: number | null;
  nrtRelease: ethers.BigNumber | null;
  nextMonthActiveStakes: ethers.BigNumber | null;
  lastNrtReleaseTimestamp: number | null;
  numberOfTransfersIn24Hours: number | null;
};

export class Dashboard extends Component<{}, State> {
  state: State = {
    currentNrtMonth: null,
    nrtRelease: null,
    nextMonthActiveStakes: null,
    lastNrtReleaseTimestamp: null,
    numberOfTransfersIn24Hours: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateDetails, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateDetails = async () => {
    const currentNrtMonth = await window.nrtManagerInstance.currentNrtMonth();
    // const nrtReleasePromise
    const nextMonthActiveStakes = await window.timeallyManagerInstance.getTotalActiveStaking(
      currentNrtMonth
    );

    const logs = await window.nrtManagerInstance.queryFilter(
      window.nrtManagerInstance.filters.NRT(null)
    );
    const nrtReleases = logs
      .map((log) => window.nrtManagerInstance.interface.parseLog(log))
      .map((parsedLog) => {
        const nrtRelease: ethers.BigNumber = parsedLog.args[0];
        return nrtRelease;
      });

    const lastNrtReleaseTimestamp = (
      await window.nrtManagerInstance.lastReleaseTimestamp()
    ).toNumber();

    let fromBlockNumber = await window.provider.getBlockNumber();
    fromBlockNumber -= (24 * 60 * 60) / 5;
    if (fromBlockNumber < 0) fromBlockNumber = 0;

    const numberOfTransfersIn24Hours = (
      await window.timeallyManagerInstance.queryFilter(
        window.timeallyManagerInstance.filters.StakingTransfer(null, null, null),
        fromBlockNumber,
        'latest'
      )
    ).length;

    this.setState({
      currentNrtMonth: currentNrtMonth.toNumber(),
      nrtRelease: nrtReleases.slice(-1)[0],
      nextMonthActiveStakes,
      lastNrtReleaseTimestamp: lastNrtReleaseTimestamp,
      numberOfTransfersIn24Hours,
    });
  };

  render() {
    return (
      <Layout transparent title="Dashboard" button={{ name: 'New Staking', link: '/stakings/new' }}>
        <div>
          <div className="container dashboard-bg">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="wrapper-content bg-white pinside10">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                          <div className="bg-light pinside10 ">
                            <div className="row">
                              <div
                                className="col-xl-5 col-lg-5 col-md-5 col-sm-5 "
                                style={{ textAlign: 'center' }}
                              >
                                <span className="title">Current NRT Month</span>
                                <br></br>
                                <br></br>
                                <span className="number" style={{ fontSize: '12px' }}>
                                  {this.state.currentNrtMonth ?? <>Loading...</>}
                                </span>
                                <hr />
                                <span className="title">NRT Release this month</span>
                                <br></br>
                                <br></br>
                                <span className="number" style={{ fontSize: '12px' }}>
                                  {this.state.nrtRelease === null
                                    ? 'Loading...'
                                    : `${ethers.utils.formatEther(this.state.nrtRelease)} ES`}
                                </span>
                              </div>
                              <div className="vl" />
                              <div
                                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 "
                                style={{ textAlign: 'center' }}
                              >
                                <span className="title">
                                  Next Month Active Stakings in the Blockchain
                                </span>
                                <br></br>
                                <br></br>
                                <span className="number" style={{ fontSize: '12px' }}>
                                  {this.state.nextMonthActiveStakes === null
                                    ? 'Loading...'
                                    : `${ethers.utils.formatEther(
                                        this.state.nextMonthActiveStakes
                                      )} ES`}
                                </span>
                                <hr />
                                <span className="title">Next NRT Countdown</span>
                                <br></br>
                                <br></br>
                                <span className="number" style={{ fontSize: '12px' }}>
                                  {this.state.lastNrtReleaseTimestamp === null ? (
                                    'Loading...'
                                  ) : (
                                    <TimeCounter
                                      timestamp={this.state.lastNrtReleaseTimestamp + 2629744}
                                      remaining
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="v2" />
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="bg-light">
                                <hr />
                                <span className="title" style={{ textAlign: 'center' }}>
                                  Number of staking contract transfers in last 24 hours
                                </span>
                                {/* <h2 id="emi" className="pull-right">Graph</h2> */}
                                <br></br>
                                <br></br>
                                <h2 className="number">
                                  {this.state.numberOfTransfersIn24Hours === null
                                    ? 'Loading...'
                                    : `${this.state.numberOfTransfersIn24Hours} transfers`}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className="mb20">View Recent Stakings in the World</h2>
            <div className="row pinside40 maintable">
              <div className="tablebg">
                {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  {this.state.stakings.length ? (
                    <table className="table" border={1}>
                      <thead style={{ textAlign: 'center' }}>
                        <tr>
                          <th>Address</th>
                          <th>Plan</th>
                          <th>Amount</th>
                          <th>Staking Type</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: 'center' }}>
                        {this.state.stakings.map((staking, index) => (
                          <>
                            <StakingEntry
                              address={staking.address}
                              stakingId={staking.stakingId}
                              planId={staking.planId}
                              amount={staking.amount}
                              transactionHash={staking.transactionHash}
                            />
                          </>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    'Please wait loading recent stakings...'
                  )}
                  <br />
                  <Button
                    className="mt-2"
                    onClick={() =>
                      this.props.history.push('/view-all-world-staking')
                    }
                  >
                    View all stakings in the world
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
