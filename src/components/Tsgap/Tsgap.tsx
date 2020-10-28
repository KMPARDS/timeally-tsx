import React, { Component } from 'react';
import { renderSecondsRemaining, routine } from '../../utils';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Tsgap';
// import LayoutTsgap from '../../components/Tsgap/LayoutTsgap';

type Props = {};

type State = {
  showLoginModal: boolean;
};

export class Tsgap extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoginModal: false,
    };
  }

  componentDidMount = async () => {};

  render() {
    return (
      <div>
        <div className="page-header-pet page-header-tsgap ">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="pinside30">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                      <h1 className="page-title-pet">TSGAP Right SAP for Achievers</h1>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                    <Button href="/new" className="custom-button">
                      New SAP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background-tsgap">
          <div className="container">
            <div className="container pinside30 position-top">
              <h2 style={{ marginTop: '1rem' }}>TSGAP Right SAP for Achievers </h2>
              <p style={{ marginBottom: '1rem' }}>
                TimeAlly Super Goal Achiever Plan (TSGAP) is a decentralized Smart Contract powered
                Systematic Accumulation Plan to safeguard your interest so that you can have a
                helping hand to support you achieving your goal & make the most of your golden years
                with financial independence{' '}
              </p>
              <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                <Button href="/view" className="custom-button">
                  View My SAP
                </Button>
              </div>
            </div>

            <div className="row tsgap-fet">
              <div className="col-xl-4 col-md-12">
                <div className="bg-white pinside306090 number-block outline mb60 bg-boxshadow">
                  <div className="circle circle-pet">
                    <img src="./images/guarntee.png" />
                  </div>
                  <h3 className="number-title">Guarantee </h3>
                  <p>
                    TimeAlly Guarantee Transparency of Rewards allocated in advance through
                    pre-defined rules of Smart Contract
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
                    With TimeAlly Power of Compounding, user can restake ES Utility using their
                    rewards to constantly grow the principal amount{' '}
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
                    End of every three years, stakers are eligible for Power Booster bonus through
                    Smart Contract{' '}
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
                    Receive additional rewards to achieve your goals, by introducing TimeAlly Plans
                    to your circle and bringing individuals onboard{' '}
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
                    Stakers can nominate their trusted ones in their Accumulation Plans, who will
                    act on stakers behalf after its inactivity
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

            <div
              className="outline pinside30 tsgap-sip-bg"
              style={{ marginBottom: '1rem', backgroundColor: '#5da7c0' }}
            >
              <div className="row">
                <div className="col-xl-4">
                  {' '}
                  <img src="./images/timeally-tsgap.png" className="tsgap-img" />
                </div>
                <div className="col-xl-8">
                  <p>
                    <strong>ES Bucket In Smart Contract:</strong>{' '}
                  </p>
                  <p>
                    <strong>Benefits Already Alloted:</strong>{' '}
                  </p>
                  <Button href="https://eraswap.info/" style={{ margin: '10px auto' }}>
                    SAP Calculator
                  </Button>

                  <Button href="/view" style={{ marginLeft: '10px', marginTop: '10px' }}>
                    View My SAPs
                  </Button>
                  <p style={{ marginTop: '1rem' }}>
                    <strong>SAP Smart Contract Link:</strong>{' '}
                    <a
                      href="https://etherscan.io/address/0xbad9af4db5401b7d5e8177a18c1d69c35fc03fd3#code"
                      target="_blank"
                      style={{ color: '#000', textDecoration: 'underline' }}
                    >
                      EtherScan
                    </a>
                  </p>
                </div>
              </div>
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
              <Button
                // onClick={() => this.props.history.push('/load-wallet')}
                variant="primary"
              >
                Go to Load Wallet Page
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}
