import React, { Component } from 'react';
//@ts-ignore
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { es } from 'eraswap-sdk/dist';
import { ethers } from 'ethers';

interface Props {
  navigation: any;
}

type State = {
  currentScreen: Number;
  spinner: boolean;
  open: boolean;
  plan: number;
  userAmount: Number;
};

export class NewSip extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spinner: false,
      open: false,
      currentScreen: 0,
      plan: -1,
      userAmount: 0,
    };
  }

  componentDidMount = async () => {
    this.fetchNewSip().catch((e) => console.log(e));
  };

  onFirstSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.tsgapLiquidInstance
        .connect(window.wallet.connect(window.provider))
        .newSIP(this.state.plan, {
          value: ethers.utils.parseEther(this.state.userAmount.toString()),
        });
      const receipt = tx.wait();
      console.log('receipt Sip', receipt);
      this.fetchNewSip();
    } catch (error) {
      const readableError = es.utils.parseEthersJsError(error);
      console.log(`Error: ${readableError}`);
    }
    this.setState({
      spinner: false,
    });
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
    sipNew.map((log) => {});
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { navigation } = this.props;
    let screen;
    const startOverAgainButton = (
      <span
        style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}
        onClick={() => this.setState({ currentScreen: 0 })}
      >
        {'<'}Start All Over
      </span>
    );

    if (this.state.currentScreen === 0) {
      screen = (
        <>
          {/* <button className="btn" onClick={this.onOpenModal}>Open modal</button> */}
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
          <Card>
            <Form
              className="mnemonics custom-width"
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>New Assurance SIP</h3>

              <Form.Group controlId="sipAmount">
                <Form.Control
                  className="stakingInput"
                  onChange={(event) => this.setState({ userAmount: Number(event.target.value) })}
                  value={Number(this.state.userAmount)}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter commitment amount for SIP"
                  style={{ width: '325px' }}
                  // isInvalid={this.state.insufficientBalance}
                />

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    as="select"
                    onChange={(event) => this.setState({ plan: Number(event.target.value) })}
                    style={{ width: '325px' }}
                  >
                    <option disabled selected={this.state.plan === -1}>
                      Select Assurance Plan
                    </option>
                    <option value="0" selected={this.state.plan === 0}>
                      Min 100 ES, 16%, 12 Months / 9 Years
                    </option>
                    <option value="1" selected={this.state.plan === 1}>
                      Min 500 ES, 18%, 12 Months / 9 Years
                    </option>
                    <option value="2" selected={this.state.plan === 2}>
                      Min 1000 ES, 20%, 12 Months / 9 Years
                    </option>
                    <option value="3" selected={this.state.plan === 3}>
                      Min 10000 ES, 22%, 12 Months / 9 Years
                    </option>
                    <option value="4" selected={this.state.plan === 4}>
                      Min 100000 ES, 24%, 12 Months / 9 Years
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form.Group>
              <Button variant="primary" id="firstSubmit" type="submit" onClick={this.onFirstSubmit}>
                {this.state.spinner ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '2px' }}
                  />
                ) : null}
                {this.state.spinner ? 'Please wait..' : 'Submit'}
              </Button>
            </Form>
          </Card>
        </>
      );
    } else {
      screen = (
        <>
          <Card>
            <div
              className="custom-width"
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>SIP confirmed!</h3>
              <Alert variant="success">
                Your SIP is initiated. You can view your transaction on{' '}
                <a style={{ color: 'black' }} href="" target="_blank" rel="noopener noreferrer">
                  EtherScan
                </a>
              </Alert>
              <Button
                onClick={() => {
                  navigation.navigate('/assurance/view');
                }}
              >
                Go to View Assurance SIPs
              </Button>
            </div>
          </Card>
        </>
      );
    }
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-breadcrumb"></div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white pinside30">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                      <h1 className="page-title">New Assurance</h1>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {screen}
      </div>
    );
  }
}
