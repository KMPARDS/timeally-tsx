import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { Layout } from '../../../Layout/Layout';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { ethers } from 'ethers';
import { RouteComponentProps } from 'react-router-dom';
import { getOrdinalString, lessDecimals, reportTxn } from '../../../../utils';

type State = {
  currentScreen: number;
  userAmount: number;
  spinner: boolean;
  waiting: boolean;
  approveTxHash: string;
  txHash: string;
  open: boolean;
  errorMessage: string;
  showApproveTransactionModal: boolean;
  showStakeTransactionModal: boolean;
  approveSuccess: boolean;
  approveAlreadyDone: boolean;
  userLiquidEsBalance: ethers.BigNumber;
  isLiquidAvailable: boolean;
  insufficientBalance: boolean;
  insufficientBalanceText: string;
  monthlyCommitmentAmount: ethers.BigNumber;
  plan: any;
};

interface RouteParams {
  id: string;
  month: string;
}
type Props = {};
class Deposit extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    currentScreen: 0,
    userAmount: 0,
    spinner: true,
    waiting: false,
    approveTxHash: '',
    txHash: '',
    open: false,
    errorMessage: '',
    showApproveTransactionModal: false,
    showStakeTransactionModal: false,
    approveSuccess: false,
    approveAlreadyDone: false,
    userLiquidEsBalance: ethers.constants.Zero,
    isLiquidAvailable: false,
    insufficientBalance: false,
    insufficientBalanceText: '',
    monthlyCommitmentAmount: ethers.constants.Zero,
    plan: '',
  };

  componentDidMount = async () => {
    if (window.wallet) {
      const userLiquidEsBalancePromise = window.prepaidEsInstance.balanceOf(window.wallet.address);
      const sipPromise = window.tsgapLiquidInstance.functions.sips(
        window.wallet.address,
        this.props.match.params.id
      );
      await Promise.all([userLiquidEsBalancePromise, sipPromise]);
      this.setState({
        userLiquidEsBalance: await userLiquidEsBalancePromise,
        monthlyCommitmentAmount: (await sipPromise).monthlyCommitmentAmount,
        spinner: false,
      });
      this.onAmountUpdate({ target: { value: this.state.userAmount } });
    }
  };

  onAmountUpdate = async (event: any) => {
    try {
      if (this.state.userLiquidEsBalance && this.state.monthlyCommitmentAmount) {
        const isLiquidAvailable = ethers.utils
          .parseEther(event.target.value || '0')
          .lte(this.state.userLiquidEsBalance);
        const isDepositAtleastMinimum = ethers.utils
          .parseEther(event.target.value || '0')
          .gte(this.state.monthlyCommitmentAmount);

        let insufficientBalance = false;
        let insufficientBalanceText = '';
        if (+event.target.value) {
          if (isDepositAtleastMinimum) {
            if (isLiquidAvailable) {
              insufficientBalanceText = `You can use either your liquid tokens (${lessDecimals(
                this.state.userLiquidEsBalance
              )} ES) for this SIP.`;
            } else {
              insufficientBalance = true;
              insufficientBalanceText = `Insufficient ES balance. You only have ${lessDecimals(
                this.state.userLiquidEsBalance
              )} liquid ES tokens`;
            }
          } else {
            insufficientBalance = true;
            insufficientBalanceText = `Your amount should be at least ${lessDecimals(
              this.state.monthlyCommitmentAmount
            )} ES. `;
          }
        }

        await this.setState({
          userAmount: event.target.value,
          isLiquidAvailable,
          insufficientBalance,
          insufficientBalanceText,
        });
      } else {
        await this.setState({ userAmount: event.target.value });
      }
    } catch (error) {
      console.log(error.message);
      this.setState({ insufficientBalance: true, insufficientBalanceText: error.message });
    }
    // console.log('this.state.userLiquidEsBalance', this.state.userLiquidEsBalance, this.state.insufficientBalance);
  };

  onFirstSubmit = async (event: any) => {
    event.preventDefault();
    if (window.wallet) {
      await this.setState({ spinner: true });
      const allowance = await window.prepaidEsInstance.allowance(
        window.wallet.address,
        window.tsgapLiquidInstance.address
      );

      console.log(
        'allowance',
        allowance,
        allowance.gte(ethers.utils.parseEther(this.state.userAmount.toString()))
      );

      if (allowance.gte(ethers.utils.parseEther(this.state.userAmount.toString()))) {
        this.setState({
          spinner: false,
          currentScreen: 1,
          approveAlreadyDone: true,
        });
      } else {
        this.setState({ spinner: false, currentScreen: 1, approveAlreadyDone: false });
      }
    }
  };

  monthlyDeposit = async () => {
    
   try{
    if (window.wallet) {
      const txn = await window.tsgapLiquidInstance
        .connect(window.wallet?.connect(window.provider))
        .monthlyDeposit(
          window.wallet.address,
          this.props.match.params.id,
          this.props.match.params.month,
          {
            value: ethers.utils.parseEther(this.state.userAmount.toString()),
          }
        );
      reportTxn({
        from: window.wallet.address,
        to: window.tsgapLiquidInstance.address,
        amount: this.state.userAmount,
      });
      return txn;
    }
   } catch(error){console.error(error);}
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

    const headingText = `Deposit Installment of Month ${Number(this.props.match.params.month)}`;

    if (this.state.currentScreen === 0) {
      screen = (
        <>
          <Card>
            <Form
              className="custom-width"
              onSubmit={this.onFirstSubmit}
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 1 of 4</h3>

              <Form.Group controlId="installmentAmount">
                <Form.Control
                  className="stakingInput"
                  autoFocus
                  onChange={this.onAmountUpdate}
                  value={this.state.userAmount}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter installment amount for SIP"
                  style={{ width: '325px' }}
                  isInvalid={this.state.insufficientBalance}
                />
                {this.state.insufficientBalanceText ? (
                  <p
                    style={{
                      color: this.state.insufficientBalance ? 'red' : 'green',
                      textAlign: 'left',
                    }}
                  >
                    {this.state.insufficientBalanceText}
                  </p>
                ) : null}
              </Form.Group>

              <Button
                variant="primary"
                id="firstSubmit"
                type="submit"
                disabled={!this.state.userAmount || this.state.spinner}
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
          </Card>
        </>
      );
    } else if (this.state.currentScreen === 1) {
      let displayText: any = '';
      if (this.state.isLiquidAvailable) {
        displayText = (
          <p>
            This dApp just noticed that you have{' '}
            <strong>{lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens</strong>.
          </p>
        );
      } else {
        displayText = (
          <p>
            Seems that you don't have enough ES tokens for making deposit of{' '}
            <strong>{this.state.userAmount} ES</strong> for{' '}
            {getOrdinalString(Number(Number(this.props.match.params.month)))} Month. Your liquid
            balance is <strong>{lessDecimals(this.state.userLiquidEsBalance)} ES</strong>. Are you
            sure you want to proceed? You can get ES tokens from anyone who has ES tokens. ES tokens
            are also trading on Probit Exchange, where you can exchange your other crypto assets
            with the exchange community for ES.
          </p>
        );
      }

      screen = (
        <Card>
          <div
            className="mnemonics custom-width"
            style={{
              border: '1px solid rgba(0,0,0,.125)',
              borderRadius: '.25rem',
              padding: '20px 40px',
              margin: '15px auto',
            }}
          >
            {startOverAgainButton}
            <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 2 of 4</h3>
            {displayText}
            <Button
              style={{ display: 'block', width: '100%' }}
              disabled={!this.state.isLiquidAvailable}
              onClick={() =>
                this.setState({
                  currentScreen: 2,
                })
              }
            >
              From Liquid: {lessDecimals(this.state.userLiquidEsBalance)}
            </Button>
          </div>
        </Card>
      );
    } else if (this.state.currentScreen === 2) {
      screen = (
        <>
          <Card>
            <div
              className="mnemonics custom-width"
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              {startOverAgainButton}
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 3 of 4</h3>
              {!this.state.approveAlreadyDone ? (
                <>
                  <p>
                    This step is for approving TimeAllySIP Smart Contract to collect{' '}
                    {this.state.userAmount} ES from your account.{' '}
                    <strong>No funds will be debited from your account in this step.</strong> Funds
                    will be debited in Step 3 and sent into SIP Contract when you do New SIP
                    transaction.
                  </p>
                  {this.state.errorMessage ? (
                    <Alert variant="danger">{this.state.errorMessage}</Alert>
                  ) : null}
                  {this.state.approveSuccess ? (
                    <>
                      <Alert variant="warning">
                        Your approve tx is confirmed!{' '}
                        <strong>
                          Note: Your {this.state.userAmount} ES has not been deposited in TimeAlly
                          SIP Contract yet.
                        </strong>{' '}
                        Please go to third step to do your Monthly Deposit transaction.
                      </Alert>
                      <Button onClick={() => this.setState({ currentScreen: 3 })}>
                        Go to 3rd Step
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        this.setState({ showApproveTransactionModal: true, spinner: true });
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
                      {this.state.spinner ? 'Please wait...' : 'Approve TimeAllySIP'}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Alert variant="primary">
                    This dApp just noticed that you already have enough allowance. You can directly
                    continue to the third step and do your Monthly Deposit transaction.
                  </Alert>
                  <Button onClick={() => this.setState({ currentScreen: 3 })}>
                    Go to 3rd Step
                  </Button>
                </>
              )}
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({ currentScreen: this.state.currentScreen - 1, spinner: false })
                }
              >
                Back
              </Button>
            </div>
          </Card>
        </>
      );
    } else if (this.state.currentScreen === 3) {
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
              {startOverAgainButton}
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 4 of 4</h3>
              <p>
                Please click the following button to confirm your SIP Monthly Deposit of{' '}
                <strong>{this.state.userAmount} ES</strong>.
              </p>
              {this.state.errorMessage ? (
                <Alert variant="danger">{this.state.errorMessage}</Alert>
              ) : null}
              <Button
                onClick={() => {
                  this.setState({ showStakeTransactionModal: true, spinner: true });
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
                  : 'Confirm Monthly Deposit'}
              </Button>
              {this.state.txHash ? (
                <p>
                  You can view your transaction on{' '}
                  <a
                    style={{ color: 'black' }}
                    href={`https://eraswap.info/txn/${this.state.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Eraswap.info
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
              <h3 style={{ marginBottom: '15px' }}>
                {getOrdinalString(Number(this.props.match.params.month))} Monthly Deposit confirmed!
              </h3>
              <Alert variant="success">
                Your deposit transaction is confirmed. You can view your transaction on{' '}
                <a
                  style={{ color: 'black' }}
                  href={`https://eraswap.info/txn/${this.state.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eraswap.info
                </a>
              </Alert>
              <Button
                onClick={() =>
                  this.props.history.push('/assurance/view/' + this.props.match.params.id)
                }
              >
                Go to SIP Deposits Page
              </Button>
            </div>
          </Card>
        </>
      );
    }

    return (
      <Layout
        // breadcrumb={['Home', ...(() => {
        //   const x = this.props.location.pathname.split('/');
        //   x.shift();
        //   return x;
        // })()]}
        title={`Deposit ${getOrdinalString(
          Number(this.props.match.params.month)
        )} Monthly Installment`}
      >
        {screen}
        <TransactionModal
          show={this.state.showApproveTransactionModal}
          hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.prepaidEsInstance.connect(window.wallet?.connect(window.provider))
              .functions.approve,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.tsgapLiquidInstance.address,
              ethers.utils.parseEther(this.state.userAmount.toString()),
            ],
            ESAmount: this.state.userAmount,
            headingName: 'Approval Status',
            functionName: 'Approve',
            stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () =>
              this.setState({
                spinner: false,
                // currentScreen: 2,
                approveSuccess: true,
                showApproveTransactionModal: false,
              }),
          }}
        />
        <TransactionModal
          show={this.state.showStakeTransactionModal}
          hideFunction={() => this.setState({ showStakeTransactionModal: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            // transactor: window.tsgapLiquidInstance.connect(window.wallet?.connect(window.provider))
            //   .monthlyDeposit,
            transactor: this.monthlyDeposit,
            // transactor: this.checkMethod,
            estimator: () => ethers.constants.Zero,
            contract: window.tsgapLiquidInstance,
            contractName: 'TimeAllySIP',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              Number(this.props.match.params.month),
            ],
            ESAmount: this.state.userAmount,
            transferAmount: this.state.userAmount,
            headingName:
              getOrdinalString(Number(this.props.match.params.month)) + ' Monthly Deposit',
            functionName: 'monthlyDeposit',
            stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: (txHash: any) =>
              this.setState({
                spinner: false,
                currentScreen: 4,
                showStakeTransactionModal: false,
                txHash,
              }),
          }}
        />
      </Layout>
    );
  }
}

export default Deposit;
