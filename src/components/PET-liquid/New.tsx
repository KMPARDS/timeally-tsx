import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '../Layout/LayoutPET';
import TransactionModal from '../TransactionModal/TransactionModal';

const esContract = '';
const PET = '';
const ethers = require('ethers');

interface PropsInterface extends RouteComponentProps<any> {}

type State = {
  currentScreen: number;
  userAmount: number;
  step1DisplayButton: boolean;
  plan: number;
  spinner: boolean;
  waiting: boolean;
  approveTxHash: string;
  txHash: string;
  open: boolean;
  errorMessage: string;
  showNewPetTransactionModal: boolean;
  targetDepositAmount: number;
  errorDisplay: boolean;
  errorDisplayText: string;
};

class New extends Component<PropsInterface, State> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      currentScreen: 0,
      userAmount: 0,
      step1DisplayButton: false,
      plan: -1,
      spinner: false,
      waiting: false,
      approveTxHash: '',
      txHash: '',
      open: false,
      errorMessage: '',
      showNewPetTransactionModal: false,
      targetDepositAmount: 0,
      errorDisplay: false,
      errorDisplayText: '',
    };
  }

  componentDidMount = async () => {
    this.onOpenModal();
  };

  onPlanChange = (event: any) => {
    this.setState({ plan: +event.target.value });
    // console.log(event);
    this.checkAmount();
  };

  checkAmount = () => {
    if (this.state.plan !== undefined) {
      let isOk = false;
      const amountBN = ethers.utils.parseEther(this.state.userAmount);
      if (this.state.plan === 0) {
        if (amountBN.gte('1000') && amountBN.lt('2000')) throw 'Amount should be from 1000 to 1999';
      } else if (this.state.plan === 1) {
        if (amountBN.gte('2000') && amountBN.lt('5000')) throw 'Amount should be from 2000 to 4999';
      } else if (this.state.plan === 2) {
        if (amountBN.gte('5000') && amountBN.lt('10000'))
          throw 'Amount should be from 5000 to 9999';
      } else if (this.state.plan === 3) {
        if (amountBN.gte('10000') && amountBN.lt('20000'))
          throw 'Amount should be from 10000 to 19999';
      } else if (this.state.plan === 4) {
        if (amountBN.gte('20000')) throw 'Amount should be atleast 20000';
      }
    }
  };

  onAmountUpdate = (event: any) => {
    try {
      const amountBN = ethers.utils.parseEther(event.target.value);
      // this.checkAmount();
      let plan = -1;
      if (
        amountBN.gte(ethers.utils.parseEther('500')) &&
        amountBN.lt(ethers.utils.parseEther('1000'))
      ) {
        plan = 0;
      } else if (
        amountBN.gte(ethers.utils.parseEther('1000')) &&
        amountBN.lt(ethers.utils.parseEther('2500'))
      ) {
        plan = 1;
      } else if (
        amountBN.gte(ethers.utils.parseEther('2500')) &&
        amountBN.lt(ethers.utils.parseEther('5000'))
      ) {
        plan = 2;
      } else if (
        amountBN.gte(ethers.utils.parseEther('5000')) &&
        amountBN.lt(ethers.utils.parseEther('10000'))
      ) {
        plan = 3;
      } else if (amountBN.gte(ethers.utils.parseEther('10000'))) {
        plan = 4;
      }
      this.setState({
        userAmount: ethers.utils.formatEther(amountBN),
        errorDisplay: false,
        errorDisplayText: '',
        plan,
      });
    } catch (error) {
      console.log(error.message);
      this.setState({
        userAmount: 0,
        errorDisplay: event.target.value !== '',
        errorDisplayText: event.target.value !== '' ? error.message : '',
      });
    }
  };

  onFirstSubmit = async (event: any) => {
    event.preventDefault();

    await this.setState({ spinner: true, errorDisplay: false, errorDisplayText: '' });

    const petPlan = await window.petLiquidInstance.petPlans(this.state.plan);
    console.log({ petPlan });

    if (
      ethers.utils.parseEther(this.state.userAmount).gte(petPlan.minimumMonthlyCommitmentAmount)
    ) {
      this.setState({
        spinner: false,
        currentScreen: 1,
        // targetDepositAmount: ethers.utils.formatEther(petPlan.minimumMonthlyCommitmentAmount)
      });
    } else {
      this.setState({
        spinner: false,
        errorDisplay: true,
        errorDisplayText: `Low Contribution Amount: Your entered self contribution ${
          this.state.userAmount
        } ES should be more than minimum self contribution target ${ethers.utils.formatEther(
          petPlan.minimumMonthlyCommitmentAmount
        )} ES for the selected plan`,
      });
    }
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
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
      let amountPlaceholder = 'Enter Self ES Monthly Deposit Target';
      switch (this.state.plan) {
        case 0:
          amountPlaceholder = 'Enter Self Target (500 to 999 ES)';
          break;
        case 1:
          amountPlaceholder = 'Enter Self Target (1000 to 2499 ES)';
          break;
        case 2:
          amountPlaceholder = 'Enter Self Target (2500 to 4999 ES)';
          break;
        case 3:
          amountPlaceholder = 'Enter Self Target (5000 to 9999 ES)';
          break;
        case 4:
          amountPlaceholder = 'Enter Self Target (10000 and above ES)';
          break;
      }
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
                  Era Swap is a group of developers and technology professionals who are passionate
                  about the potential of decentralized applications. It does not own or lead the
                  “TimeAlly PET”, but rather supports and develops the free, open-source &
                  decentralized applications.
                  <br />
                  <br />
                  The Era Swap is not a bank or financial institution and does not provide
                  investment or financial advice or consulting services to users. Era Swap
                  Foundation makes no warranties or representations, express or implied, on products
                  offered through the platform. It accepts no liability for any damages or losses,
                  however, caused in connection with the use of, or on the reliance of decentralized
                  application, products or related services.
                  <br />
                  <br />
                  In no way, we are the owners of or contributors to the Website responsible for the
                  actions, decisions, or other behaviour taken or not taken by the user in reliance
                  upon this Website. Users should not authorize and nor should they rely on the
                  Website for any legal advice, business advice, or advice of any kind. Users should
                  act at their own risk in reliance on the contents of the Web interface.
                  <br />
                  <br />
                  TimeAlly PET is a DApp that refers to a suite of protocols using decentralized
                  application. TimeAlly is a decentralized application that runs on a P2P network of
                  computers. TimeAlly PET uses the Ethereum Virtual Machine (“EVM”), which can
                  execute code of arbitrary algorithmic complexity. TimeAlly PET uses distributed
                  ledger technology which is neither stored in a centralized location nor managed by
                  any single entity. No organization, institute, human or personnel intervention is
                  authorized to control or alter or modify the system driven software.
                  <br />
                  <br />
                  <b>TimeAlly PET Important Guidelines</b>
                  <br />
                  1. The user should carefully read the Website content, White Paper & PET
                  demonstration of TimeAlly PET DApp to familiarize with the Smart Contract logics &
                  PET plans.
                  <br />
                  2. The User should understand and acknowledge that assuring in TimeAlly PET is
                  subject to market risks and no PET on the valuation & its returns since it depends
                  solely on the user itself & distribution is governed by DApp.
                  <br />
                  3. Users should read carefully about the vesting plans and completely understand
                  the risk factors associated with the vesting plans on the date of the transaction
                  and thereafter. The user should consider their specific requirements before
                  choosing any PET plan with TimeAlly PET DApp.
                  <br />
                  4. Users are advised that the assuring in TimeAlly PET is based and dependent on
                  the submission of information by the user and the user shall be solely responsible
                  for any submission of incorrect or non-submission/omission of necessary and
                  accurate information. The User confirms and believes that transaction/s undertaken
                  is/are appropriate for the User as per the objective of the User.
                  <br />
                  5. The User should confirm that the decision for vesting, claiming or undertaking
                  any transaction on the TimeAlly PET DApp is taken with complete knowledge &
                  ownership with the user itself.
                  <br />
                  6. The User should recognize that vesting in Time Ally involves certain risks and
                  should take full cognizance of and understand all of the risk factors related
                  before investing in TimeAlly Contracts
                  <br />
                  7. The User should understand and accept complete responsibility & liability for
                  any damages or losses, however, caused in connection with the vesting, use of, or
                  on the reliance of DApp.
                  <br />
                  8. Do not participate in offerings where one or more people offer you a guaranteed
                  return in exchange for an upfront deposit. The end result is that usually a lot of
                  people lose a lot. Guarantee is given on something which you control or hold.
                  TimeAlly PET Vault holds the token. Thus, the guarantee can be given by Smart
                  Contract as they hold all the tokens which will be released over the next 50
                  years. It can guarantee only the release of Era Swap (ES) from NRT Pool. Because
                  all tokens which are to be released in the future are stored in a vault and the
                  distributions are based on the work performed by the users among them.
                  <br />
                  9. Era Swap doesn’t guarantee any Fiat or Crypto because Era Swap doesn’t control
                  any Fiat or any other Cryptocurrencies. Era Swap token (ES) can only be used in
                  the Era Swap Eco System. ES cannot be used outside of the Ecosystem.
                  <br />
                  10. The User can claim rewards based on the work performed in the ecosystem or
                  vesting done in TimeAlly PET. As per pre-set rules, if the user has performed
                  tasks, then they are eligible for rewards. In this case, only user can come and
                  withdraw from TimeAlly PET DApp, the user will be solely responsible for claiming
                  the rewards.
                  <br />
                  11. Phishing websites often go hand-in-hand with phishing emails. Phishing emails
                  can link to a replica website designed to steal login credentials or prompt one to
                  install malware. Do not install software or log in to a website unless you are
                  100% sure it isn't a fake one. Phishing websites may also appear as sponsored
                  results on search engines or in the app used in mobile devices. Be wary that you
                  aren't downloading a fake app or clicking a sponsored link to a fake website. It
                  is completely user’s risk and the user is only liable for any such activity.
                  <br />
                  <br />
                  <b>Personal Era Swap Teller (PET) Smart Contract Conditions</b>
                  <br />
                  PET Starts with Systematic Accumulation Plan (SAP) of minimum 500 ES commitment
                  and above (Please refer to PET Annuity Chart ). PET Bounty will accumulate an
                  equal count of ES as per Monthly Target Commitment achieved as per the Staker
                  <br />
                  <br />
                  PET Bonus will be released in 12 equal intervals of 5 months each over a period of
                  5 years as per the Monthly Target Commitment achievement in accumulation year. The
                  PET Bonus pertaining to the 1st month shall be awarded on the 60th month of
                  Annuity, the 2nd month shall be awarded on the 55th month of Annuity,
                  correspondingly the 12th month shall be provided on the end of 5th month of
                  Annuity.
                  <br />
                  <br />
                  <b>Monthly Target commitment</b>
                  <br />
                  Monthly target commitment refers to the total ES to be staked within 30 days 10
                  hours. One needs to select his Monthly target commitment from the annuity chart at
                  the start of the plan.
                  <br />
                  <br />
                  <b>Monthly Target Achievement Benefits</b>
                  <br />
                  The staker has the flexibility to stake within 30 days 10 hours till the next
                  window opens. The staker will have to meet the Monthly Target commitment to
                  receive the PET Bonus as well as the PET Bounty
                  <br />
                  <br />
                  <b>Top-ups</b>
                  <br />
                  If the user stakes more than the monthly target commitment he/she shall receive
                  50% of the PET Bounty on the staking above his desired Monthly Target Commitment.
                  <br />
                  Example: User has decided his limit of 5000 ES and he/she stakes 2000 ES + 2000 ES
                  + 6000 ES in 3 instalments within 30 Days 10 hours. The total ES staked in PET is
                  10000 ES which shall imply that he/she has achieved his/her target for the month
                  and he/she shall receive a PET Bounty of 5000 ES + 2500 ES.
                  <br />
                  <br />
                  <b>Passing PET Target Commitment %</b>
                  <br />
                  The Passing PET target commitment will be a minimum 50% of the Monthly target
                  commitment of ES to qualify for PET Bonus. If the monthly target commitment is not
                  achieved and PET target commitment is achieved then the user shall be provided
                  with the PET Smart Contract Contribution but shall not be awarded the PET Bonus
                  and those respective tokens shall be burned for the corresponding month.
                  <br />
                  <br />
                  Example: If the monthly target of commitment is 10000 ES and the user stakes
                  5000ES that means he/she has achieved PET Target Commitment by staking a minimum
                  of 50%. He /She shall avail on PET Smart Contract Contribution of 5000ES but
                  he/she shall qualify for the PET Bonus.
                  <br />
                  <br />
                  <b>Default Monthly Commitment</b>
                  <br />
                  If the staker is unable to reach 50% of the monthly Target Commitment ES then
                  he/she shall not qualify for PET Bounty nor shall he qualify for the PET bonus.
                  The total staking ES count shall carry forward to the following month and a
                  default shall be considered for that corresponding month.
                  <br />
                  <br />
                  Example: Staker defaults to achieve Monthly Target Commitment for 11 months then,
                  he/she will not get 11 installments PET Bonus. He/She will receive a PET bonus
                  corresponding to 1 month on the 12th Month of 5th Annuity Year.
                  <br />
                  <br />
                  <b>Single Lumsum Staking</b>
                  <br />
                  The staker has the ability to make the entire commitment of 12 months in a single
                  transaction. He/She can avail of this option in the first month only if he/she has
                  not staked in that particular PET previously.
                  <br />
                  <br />
                  <a onClick={this.onCloseModal} className="btn btn-primary btn-sm">
                    <span className="text-white">Proceed</span>
                  </a>
                </p>
              </div>
            </div>
          </Modal>
          <Card style={{ marginBottom: '0' }}>
            <div
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px',
              }}
            >
              <Form
                className="mnemonics custom-width"
                onSubmit={this.onFirstSubmit}
                style={{ borderRadius: '.25rem', padding: '20px 40px', margin: '15px auto' }}
              >
                <h3 style={{ marginBottom: '15px' }}>New PET Contract - Step 1 of 2</h3>

                <Form.Group controlId="PETAmount">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      className="stakingInput"
                      onChange={this.onAmountUpdate}
                      value={this.state.userAmount}
                      type="text"
                      autoComplete="off"
                      placeholder={amountPlaceholder}
                      style={{ width: '325px' }}
                      isInvalid={this.state.errorDisplay}
                    />

                    <Form.Control as="select" onChange={this.onPlanChange} className="width-100">
                      <option disabled selected={this.state.plan === null}>
                        Select PET Plan
                      </option>
                      <option value="0" selected={this.state.plan === 0}>
                        ID: 0) Self Contribution 500+ ES / Month
                      </option>
                      <option value="1" selected={this.state.plan === 1}>
                        ID: 1) Self Contribution 1000+ ES / Month
                      </option>
                      <option value="2" selected={this.state.plan === 2}>
                        ID: 2) Self Contribution 2500+ ES / Month
                      </option>
                      <option value="3" selected={this.state.plan === 3}>
                        ID: 3) Self Contribution 5000+ ES / Month
                      </option>
                      <option value="4" selected={this.state.plan === 4}>
                        ID: 4) Self Contribution 10000+ ES / Month
                      </option>
                    </Form.Control>
                  </Form.Group>

                  {this.state.errorDisplayText ? (
                    <p
                      style={{
                        color: this.state.errorDisplay ? 'red' : 'green',
                        textAlign: 'left',
                      }}
                    >
                      {this.state.errorDisplayText}
                    </p>
                  ) : null}
                </Form.Group>

                <Button
                  variant="primary"
                  id="firstSubmit"
                  type="submit"
                  disabled={
                    !this.state.userAmount || this.state.plan === null || this.state.spinner
                  }
                >
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
                  {this.state.spinner ? 'Please wait..' : 'Next'}
                </Button>
              </Form>
            </div>
          </Card>
        </>
      );
    } else if (this.state.currentScreen === 1) {
      const halfTarget = ethers.utils.formatEther(ethers.utils.parseEther(this.state.userAmount));
      const fullTarget = ethers.utils.formatEther(
        ethers.utils.parseEther(this.state.userAmount).mul(2)
      );
      const lumSum = ethers.utils.formatEther(
        ethers.utils.parseEther(this.state.userAmount).mul(12)
      );
      let annuityPercentage = '';
      switch (this.state.plan) {
        case 0:
          annuityPercentage = '10.0%';
          break;
        case 1:
          annuityPercentage = '10.5%';
          break;
        case 2:
          annuityPercentage = '11.0%';
          break;
        case 3:
          annuityPercentage = '11.5%';
          break;
        case 4:
          annuityPercentage = '12.0%';
          break;
      }
      screen = (
        <>
          <Card style={{ marginBottom: '0' }}>
            <div
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px',
              }}
            >
              {startOverAgainButton}
              <h3 style={{ marginBottom: '15px' }}>New PET Contract - Step 2 of 2</h3>
              <p>
                You are initiating a PET of <b>{fullTarget} ES</b> with a self commitment of{' '}
                <b>{halfTarget} ES</b> and PET contribution of <b>{halfTarget} ES</b> with plan id{' '}
                <b>{this.state.plan}</b> where in you are entitled to receive{' '}
                <b>{annuityPercentage}</b> as annuity of ES accumulated for the corresponding month
                for next 5 years and <b>12 booster bonus</b>. This means when you deposit at least{' '}
                <b>{halfTarget} ES</b> within 30 days and 10 hours in your PET, your PET contributes
                another <b>{halfTarget} ES</b> for you and making your deposit{' '}
                <b>{fullTarget} ES</b> for that month. You can also checkout{' '}
                <b>
                  fee based LumpSum deposit options of Quarterly, Half Yearly and Annual Deposit
                  Frequency Mode
                </b>
                .
              </p>

              <Alert variant="warning">
                <b>Attention</b>:{' '}
                <u>
                  This is only a PET Plan Selection transaction and your ES are not transfered to
                  your PET in this transaction
                </u>
                . After your <b>New PET</b> transaction is done (by below button), you will be able
                to see it in your <b>View PETs</b> page and there you can click on{' '}
                <b>make deposit</b> button for depositing ES within 30 days and 10 hours for it to
                be counted in first month.
              </Alert>

              <p>Please click the following button to confirm your PET.</p>
              {this.state.errorMessage ? (
                <Alert variant="danger">{this.state.errorMessage}</Alert>
              ) : null}
              <Button
                onClick={() => {
                  this.setState({ showNewPetTransactionModal: true, spinner: true });
                }}
                disabled={this.state.spinner}
              >
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
                {this.state.waiting
                  ? 'Waiting for confirmation'
                  : this.state.spinner
                  ? 'Sending transaction'
                  : 'Confirm PET'}
              </Button>
              {this.state.txHash ? (
                <p>
                  You can view your transaction on{' '}
                  <a
                    style={{ color: 'black' }}
                    href={`https://${
                      process.env.network === 'homestead' ? '' : 'kovan.'
                    }etherscan.io/tx/${this.state.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EtherScan
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </Card>
        </>
      );
    } else {
      screen = (
        <>
          <Card style={{ marginBottom: '0' }}>
            <div
              className="custom-width"
              style={{ borderRadius: '.25rem', padding: '20px 40px', margin: '15px auto' }}
            >
              <h3 style={{ marginBottom: '15px' }}>PET confirmed!</h3>
              <Alert variant="success">
                Your PET is initiated. You can view your transaction on{' '}
                <a
                  style={{ color: 'black' }}
                  href={`https://eraswap.info/txn/${this.state.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eraswap.info
                </a>
                . You are yet to make ES deposit to your PET and you can do this by going to View
                PETs page and opening your PET to make ES deposit.
              </Alert>
              <Button onClick={() => this.props.history.push('/pet-new/view')}>
                Go to View PETs page
              </Button>
            </div>
          </Card>
        </>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'PET', 'New']}
        title="ES PET Contract"
        subtitle="1 Year Accumulation - 5 Year Annuity"
        buttonName="Calculator Excel"
        buttonOnClick={window.open.bind(null, '/excel/PET_Calculator.xlsx')}
      >
        {screen}
        <TransactionModal
          show={this.state.showNewPetTransactionModal}
          hideFunction={() => this.setState({ showNewPetTransactionModal: false, spinner: false })}
          wallet={window.wallet}
          location={this.props.location}
          ethereum={{
            //@ts-ignore
            transactor: window.petLiquidInstance?.connect(window.wallet?.connect(window.provider)).newPET,
            // estimator: window.petLiquidInstance.estimate.newPET,
            estimator: window.petLiquidInstance.estimateGas.newPET,
            contract: window.petLiquidInstance,
            contractName: 'TimeAllyPET',
            arguments: [this.state.plan, ethers.utils.parseEther(this.state.userAmount || '0')],
            ESAmount: '0.0',
            headingName: 'New PET',
            functionName: 'New PET',
            stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: (txHash: string) =>
              this.setState({
                spinner: false,
                currentScreen: 2,
                showNewPetTransactionModal: false,
                txHash,
              }),
          }}
        />
      </Layout>
    );
  }
}

export default New;
