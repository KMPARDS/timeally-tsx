import { ethers } from 'ethers';
import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { getOrdinalString, hexToNum, lessDecimals } from '../../../../utils';
import Layout from '../../../Layout/LayoutPET';
import TransactionModal from '../../../TransactionModal/TransactionModal';

function getFees(frequencyMode: number) {
  switch (frequencyMode) {
    case 3:
      return 1;
    case 6:
      return 2;
    case 12:
      return 3;
    // default:
    //   return null;
  }
}

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
  frequencyMode: number;
  monthId: number;
};

interface RouteParams {
  id: string;
}

type Props = {};

class LumSumDeposit extends Component<Props & RouteComponentProps<RouteParams>, State> {
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
    frequencyMode: 3,
    monthId: 0,
  };

  componentDidMount = async () => {
    // await this.setState({ currentTime: process.env.network === 'homestead' ? Math.floor(Date.now() / 1000) : (await window.prepaidEsInstance.functions.mou()) });
    this.state.currentTime = /* process.env.network === 'homestead' ? */ Math.floor(
      Date.now() / 1000
    ); /* : (await window.prepaidEsInstance.functions.mou());*/

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
      if (!event.target.value?.length) event.target.value = '0';
      if (this.state.userLiquidEsBalance && this.state.userPrepaidESBalance) {
        console.log('1');
        const isLiquidAvailable = ethers.utils
          .parseEther(event.target.value || '0')
          .lte(this.state.userLiquidEsBalance);
        const isPrepaidAvailable = ethers.utils
          .parseEther(event.target.value || '0')
          .lte(this.state.userPrepaidESBalance);
        const isDepositAtleastMinimum = ethers.utils
          .parseEther(event.target.value || '0')
          .gte(this.state.monthlyCommitmentAmount.mul(this.state.frequencyMode || 1));
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
              insufficientBalanceText = `You can use either your liquid tokens (${lessDecimals(
                this.state.userLiquidEsBalance
              )} ES) or your TimeAllyPET prepaidES tokens (${lessDecimals(
                this.state.userPrepaidESBalance
              )} ES) for this PET.`;
            } else if (isLiquidAvailable && !isPrepaidAvailable) {
              insufficientBalanceText = this.state.userPrepaidESBalance.gt(0)
                ? `You can use your liquid ES tokens (${lessDecimals(
                    this.state.userLiquidEsBalance
                  )} ES) for this PET as there aren't enough tokens in your TimeAllyPET prepaidES.`
                : '';
            } else if (!isLiquidAvailable && isPrepaidAvailable) {
              insufficientBalanceText = `You can use your TimeAllyPET prepaidES tokens (${lessDecimals(
                this.state.userPrepaidESBalance
              )} ES) for this PET.`;
            } else {
              insufficientBalance = true;
              insufficientBalanceText = `Insufficient ES balance. You only have ${lessDecimals(
                this.state.userLiquidEsBalance
              )} liquid ES tokens${
                this.state.userPrepaidESBalance.gt(0)
                  ? ` and ${lessDecimals(
                      this.state.userPrepaidESBalance
                    )} TimeAllyPET prepaidES tokens.`
                  : '.'
              }`;
            }
          } else {
            console.log('3');
            insufficientBalance = true;
            insufficientBalanceText =
              `Your commitment is ${lessDecimals(this.state.monthlyCommitmentAmount)} ES` +
              (this.state.frequencyMode
                ? `, hence your amount should be ${lessDecimals(
                    this.state.monthlyCommitmentAmount.mul(this.state.frequencyMode || 1)
                  )} ES.`
                : '');
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
      const allowance = await window.prepaidEsInstance.allowance(
        window.wallet?.address,
        window.petInstance.address
      );

      // console.log('allowance', allowance, allowance.gte(ethers.utils.parseEther(this.state.userAmount).add(ethers.utils.parseEther(getFees(this.state.frequencyMode)))));

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

    const headingText = `Lump Sum Deposit`;

    const feesBN = ethers.utils
      .parseEther(this.state.userAmount.toString())
      .mul(getFees(this.state.frequencyMode) as ethers.BigNumberish)
      .div(100);

    const fees = ethers.utils.formatEther(feesBN);

    const userAmountWithFees = ethers.utils.formatEther(
      ethers.utils.parseEther(this.state.userAmount.toString()).add(feesBN)
    );

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

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  className="width-100"
                  as="select"
                  onChange={async (event) => {
                    await this.setState({ frequencyMode: +event.target.value });
                    this.state.frequencyMode = +event.target.value;
                    this.onAmountUpdate({ target: { value: this.state.userAmount } });
                  }}
                >
                  <option disabled selected={this.state.frequencyMode === null}>
                    Select SAP Frequency Mode
                  </option>
                  {[
                    [3, getFees(3)],
                    [6, getFees(6)],
                    [12, getFees(12)],
                  ]
                    .filter((entry) => entry)
                    .map((entry) => {
                      if (entry && entry[0])
                        return (
                          <option
                            key={'lumsumplan-' + entry[0]}
                            value={entry[0]}
                            selected={this.state.frequencyMode === 0}
                          >
                            {entry[0]} Months =&gt; {entry[1]}% Convenience Fee
                          </option>
                        );
                    })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="installmentAmount">
                <Form.Control
                  className="stakingInput"
                  autoFocus
                  onChange={this.onAmountUpdate}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter total deposit amount"
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
                disabled={
                  !this.state.userAmount ||
                  !this.state.frequencyMode ||
                  this.state.spinner ||
                  this.state.insufficientBalance
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
          </Card>
        </>
      );
    } else if (this.state.currentScreen === 1) {
      let displayText: any = '';
      if (this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = (
          <p>
            This dApp just noticed that you have{' '}
            <strong>{lessDecimals(this.state.userLiquidEsBalance)} liquid ES tokens</strong> as well
            as{' '}
            <strong>{lessDecimals(this.state.userPrepaidESBalance)} TimeAllyPET prepaidES</strong>.
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
            You have enough tokens (
            <strong>{lessDecimals(this.state.userLiquidEsBalance)} ES</strong>) in your wallet for
            PET. Go to Step 3 for doing approval procedure of{' '}
            <strong>
              {this.state.userAmount} ES + {fees} ES = {userAmountWithFees} ES
            </strong>{' '}
            to TimeAllyPET Smart Contract.
          </p>
        );
      } else if (!this.state.isLiquidAvailable && this.state.isPrepaidAvailable) {
        displayText = (
          <p>
            You have enough tokens in your TimeAllyPET prepaidES to make a deposit of{' '}
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
            liquid balance is <strong>{lessDecimals(this.state.userLiquidEsBalance)} ES</strong>
            {this.state.userPrepaidESBalance.gt(0) ? (
              <>
                {' '}
                and prepaidES balance is{' '}
                <strong>{lessDecimals(this.state.userPrepaidESBalance)} ES</strong>
              </>
            ) : null}
            . Are you sure you want to proceed? You can get ES tokens from anyone who has ES tokens.
            ES tokens are also trading on Probit Exchange, where you can exchange your other crypto
            assets with the exchange community for ES.
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
              style={{ display: 'block', width: '100%', margin: '0' }}
              disabled={!this.state.isLiquidAvailable}
              onClick={() =>
                this.setState({
                  usePrepaidES: false,
                  currentScreen: 2,
                })
              }
            >
              From Liquid:
              {lessDecimals(this.state.userLiquidEsBalance)}
            </Button>
            <Button
              variant="warning"
              style={{ display: 'block', width: '100%', margin: '0' }}
              disabled={!this.state.isPrepaidAvailable}
              onClick={() =>
                this.setState({
                  usePrepaidES: true,
                  currentScreen: 3,
                })
              }
            >
              From PrepaidES:
              {lessDecimals(this.state.userPrepaidESBalance)}
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
                    This step is for approving TimeAllyPET Smart Contract to collect{' '}
                    <strong>
                      {this.state.userAmount} ES + {fees} ES = {userAmountWithFees} ES
                    </strong>{' '}
                    from your account.{' '}
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
                          Note: Your {userAmountWithFees} ES has not been deposited in TimeAlly PET
                          Contract yet.
                        </strong>{' '}
                        Please go to third step to do your Lump Sum Deposit transaction.
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
                      {this.state.spinner ? 'Please wait...' : 'Approve TimeAllyPET'}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Alert variant="primary">
                    This dApp just noticed that you already have enough allowance. You can directly
                    continue to the third step and do your Lump Sum Deposit transaction.
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
                Please click the following button to confirm your PET Lump Sum Deposit of{' '}
                <strong>{this.state.userAmount} ES</strong> (additional <strong>{fees} ES</strong>{' '}
                will be charged making it total of <strong>{userAmountWithFees} ES</strong>).
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
                  : 'Confirm Lump Sum Deposit'}
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
              {/* <h3 style={{marginBottom: '15px'}}>{this.state.mo                                 nthId ? getOrdinalString(this.state.monthId) : ''} Lump Sum Deposit confirmed!</h3> */}
              <Alert variant="success">
                Your lump sum deposit transaction is confirmed. You can view your transaction on{' '}
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
                onClick={() => this.props.history.push('/pet-old/view/' + this.props.match.params.id)}
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
            const x: any = this.props.location.pathname.split('/');
            x.shift();
            return x;
          })(),
        ]}
        title={`Make Lump Sum Deposit`}
      >
        {screen}
        <TransactionModal
          show={this.state.showApproveTransactionModal}
          hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.prepaidEsInstance.connect(window.wallet?.connect(window.provider))
              .approve,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [window.petInstance.address, ethers.utils.parseEther(userAmountWithFees)],
            ESAmount: userAmountWithFees,
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
            //@ts-ignore
            transactor: window.petInstance.connect(window.wallet?.connect(window.provider))
              .makeFrequencyModeDeposit,
            estimator: () => ethers.constants.Zero,
            contract: window.petInstance,
            contractName: 'TimeAllyPET',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              ethers.utils.parseEther(this.state.userAmount.toString()),
              this.state.frequencyMode,
              this.state.usePrepaidES,
            ],
            ESAmount: userAmountWithFees,
            headingName: `Lump Sum Deposit (${this.state.frequencyMode} Months)`,
            functionName: 'makeFrequencyModeDeposit',
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

export default LumSumDeposit;
