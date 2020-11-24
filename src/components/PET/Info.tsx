import Axios from 'axios';
import { addresses } from 'eraswap-sdk/dist';
import React, { Component, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { hexToNum } from '../../utils';
import Layout from '../Layout/LayoutPET';

// import axios from 'axios';
type IProps = {};

type PETProps = IProps & RouteComponentProps;

type State = {
  fundsDeposit: number;
  pendingBenefits: number;
  showLoginModal: boolean;
  eraSwapPrice: number;
  fundsAdded: number;
};

const ethers = require('ethers');

class PET extends Component<PETProps, State> {
  state: State = {
    fundsDeposit: -1,
    pendingBenefits: -1,
    showLoginModal: false,
    eraSwapPrice: -1,
    fundsAdded: -1,
  };

  componentDidMount = async () => {
    // const fundsBucketAddress = await window.petInstance.functions.fundsBucket();

    (async () => {
      const response = await Axios.get('https://apis.eraswap.info/third-party/es-price');

      if (!response.data.status) return console.log('Error in Probit API:', response);

      this.setState({ eraSwapPrice: +response.data.probitResponse.data[0].last });
    })();

    (async () => {
      const fundsDeposit = await window.provider.getBalance(
        process.env.REACT_APP_NODE_ENV
          ? addresses.development.ESN.petPrepaid
          : addresses.production.ESN.petPrepaid
      );

      this.setState({ fundsDeposit: hexToNum(fundsDeposit) });
    })();

    (async () => {
      const sumBN = await window.petFundsInstance.queryFilter(
        window.petFundsInstance.filters.FundsDeposited(null, null)
      );
      console.log({ sumBN });
    })();

    // (async() => {
    //   const sumBN = (await window.provider.getLogs({
    //     address: window.esInstance.address,
    //     fromBlock: 0,
    //     toBlock: 'latest',
    //     topics:[
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       ethers.utils.hexZeroPad(fundsBucketAddress, 32),
    //       ethers.utils.hexZeroPad(window.petInstance.address, 32)
    //     ]
    //   })).map(log => ethers.utils.bigNumberify(log.data) ).reduce( (sumBN, valueBN) => sumBN.add(valueBN), ethers.constants.Zero);

    //   this.setState({ pendingBenefits: sumBN });
    // })();

    // (async() => {
    //   const sumBN = (await window.provider.getLogs({
    //     address: fundsBucketAddress,
    //     fromBlock: 0,
    //     toBlock: 'latest',
    //     topics:[ethers.utils.id('FundsDeposited(address,uint256)')]
    //   })).map(log => {
    //     const bn = ethers.utils.bigNumberify(sliceDataTo32Bytes(log.data,1));
    //     console.log(ethers.utils.formatEther(bn));
    //     return bn;
    //   } ).reduce( (sumBN, valueBN) => sumBN.add(valueBN), ethers.constants.Zero);

    //   this.setState({ fundsAdded: sumBN });
    // })();
  };

  render() {
    return (
      <Layout
        breadcrumb={['Home', 'PET']}
        title="Personal EraSwap Teller: Old"
        transparent={true}
        buttonName="Create PET"
        buttonOnClick={
          window.wallet && window.wallet.address
            ? () => this.props.history.push('/pet-old/new')
            : () => (
                (window.returnLocationAfterLoadWallet = {
                  name: 'Create PET',
                  location: '/pet-old/new',
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
          <h2 style={{ marginTop: '1rem' }}>TimeAlly PET</h2>
          <p style={{ marginBottom: '1rem' }}>
            Time Ally PET (Personal Era Swap Teller) Plan is Systematic Accumulation Plan which is
            designed to support with additonal PET bounty by 50% of the Monthly commitment selected
            by staker and reward with annuity and PET bonus consistently for 5 years to provide
            maximum gains to meet the future milestone.
          </p>
          <Button
            onClick={
              window.wallet && window.wallet.address
                ? () => this.props.history.push('/pet-old/view')
                : () => (
                    (window.returnLocationAfterLoadWallet = {
                      name: 'View My PETs',
                      location: '/pet-old/view',
                      sourceLocation: this.props.location.pathname,
                    }),
                    this.setState({ showLoginModal: true })
                  )
            }
          >
            View My PETs
          </Button>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Companion.png" />
              </div>
              <h3 className="number-title">Companion</h3>
              <p>
                100% Additional bounty for your next 12 month ES Accumulation Guaranteed by PET
                Smart Contract.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Flexible.png" />
              </div>
              <h3 className="number-title">Flexible</h3>
              <p>
                Choose your PET Plan as per your Monthly Goals & Exepected Gains to meet your
                milestones.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Assurance.png" />
              </div>
              <h3 className="number-title">Assurance</h3>
              <p>
                Assures monthly annuity gain consistently for 5 Annuity Years based on your Monthly
                Goals Achievement.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/bonuss.png" />
              </div>
              <h3 className="number-title">Pet Bonus</h3>
              <p>
                End of every five months, stakers are eligible for PET bonus through Smart Contract.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Secure.png" />
              </div>
              <h3 className="number-title">Consistent & Secured</h3>
              <p>
                Smart Contract based safety, security & stability on your accumulations with a
                predefined set of rules.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Empower.png" />
              </div>
              <h3 className="number-title">Empower</h3>
              <p>
                Pet provides you complete control & transparency on your Monthly Accumulations &
                Returns.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/DayswappersRewards.png" />
              </div>
              <h3 className="number-title">Day Swappers Rewards</h3>
              <p>
                Help others to achieve their goals to achieve your own through Day Swappers Rewards.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Guarantee.png" />
              </div>
              <h3 className="number-title">Guarantee</h3>
              <p>Complete Transparency of Rewards Allocated in Advance through Smart Contracts.</p>
            </div>
          </div>
          <div className="col-xl-4 col-md-12">
            <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
              <div className="circle circle-pet">
                <img src="./images/Appointees.png" />
              </div>
              <h3 className="number-title">Appointees</h3>
              <p>
                Trustless consensus after inactivity using multi-signing by assigned Appointees in
                PET for monthly SAP.
              </p>
            </div>
          </div>
        </div>
        <div className="outline pinside30 custom-background">
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Total bounty allocated budget for TimeAlly PET:</strong> 20000000 ES
            {this.state.eraSwapPrice
              ? ` (~${
                  20000000 * (this.state.eraSwapPrice !== null ? this.state.eraSwapPrice : 0)
                } USDT)`
              : null}
            {this.state.fundsAdded ? (
              <>
                <br />
                Currently{' '}
                {
                  // window.lessDecimals(this.state.fundsAdded)
                }{' '}
                ES available (out of 20M), and next will be released when current bucket is consumed
              </>
            ) : null}
          </p>
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Current available bounty (out of 20M ES):</strong>
            {this.state.fundsDeposit !== -1 ? this.state.fundsDeposit + ' ES' : 'Loading...'}
            {this.state.eraSwapPrice && this.state.fundsDeposit
              ? ` (~${
                  (this.state.fundsDeposit ? +this.state.fundsDeposit : 0) * this.state.eraSwapPrice
                } USDT)`
              : null}
          </p>
          <img src="./images/pet-robo.png" className="robo-img" />
          <p className="text-white" style={{ textShadow: '0 0 3px #000a' }}>
            <strong>Till now Consumed (out of 20M ES):</strong>
            {this.state.pendingBenefits ? this.state.pendingBenefits + ' ES' : 'Loading...'}
            {this.state.eraSwapPrice && this.state.pendingBenefits
              ? ` (~${
                  (this.state.pendingBenefits
                    ? +ethers.utils.formatEther(this.state.pendingBenefits)
                    : 0) * this.state.eraSwapPrice
                    ? this.state.eraSwapPrice
                    : 0
                } USDT)`
              : null}
          </p>
          <Button
            style={{ margin: '10px auto' }}
            onClick={
              window.wallet && window.wallet.address
                ? () => this.props.history.push('/pet-old/prepaid-es')
                : () => (
                    (window.returnLocationAfterLoadWallet = {
                      name: 'PET Prepaid ES',
                      location: '/pet-old/prepaid-es',
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
                ? () => this.props.history.push('/pet-old/view')
                : () => (
                    (window.returnLocationAfterLoadWallet = {
                      name: 'View My PETs',
                      location: '/pet-old/view',
                      sourceLocation: this.props.location.pathname,
                    }),
                    this.setState({ showLoginModal: true })
                  )
            }
          >
            View My PETs
          </Button>
          <br />
          <div style={{ display: 'block', maxWidth: '500px', margin: '0 auto' }}>
            <Button
              className="text-white pet-links"
              href="/excel/PET_Calculator.xlsx"
              target="_blank"
              style={{ color: '#000', textDecoration: 'underline', textShadow: '0 0 3px #000a' }}
            >
              PET Illustration Excel
            </Button>
            <Button
              className="text-white pet-links"
              href="/pdf/TimeAlly_PET_without_DaySwappers_Incentive.pdf"
              target="_blank"
              style={{ color: '#000', textDecoration: 'underline', textShadow: '0 0 3px #000a' }}
            >
              PET Presenter
            </Button>
            <Button
              className="text-white pet-links"
              href="/pdf/PETFAQs.pdf"
              target="_blank"
              style={{ color: '#000', textDecoration: 'underline', textShadow: '0 0 3px #000a' }}
            >
              PET FAQs
            </Button>
            <Button
              className="text-white pet-links"
              href="https://etherscan.io/address/0x69e7960f6A1d6332a4be7e22916F627a3d95b1bc#code"
              target="_blank"
              style={{ color: '#000', textDecoration: 'underline', textShadow: '0 0 3px #000a' }}
            >
              PET Smart Contract
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
  }
}

export default withRouter(PET);
