import React, { Component } from 'react';
import { renderSecondsRemaining, routine } from '../../utils';
import { Button, Modal } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import './Tsgap';
// import LayoutTsgap from '../../components/Tsgap/LayoutTsgap';

type Props = {};

type State = {
  showLoginModal: boolean;
  newSipEvent: NewSipEvent[];
  spinner: boolean;
  open: boolean;
  walletAddress: string | undefined;
};

interface NewSipEvent {
  staker: string;
  sipId: number;
  monthlyCommitmentAmount: number;
}

export class Tsgap extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spinner: false,
      open: false,
      newSipEvent: [],
      showLoginModal: false,
      walletAddress: '',
    };
  }

  componentDidMount = async () => {
    this.fetchAdress();
    this.fetchNewSip().catch((e) => console.log(e));
  };

  fetchAdress = async () => {
    this.setState({
      walletAddress: window.wallet?.address,
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  async fetchNewSip() {
    const data = await window.tsgapLiquidInstance.queryFilter(
      window.tsgapLiquidInstance.filters.NewSIP(null, null, null)
    );
    console.log('fetchsip', data);
    const sipNew = data.map((log) => {
      return window.tsgapLiquidInstance.interface.parseLog(log);
    });
    console.log('check a', sipNew);
    const newSipData = sipNew.map((log) => ({
      staker: log.args['staker'],
      sipId: log.args['sipId'],
      monthlyCommitmentAmount: log.args['monthlyCommitmentAmount'],
    }));
    this.setState({
      newSipEvent: newSipData,
    });
  }

  render() {
    console.log('walletAddress is ', this.state.walletAddress);
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
                <Button href={'/view/' + this.state.walletAddress} className="custom-button">
                  View My SIP
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

                  <Button
                    href={'/view/' + this.state.walletAddress}
                    style={{ marginLeft: '10px', marginTop: '10px' }}
                  >
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

          <Modal show={this.state.open}>
            <div style={{ padding: '2rem' }}>
              <h2>Terms & Conditions</h2>
              <h5>
                Please scroll and read the complete document carefully, then if you agree then you
                can select proceed option.
              </h5>
              <hr></hr>
              <div style={{ overflowY: 'scroll', height: '500px' }}>
                <p style={{ fontSize: '12px' }}>
                  The Eraswapfoundation OU is a group of developers and technology professionals who
                  are passionate about the potential of decentralized applications. It does not own
                  or lead the TimeAllySIP ("TimeAllySIP"), but rather supports and develops the
                  free, open-source & decentralize applications.<br></br>
                  <br></br>
                  The Eraswap Foundation is not a bank or financial institution and does not provide
                  investment or financial advice or consulting services to users. Eraswap Foundation
                  makes no warranties or representations, express or implied, on products offered
                  through the platform. It accepts no liability for any damages or losses, however
                  caused, in connection with the use of, or on the reliance of decentralized
                  application, products or related services.<br></br>
                  <br></br>
                  In no way are the owners of, or contributors to, the Website responsible for the
                  actions, decisions, or other behavior taken or not taken by user in reliance upon
                  the Website. Users not authorized and nor should they rely on the Website for any
                  legal advice, business advice, or advice of any kind. User should act at their own
                  risk in reliance on the contents of the Web interface.<br></br>
                  <br></br>
                  TimeAllySIP is a DApp which refers to a suite of protocols using decentralized
                  application. TimAlly is a decentralized application whish run on P2P network of
                  computers. TimeAllySIP uses Ethereum Virtual Machine (“EVM”), which can execute
                  code of arbitrary algorithmic complexity. TimeAllySIP uses distributed ledger
                  technology which is neither stored in a centralized location nor managed by any
                  single entity.<br></br>
                  <br></br>
                  The New Released Token (NRT) distribution, Vesting, rewards are completely
                  governed by TimeAllySIP DApp as per the predefined rules which is system driven &
                  by the user itself. No organization, institute, human or personnel intervention is
                  authorized to control or alter or modify the system driven software<br></br>
                  <br></br>
                  <span style={{ fontWeight: 'bold' }}>
                    Important Guidelines for Users about TimeAllySIP DAPP
                  </span>
                  <br></br>
                  <br></br>
                  1. The user should carefully review the whitepaper and website content of
                  TimeAllySIP DApp to familiarize with the Smart Contract logics & Assurance plans.
                  <br></br>
                  <br></br>
                  2. The User should understand, acknowledge that assuring in TimeAllySIP are
                  subject to market risks and no assurance on the valuation & its returns since it
                  depends solely on the user itself & distribution is governed by DApp .<br></br>
                  <br></br>
                  3. The Users should read carefully about the vesting plans and completely
                  understands the risk factors associated with the vesting plans on the date of the
                  transaction and thereafter. The user should consider their specific requirements
                  before choosing any assurance plan with TimeAllySIP DApp.<br></br>
                  <br></br>
                  4. The Users are advised that the assuring in TimeAllySIP is based and dependent
                  on the submission of information by user and the User shall be solely responsible
                  for any submission of incorrect or non-submission/omission of necessary and
                  accurate information. The User confirms and believes that transaction/s undertaken
                  is/are appropriate for the User as per the objective of the User.<br></br>
                  <br></br>
                  5. The User should confirm that the decision for vesting, claiming or undertaking
                  any transaction on the TimeAllySIP DApp is taken with complete knowledge &
                  ownership with user itself. <br></br>
                  <br></br>
                  The User should recognize vesting in Time Ally involves certain risks and will
                  take full cognizance of and understand all of the risk factors related before
                  investing in Time Ally Contracts<br></br>
                  <br></br>
                  7. The User should understand and accept complete responsibility & liability for
                  any damages or losses, however caused, in connection with the vesting, use of, or
                  on the reliance of DApp. <br></br>
                  <br></br>
                  8. Do not participate in offerings where one or more people offer you a guaranteed
                  return in exchange for an upfront deposit. The end result is that usually a lot of
                  people loose a lot. Guarantee is given on something which you control or hold.
                  TimeAllySIP Vault holds the token. Thus the guarantee can be given by Smart
                  Contract as they hold all the tokens which will be released over next 50 years. It
                  can guarantee only the release of Era Swap (ES) from NRT Pool. Because all tokens
                  which are to be released in future are stored in vault and are distributed based
                  on the work performed by the users among them<br></br>
                  <br></br>
                  9. Era Swap doesn’t guarantees any Fiat or Crypto because Era Swap doesn’t control
                  any Fiat or any other cryptocurrency. Era Swap token (ES) can only be used in the
                  Eco System. ES can not be used outside Era swap Ecosystem.<br></br>
                  <br></br>
                  10. The User can claim rewards based on the work performed in the ecosystem or
                  vesting done in TimeAllySIP. As per preset rules, if the user has performed tasks,
                  then they are eligible for rewards. In this case only, user can come and withdraw
                  from TimeAllySIP DApp. The users will be solely responsible for claiming the
                  rewards.<br></br>
                  <br></br>
                  11. Phishing websites often go hand-in-hand with phishing emails. Phishing emails
                  can link to a replica website designed to steal login credentials or prompt one to
                  install malware. Do not install software or log in to a website unless you are
                  100% sure it isn't a fake one. Phishing websites may also appear as sponsored
                  results on search engines or in app marketplaces used by mobile devices. Be wary
                  that you aren't downloading a fake app or clicking a sponsored link to a fake
                  website. It is completely on User’s risk and the user is only liable for any such
                  activity.<br></br>
                  <br></br>
                  No warranties<br></br>
                  <br></br>
                  The TimeAllySIP DApp is opted by users on an "as is" basis without any warranties
                  of any kind regarding the Website interface and/or any content, data, materials
                  and/or services provided on the Website.<br></br>
                  <br></br>
                  THE TIMEALLYSIP DAPP SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
                  SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
                  OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
                  <br></br>
                  <br></br>
                  <a onClick={this.onCloseModal} className="btn btn-primary btn-sm">
                    <span className="text-white">Proceed</span>
                  </a>
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
