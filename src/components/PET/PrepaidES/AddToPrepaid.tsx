import React, { Component } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import Modal from "react-responsive-modal";
import TransactionModal from '../../TransactionModal/TransactionModal';
const ethers = require('ethers');

const esContract = '';
const pet = '';

class AddToPrepaid extends Component {
  state = {
    currentScreen: 0,
    userAmount: undefined,
    // plan: undefined,
    spinner: false,
    waiting: false,
    approveTxHash: '',
    txHash: '',
    open: false,
    errorMessage: '',
    showApproveTransactionModal: false,
    showSendPrepaidESTransactionModal: false,
    approveSuccess: false,
    approveAlreadyDone: false,
    userLiquidEsBalance: undefined,
    insufficientBalance: false,
    errorText: ''
  }

  componentDidMount= async() => {
    if(window.walletInstance) {
      const userLiquidEsBalance = await window.esInstance.functions.balanceOf(window.walletInstance.address);
      this.setState({ userLiquidEsBalance });
    }
  }

  onAmountUpdate = async event => {
    try {
      ethers.utils.parseEther(event.target.value);
      if(this.state.userLiquidEsBalance) {
        this.setState({
          userAmount: event.target.value,
          insufficientBalance: ethers.utils.parseEther(event.target.value).gt(this.state.userLiquidEsBalance),
          errorText: 'Insufficient balance ES balance'
        });
      } else {
        this.setState({ userAmount: event.target.value, insufficientBalance:false });
      }
    } catch (error) {
      this.setState({
        userAmount: '',
        insufficientBalance: event.target.value !== '',
        errorText: event.target.value !== '' ? error.message : ''
      });
    }
    // console.log('this.state.userLiquidEsBalance', this.state.userLiquidEsBalance, this.state.insufficientBalance);
  }

  onPlanChange = event => {
    this.setState({ plan: event.target.value });
    console.log(event.target.value);
  }

  onFirstSubmit = async event => {
    event.preventDefault();

    await this.setState({ spinner: true });
    const allowance = await window.esInstance.functions.allowance(
      window.walletInstance.address,
      window.petInstance.address
    );

    console.log('allowance', allowance, allowance.gte(ethers.utils.parseEther(this.state.userAmount)));

    if(allowance.gte(ethers.utils.parseEther(this.state.userAmount))) {
      this.setState({
        spinner: false,
        currentScreen: 1,
        approveAlreadyDone: true
      });
    } else {
      this.setState({ spinner: false, currentScreen: 1, approveAlreadyDone: false });
    }
  }

  render() {
    let screen;

    const heading = <>Add to Prepaid</>;

    if(this.state.currentScreen === 0) {
      screen = (
        <Card>
          <Form className="mnemonics custom-width" onSubmit={this.onFirstSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>

            <h3 style={{marginBottom: '15px'}}>{heading} - Step 1 of 3</h3>

            <Form.Group controlId="stakingAmount">
              <Form.Control
                className="stakingInput"
                onChange={this.onAmountUpdate}
                type="text"
                placeholder="Enter ES to add as PrepaidES"
                style={{width: '325px'}}
                autoComplete="off"
                isInvalid={this.state.insufficientBalance}
              />
              {this.state.insufficientBalance ? <p style={{color: 'red', textAlign: 'left'}}>{this.state.errorText}</p> : null}
            </Form.Group>


            <Button variant="primary" id="firstSubmit" type="submit" disabled={!this.state.userAmount || this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              { this.state.spinner ? 'Please wait..' : 'Next'}
            </Button>
          </Form>
        </Card>
      );
    } else if(this.state.currentScreen === 1) {
      screen = (
        <Card>
          <div className="mnemonics custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>{heading} - Step 2 of 3</h3>
            {!this.state.approveAlreadyDone ? <>
              <p style={{padding: '10px'}}>This step is for approving TimeAlly PET Smart Contract to collect {this.state.userAmount} ES from your account for converting it into PET PrepaidES. <strong>No funds will not be debited from your account in this step.</strong> Funds will be debited in Step 3 and sent into TimeAlly PET Smart Contract when you do the addToPrepaid transaction.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
              {this.state.approveSuccess
                ? <>
                  <Alert variant="warning">Your approve tx is confirmed! <strong>Note: Your {this.state.userAmount} ES has not been added into TimeAlly PET PrepaidES yet.</strong> Please go to third step to do your addToPrepaid transaction.</Alert>
                  <Button onClick={() => this.setState({ currentScreen: 2 })}>
                    Go to 3rd Step
                  </Button>
                </>
                : <Button onClick={() => {
                    this.setState({ showApproveTransactionModal: true, spinner: true });
                }} disabled={this.state.spinner}>
                {this.state.spinner ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{marginRight: '2px'}}
                /> : null}
                {this.state.spinner ? 'Please wait...' : 'Approve TimeAlly'}
              </Button>}
            </> : <>
              <Alert variant="primary">This dApp just noticed that you already have enough allowance. You can directly continue to the third step and do your addToPrepaid transaction.</Alert>
              <Button onClick={() => this.setState({ currentScreen: 2 })}>
                Go to 3rd Step
              </Button>
            </>}
            <Button variant="secondary" onClick={() => this.setState({ currentScreen: this.state.currentScreen - 1, spinner: false })}>Back</Button>
          </div>
        </Card>
      );
    } else if(this.state.currentScreen === 2) {
      screen = (
        <Card>
          <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
            <h3 style={{marginBottom: '15px'}}>{heading} - Step 3 of 3</h3>
            <p>Please click the following button to confirm your topup.</p>
              {
                this.state.errorMessage
                ? <Alert variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                : null
              }
            <Button onClick={() => {
                  this.setState({ showSendPrepaidESTransactionModal: true, spinner: true });
              }} disabled={this.state.spinner}>
              {this.state.spinner ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              {this.state.waiting ? 'Waiting for confirmation' : ( this.state.spinner ? 'Sending transaction' : 'AddToPrepaid')}
            </Button>
            { this.state.txHash
              ? <p>You can view your transaction on <a style={{color: 'black'}} href={`https://${process.env.network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a>.</p>
              : null
            }
          </div>
        </Card>
      );
    } else {
      screen = (
          <Card>
            <div className="custom-width" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding:'20px 40px', margin: '15px auto'}}>
              <h3 style={{marginBottom: '15px'}}>Add to Prepaid!</h3>
              <Alert variant="success">Your addToPrepaid is done. You can view your transaction on <a style={{color: 'black'}} href={`https://${process.env.network === 'homestead' ? '' : 'kovan.'}etherscan.io/tx/${this.state.txHash}`} target="_blank" rel="noopener noreferrer">EtherScan</a></Alert>
              <Button onClick={() => this.props.history.push('/pet/prepaid-es')}>Go to PrepaidES</Button>
            </div>
          </Card>
      );
    }

    return (
      <>
      <Layout
        breadcrumb={['Home', 'PET', 'PrepaidES', 'AddToPrepaid']}
        title="PET Add To Prepaid"
        subtitle="Add ES to your PET Prepaid for direct transactions"
        transparent={true}
      >
        {screen}
        {console.log(this.state)}
        <TransactionModal
          show={this.state.showApproveTransactionModal}
          hideFunction={() => this.setState({ showApproveTransactionModal: false, spinner: false })}
          ethereum={{
            transactor: window.esInstance.functions.approve,
            estimator: window.esInstance.estimate.approve,
            contract: window.esInstance,
            contractName: 'EraSwap',
            arguments: [window.petInstance.address, ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0')],
            ESAmount: this.state.userAmount,
            headingName: 'Approval Status',
            functionName: 'Approve',
            // stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () => this.setState({
              spinner: false,
              // currentScreen: 2,
              approveSuccess: true,
              showApproveTransactionModal: false
            })
          }}
        />
        <TransactionModal
            show={this.state.showSendPrepaidESTransactionModal}
            hideFunction={() => this.setState({ showSendPrepaidESTransactionModal: false, spinner: false })}
            ethereum={{
              transactor: window.petInstance.functions.addToPrepaid,
              estimator: window.petInstance.estimate.addToPrepaid,
              contract: window.petInstance,
              contractName: 'TimeAlly PET',
              arguments: [ethers.utils.parseEther(this.state.userAmount?this.state.userAmount:'0')],
              ESAmount: this.state.userAmount,
              headingName: 'Add To Prepaid',
              functionName: 'addToPrepaid',
              // stakingPlan: this.state.plan,
              directGasScreen: true,
              continueFunction: txHash => this.setState({
                spinner: false,
                currentScreen: 3,
                showSendPrepaidESTransactionModal: false,
                txHash
              })
            }}
          />
          </Layout>
      </>
    )
  }
}

export default AddToPrepaid;
