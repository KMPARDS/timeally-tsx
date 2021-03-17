import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { LayoutTSGAP as Layout } from '../Layout/LayoutTSGAP';
import axios from 'axios';
import { hexToNum, lessDecimals, sliceDataTo32Bytes } from '../../utils';
import { ethers } from 'ethers';
import { RouteComponentProps } from 'react-router-dom';

type State = {
  fundsDeposit: ethers.BigNumber;
  pendingBenefits: ethers.BigNumber;
  showLoginModal: boolean;
  eraSwapPrice: number;
  fundsAdded: number;
};

interface PropsInterface extends RouteComponentProps<any> {}

class PET extends Component<PropsInterface, State> {
  state: State = {
    fundsDeposit: ethers.constants.Zero,
    pendingBenefits: ethers.constants.Zero,
    showLoginModal: false,
    eraSwapPrice: 0,
    fundsAdded: 0,
  };

  componentDidMount = async () => {
    const fundsBucketAddress = await window.petInstance.fundsBucket();

    (async () => {
      const response = await axios.get('https://apis.eraswap.info/third-party/es-price');

      if (!response?.data?.status) return console.log('Error in Probit API:', response);

      this.setState({ eraSwapPrice: +response.data.probitResponse.data[0].last });
    })();

    (async () => {
      const fundsDeposit = await window.prepaidEsInstance.balanceOf(fundsBucketAddress);
      this.setState({ fundsDeposit });
    })();

    (async () => {
      const sumBN = (
        await window.provider.getLogs({
          address: window.prepaidEsInstance.address,
          fromBlock: 0,
          toBlock: 'latest',
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            ethers.utils.hexZeroPad(fundsBucketAddress, 32),
            ethers.utils.hexZeroPad(window.tsgapLiquidInstance.address, 32),
          ],
        })
      )
        .map((log) => ethers.BigNumber.from(log.data))
        .reduce((sumBN, valueBN) => sumBN.add(valueBN), ethers.constants.Zero);
      console.log({ sumBN });

      this.setState({ pendingBenefits: sumBN });
    })();

    (async () => {
      const sumBN = (
        await window.tsgapLiquidInstance.queryFilter(
          window.tsgapLiquidInstance.filters.FundsDeposited(null)
        )
      )
        .map((log) => window.tsgapLiquidInstance.interface.parseLog(log))
        .map((log) => hexToNum(log.args['depositAmount']))
        .reduce((prevValue, currValue) => +prevValue + currValue, 0);

      console.log({ sumBN });

      this.setState({ fundsAdded: sumBN });
    })();
  };

  render = () => {
    const oldTotalBountAllocated = 3791312;
    const totalBountAllocated: number = oldTotalBountAllocated + this.state.fundsAdded;
    const tillNowConsumed = hexToNum(this.state.pendingBenefits) + oldTotalBountAllocated;
    const currentAvailableBounty = totalBountAllocated - tillNowConsumed;

    return (
      <Layout
        breadcrumb={['Home', 'PET']}
        title="TSGAP Right SAP for Achievers "
        transparent={true}
        buttonName="New SIP"
        buttonOnClick={
          window.wallet && window.wallet.address
            ? () => this.props.history.push('/assurance/new')
            : () => (
                (window.returnLocationAfterLoadWallet = {
                  name: 'New SIP',
                  location: '/assurance/new',
                  sourceLocation: this.props.location.pathname,
                }),
                this.setState({ showLoginModal: true })
              )
        }
      >
        <div
          className="container pinside30 position-top"
          style={{
            backgroundColor: '#EFF3F8 !important',
            marginBottom: '30px',
            borderRadius: '20px',
          }}
        >
          <h2 style={{ marginTop: '1rem' }}>TSGAP Right SAP for Achievers </h2>
          <p style={{ marginBottom: '1rem' }}>
            TimeAlly Super Goal Achiever Plan (TSGAP) is a decentralized Smart Contract powered
            Systematic Accumulation Plan to safeguard your interest so that you can have a helping
            hand to support you achieving your goal & make the most of your golden years with
            financial independence{' '}
          </p>
        </div>
        <div className="row tsgap-fet">
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/guarntee.png" />
              </div>
              <h3 className="number-title">Guarantee </h3>
              <p>
                TimeAlly Guarantee Transparency of Rewards allocated in advance through pre-defined
                rules of Smart Contract
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/power-of-compounding.png" />
              </div>
              <h3 className="number-title">Power of Compounding</h3>
              <p>
                With TimeAlly Power of Compounding, user can restake ES Utility using their rewards
                to constantly grow the principal amount{' '}
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/booster-bonus.png" />
              </div>
              <h3 className="number-title">Booster Bonus</h3>
              <p>
                End of every three years, stakers are eligible for Power Booster bonus through Smart
                Contract{' '}
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/dayswappers-reward.png" />
              </div>
              <h3 className="number-title">Day Swappers Reward</h3>
              <p>
                Receive additional rewards to achieve your goals, by introducing TimeAlly Plans to
                your circle and bringing individuals onboard{' '}
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/nominate.png" />
              </div>
              <h3 className="number-title">Nominate Your Legacy</h3>
              <p>
                Stakers can nominate their trusted ones in their Accumulation Plans, who will act on
                stakers behalf after its inactivity
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/appointees-tsgap.png" />
              </div>
              <h3 className="number-title">Appointees</h3>
              <p>
                The appointee is the custodian who can facilitate preponement of benefits to the
                nominee, staker can add multiple number of appointees
              </p>
            </div>
          </div>
        </div>
        <div className="outline pinside30 custom-background">
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Total bounty allocated budget for TimeAlly PET:</strong> {totalBountAllocated}{' '}
            ES
            {this.state.eraSwapPrice
              ? ` (~${totalBountAllocated * this.state.eraSwapPrice} USDT)`
              : null}
            {this.state.fundsAdded ? (
              <>
                <br />
                Currently {this.state.fundsAdded} ES available (out of 20M), and next will be
                released when current bucket is consumed
              </>
            ) : null}
          </p>
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Current available bounty (out of 20M ES):</strong>{' '}
            {/* {this.state.fundsDeposit ? lessDecimals(this.state.fundsDeposit) + ' ES' : 'Loading...'}
          {this.state.eraSwapPrice && this.state.fundsDeposit
            ? ` (~${
                (this.state.fundsDeposit ? +ethers.utils.formatEther(this.state.fundsDeposit) : 0) *
                (this.state.eraSwapPrice || 0)
              } USDT)`
            : null} */}
            {currentAvailableBounty ? currentAvailableBounty + ' ES' : 'Loading...'}
            {this.state.eraSwapPrice && currentAvailableBounty
              ? ` (~${
                  (currentAvailableBounty ? +currentAvailableBounty : 0) * this.state.eraSwapPrice
                } USDT)`
              : null}
          </p>
          <img src="./images/timeally-tsgap.png" className="robo-img" />
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Till now Consumed (out of 20M ES):</strong>{' '}
            {tillNowConsumed ? tillNowConsumed + ' ES' : 'Loading...'}
            {this.state.eraSwapPrice && tillNowConsumed
              ? ` (~${
                  (tillNowConsumed ? +tillNowConsumed : 0) * (this.state.eraSwapPrice || 0)
                } USDT)`
              : null}
          </p>
          <Button
            style={{ margin: '10px auto' }}
            onClick={
              window.wallet && window.wallet.address
                ? () => this.props.history.push('/assurance/prepaid-es')
                : () => (
                    (window.returnLocationAfterLoadWallet = {
                      name: 'PET Prepaid ES',
                      location: '/assurance/prepaid-es',
                      sourceLocation: this.props.location.pathname,
                    }),
                    this.setState({ showLoginModal: true })
                  )
            }
          >
            PET Prepaid ES
          </Button>
          <Button
            onClick={
              window.wallet && window.wallet.address
                ? () => this.props.history.push('/assurance/view')
                : () => (
                    (window.returnLocationAfterLoadWallet = {
                      name: 'View My PETs',
                      location: '/assurance/view',
                      sourceLocation: this.props.location.pathname,
                    }),
                    this.setState({ showLoginModal: true })
                  )
            }
          >
            View My SIPs
          </Button>
          <br />
          <div style={{ display: 'block', maxWidth: '500px', margin: '0 auto' }}>
            <Button onClick={() => this.props.history.push('/assurance/calculate')}>
              SAP Calculator
            </Button>
          </div>
        </div>
        <Modal
          show={this.state.showLoginModal}
          onHide={() => this.setState({ showLoginModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Wallet Needed</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              You need to load your ethereum wallet in order to proceed. Please click the below
              button to go to the load wallet page.
            </p>
            <Button onClick={() => this.props.history.push('/load-wallet')} variant="primary">
              Go to Load Wallet Page
            </Button>
          </Modal.Body>
        </Modal>
      </Layout>
    );
  };
}

export default PET;
