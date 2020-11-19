import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import Layout from '../../../Layout/LayoutPET';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { ethers } from 'ethers';
import { RouteComponentProps } from 'react-router-dom';
import { getOrdinalString, hexToNum } from '../../../../utils';

interface RouteParams {
  id: string;
}
type Props = {};
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
  userPrepaidESBalance: ethers.BigNumber;
  isLiquidAvailable: boolean;
  isPrepaidAvailable: boolean;
  insufficientBalance: boolean;
  insufficientBalanceText: string;
  usePrepaidES: boolean;
  monthlyCommitmentAmount: ethers.BigNumber;
  currentTime: number;
  monthId: number;
};

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
    userPrepaidESBalance: ethers.constants.Zero,
    isLiquidAvailable: false,
    isPrepaidAvailable: false,
    insufficientBalance: false,
    insufficientBalanceText: '',
    usePrepaidES: false,
    monthlyCommitmentAmount: ethers.constants.Zero,
    currentTime: Math.floor(Date.now() / 1000),
    monthId: 1,
  };

  componentDidMount = async () => {
    // // await this.setState({ currentTime: process.env.network === 'homestead' ? Math.floor(Date.now() / 1000) : (await window.prepaidEsInstance.functions.mou()) });
    // this.state.currentTime = process.env.network === 'homestead' ? Math.floor(Date.now() / 1000) : (await window.prepaidEsInstance.functions.mou());

    if (window.wallet) {
      const userLiquidEsBalancePromise = window.provider.getBalance(window.wallet.address);
      const userPrepaidESBalancePromise = window.prepaidEsInstance.balanceOf(window.wallet.address);
      const petPromise = window.petInstance.functions.pets(
        window.wallet.address,
        this.props.match.params.id
      );
      await Promise.all([userLiquidEsBalancePromise, userPrepaidESBalancePromise, petPromise]);
      this.setState({
        userLiquidEsBalance: await userLiquidEsBalancePromise,
        userPrepaidESBalance: await userPrepaidESBalancePromise,
        monthId:
          Math.floor(
            (this.state.currentTime - hexToNum((await petPromise).initTimestamp)) / 2629744
          ) + 1,
        monthlyCommitmentAmount: (await petPromise).monthlyCommitmentAmount,
        spinner: false,
      });
      this.onAmountUpdate({ target: { value: this.state.userAmount } });
    }
  };

  onAmountUpdate = async (event: any) => {
    console.log('onAmountUpdate');
    try {
      if (this.state.userLiquidEsBalance && this.state.userPrepaidESBalance) {
        console.log('1');
        console.log(
          'this.state.userLiquidEsBalance',
          this.state.userLiquidEsBalance,
          event.target.value
        );

        const isLiquidAvailable = ethers.utils
          .parseEther(event.target.value || '0')
          .lte(this.state.userLiquidEsBalance);
        console.log('this.state.userPrepaidESBalance', this.state.userPrepaidESBalance);

        const isPrepaidAvailable = ethers.utils
          .parseEther(event.target.value || '0')
          .lte(this.state.userPrepaidESBalance.toHexString());
        console.log('this.state.monthlyCommitmentAmount', this.state.monthlyCommitmentAmount);

        const isDepositAtleastMinimum = ethers.utils
          .parseEther(event.target.value || '0')
          .gte(this.state.monthlyCommitmentAmount.toHexString());
        console.log(
          'isLiquidAvailable',
          isLiquidAvailable,
          'isPrepaidAvailable',
          isPrepaidAvailable
        );
        console.log('2');
        let insufficientBalance = false;
        let insufficientBalanceText = '';
        if (+event.target.value) {
          if (isDepositAtleastMinimum) {
            if (isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use either your liquid tokens (${hexToNum(
                this.state.userLiquidEsBalance
              )} ES) or your TimeAlly PET prepaidES tokens (${hexToNum(
                this.state.userPrepaidESBalance
              )} ES) for this PET.`;
            } else if (isLiquidAvailable && !isPrepaidAvailable) {
              insufficientBalanceText = this.state.userPrepaidESBalance.gt(0)
                ? `You can use your liquid ES tokens (${hexToNum(
                    this.state.userLiquidEsBalance
                  )} ES) for this PET as there aren't enough tokens in your TimeAlly PET prepaidES.`
                : '';
            } else if (!isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use your TimeAlly PET prepaidES tokens (${hexToNum(
                this.state.userPrepaidESBalance
              )} ES) for this PET.`;
            } else {
              insufficientBalance = true;
              insufficientBalanceText = `Insufficient ES balance. You only have ${hexToNum(
                this.state.userLiquidEsBalance
              )} liquid ES tokens${
                this.state.userPrepaidESBalance.gt(0)
                  ? ` and ${hexToNum(
                      this.state.userPrepaidESBalance
                    )} TimeAlly PET prepaidES tokens.`
                  : '.'
              }`;
            }
          } else {
            console.log('3');
            insufficientBalance = true;
            insufficientBalanceText = `Your commitment for self ES deposit is ${hexToNum(
              this.state.monthlyCommitmentAmount
            )} ES, if you still want to proceed you can click next.`;
          }
        }

        await this.setState({
          userAmount: event.target.value,
          isLiquidAvailable,
          isPrepaidAvailable,
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

      const tx = await window.petInstance
        .connect(window.wallet.connect(window.provider))
        .makeDeposit(
          window.wallet?.address,
          this.props.match.params.id,
          this.state.userAmount,
          false,
          {
            value: this.state.userAmount.toString(),
          }
        );
      await tx.wait();
      this.setState({
        spinner: false,
        currentScreen: 1,
        approveAlreadyDone: true,
      });

      const allowance = await window.prepaidEsInstance.allowance(
        window.wallet?.address,
        window.petInstance.address
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

    const headingText = `Deposit${
      this.state.monthId ? ` for ${getOrdinalString(this.state.monthId)}` : ''
    } Month`;

    if (this.state.currentScreen === 0) {
      screen = (
        <>
          <Card style={{ marginBottom: '0' }}>
            <Form
              className="custom-width"
              onSubmit={this.onFirstSubmit}
              style={{ borderRadius: '.25rem', padding: '20px 40px', margin: '15px auto' }}
            >
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 1 of 4</h3>

              <Form.Group controlId="installmentAmount">
                <Form.Control
                  className="stakingInput"
                  autoFocus
                  onChange={this.onAmountUpdate}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter deposit amount for PET"
                  style={{ width: '100%' }}
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
      if (this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = (
          <p>
            This dApp just noticed that you have{' '}
            <strong>{hexToNum(this.state.userLiquidEsBalance)} liquid ES tokens</strong> as well as{' '}
            <strong>{hexToNum(this.state.userPrepaidESBalance)} TimeAlly PET prepaidES</strong>.
            Please choose which you want to use to deposit the{' '}
            <strong>
              {this.state.monthId ? getOrdinalString(this.state.monthId) : 'Loading...'} monthly
              installment of {this.state.userAmount} ES
            </strong>{' '}
            of your PET with initial monthly commitment of ES.
          </p>
        );
      } else if (this.state.isLiquidAvailable && !this.state.isPrepaidAvailable) {
        displayText = (
          <p>
            You have enough tokens (<strong>{hexToNum(this.state.userLiquidEsBalance)} ES</strong>)
            in your wallet for PET. Go to Step 3 for doing approval procedure of{' '}
            <strong>{this.state.userAmount} ES</strong> to TimeAlly PET Smart Contract.
          </p>
        );
      } else if (!this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = (
          <p>
            You have enough tokens in your TimeAlly PET prepaidES to make a deposit of{' '}
            <strong>{this.state.userAmount} ES</strong> in your PET with initial monthly commitment
            of ES.
          </p>
        );
      } else {
        displayText = (
          <p>
            Seems that you don't have enough ES tokens for making deposit of{' '}
            <strong>{this.state.userAmount} ES</strong> for{' '}
            {this.state.monthId ? getOrdinalString(this.state.monthId) : 'Loading...'} Month. Your
            liquid balance is <strong>{hexToNum(this.state.userLiquidEsBalance)} ES</strong>
            {this.state.userPrepaidESBalance.gt(0) ? (
              <>
                {' '}
                and prepaidES balance is{' '}
                <strong>{hexToNum(this.state.userPrepaidESBalance)} ES</strong>
              </>
            ) : null}
            . Are you sure you want to proceed? You can get ES tokens from anyone who has ES tokens.
            ES tokens are also trading on Probit Exchange, where you can exchange your other crypto
            assets with the exchange community for ES.
          </p>
        );
      }

      screen = (
        <Card style={{ marginBottom: '0' }}>
          <div
            className="mnemonics"
            style={{
              borderRadius: '.25rem',
              width: '500px',
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
                  usePrepaidES: false,
                  currentScreen: 2,
                })
              }
            >
              From Liquid: {hexToNum(this.state.userLiquidEsBalance)}
            </Button>
            <Button
              variant="warning"
              style={{ display: 'block', width: '100%' }}
              disabled={!this.state.isPrepaidAvailable}
              onClick={() =>
                this.setState({
                  usePrepaidES: true,
                  currentScreen: 3,
                })
              }
            >
              From PrepaidES: {hexToNum(this.state.userPrepaidESBalance)}
            </Button>
          </div>
        </Card>
      );
    } else if (this.state.currentScreen === 2) {
      screen = (
        <>
          <Card style={{ marginBottom: '0' }}>
            <div
              className="mnemonics"
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                width: '500px',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              {startOverAgainButton}
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 3 of 4</h3>
              {!this.state.approveAlreadyDone ? (
                <>
                  <p>
                    This step is for approving TimeAlly PET Smart Contract to collect{' '}
                    {this.state.userAmount} ES from your account.{' '}
                    <strong>No funds will be debited from your account in this step.</strong> Funds
                    will be debited in Step 3 and sent into PET Contract when you do New PET
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
                          PET Contract yet.
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
                      {this.state.spinner ? 'Please wait...' : 'Approve TimeAlly PET'}
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
          <Card style={{ marginBottom: '0' }}>
            <div
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                width: '500px',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              {startOverAgainButton}
              <h3 style={{ marginBottom: '15px' }}>{headingText} - Step 4 of 4</h3>
              <p>
                Please click the following button to confirm your PET Monthly Deposit of{' '}
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
          <Card style={{ marginBottom: '0' }}>
            <div
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                width: '500px',
                padding: '20px 40px',
                margin: '15px auto',
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>
                {this.state.monthId ? getOrdinalString(this.state.monthId) : ''}
                Monthly Deposit confirmed!
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
                onClick={() => this.props.history.push('/pet/view/' + this.props.match.params.id)}
              >
                Go to PET Deposits Page
              </Button>
            </div>
          </Card>
        </>
      );
    }

    return (
      <Layout
        breadcrumb={[
          'Home',
          ...(() => {
            const x: any[] = this.props.location.pathname.split('/');
            x.shift();
            return x;
          })(),
        ]}
        title={`Make Deposit to PET${
          this.state.monthId ? ' of ' + getOrdinalString(this.state.monthId) + ' Month' : ''
        }`}
      >
        {screen}
        <TransactionModal
          show={this.state.showApproveTransactionModal}
          hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.prepaidEsInstance.connect(window.wallet?.connect(window.provider))
              .approve,
            estimator: window.prepaidEsInstance.estimateGas.approve,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.petInstance.address,
              this.state.userAmount
                ? ethers.utils.parseEther(this.state.userAmount.toString()).toHexString()
                : ethers.constants.Zero.toHexString(),
            ],
            ESAmount: this.state.userAmount,
            headingName: 'Approval Status',
            functionName: 'Approve',
            // stakingPlan: this.state.plan,
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
            transactor:
              window.wallet &&
              window.petInstance.connect(window.wallet?.connect(window.provider)).makeDeposit,
            estimator: window.petInstance.estimateGas.makeDeposit,
            contract: window.petInstance,
            contractName: 'TimeAlly PET',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              this.state.userAmount
                ? ethers.utils.parseEther(this.state.userAmount.toString()).toHexString()
                : ethers.constants.Zero.toHexString(),
              this.state.usePrepaidES,
            ],
            ESAmount: this.state.userAmount,
            headingName: getOrdinalString(this.state.monthId) + ' Monthly Deposit',
            functionName: 'makeDeposit',
            // stakingPlan: this.state.plan,
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
