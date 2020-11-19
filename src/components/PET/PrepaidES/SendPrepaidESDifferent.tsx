import React, { Component } from 'react';
import { Row, Col, Table, Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import TransactionModal from '../../TransactionModal/TransactionModal';

const esContract = '';
const PET = '';

const ethers = require('ethers');

class SendPrepaidESDifferent extends Component {
  state = {
    currentScreen: 0,
    userAmount: undefined,
    spinner: false,
    waiting: false,
    approveTxHash: '',
    txHash: '',
    errorMessage: '',
    showSendPrepaidESDifferentTransactionModal: false,
    prepaidESBalance: null,
    entriesToSend: [
      {
        address: '',
        amount: '',
      },
    ],
  };

  componentDidMount = async () => {
    // const prepaidESBalance = await window.petInstance.functions.prepaidES(
    //   window.wallet.address);
    // this.setState({ prepaidESBalance });
  };

  onFirstSubmit = (event: any) => {
    event.preventDefault();
    let rowNumber = 0;
    try {
      const entriesToSend = [...this.state.entriesToSend];
      entriesToSend.forEach((entry, index) => {
        rowNumber = index;
        ethers.utils.getAddress(entry.address);
        ethers.utils.parseEther(entry.amount);
      });
      this.setState({ currentScreen: 1, errorMessage: '' });
    } catch (error) {
      this.setState({ errorMessage: `On row ${rowNumber}: ` + error.message });
    }
  };

  getTotalSendingAmount = () => {
    let amount = 0;
    this.state.entriesToSend.forEach((entry) => (amount += +entry.amount));
    return amount;
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
      screen = (
        <>
          <Card>
            <Form
              className="mnemonics"
              onSubmit={this.onFirstSubmit}
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                padding: '20px 40px',
                margin: '15px',
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>Send Prepaid ES Different - Step 1 of 2</h3>
              <Form.Group controlId="entriesToSend">
                {this.state.entriesToSend.map((entry, index) => {
                  return (
                    <>
                      <Row style={{ backgroundColor: '#0001', padding: '0', margin: '1rem 0' }}>
                        <Col md="auto" style={{ padding: '1rem' }}>
                          Entry: {index + 1}
                        </Col>
                        <Col>
                          <div style={{ display: 'block' }}>
                            <Form.Control
                              style={{ width: '100%', border: '1px solid grey' }}
                              onChange={(event) => {
                                const entriesToSend = [...this.state.entriesToSend];
                                entriesToSend[index].address = event.target.value;
                                this.setState({ entriesToSend });
                              }}
                              value={entry.address}
                              type="text"
                              autoComplete="off"
                              placeholder="Enter Address"
                              // isInvalid={this.state.errorDisplay}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div style={{ display: 'block' }}>
                            <Form.Control
                              style={{ width: '100%', border: '1px solid grey' }}
                              onChange={(event) => {
                                const entriesToSend = [...this.state.entriesToSend];
                                entriesToSend[index].amount = event.target.value;
                                this.setState({ entriesToSend, errorMessage: '' });
                              }}
                              value={entry.amount}
                              type="text"
                              autoComplete="off"
                              placeholder="Enter PrepaidES to Send"
                              // isInvalid={this.state.errorDisplay}
                            />
                          </div>
                        </Col>
                        {this.state.entriesToSend.length > 1 ? (
                          <Col md="auto" style={{ padding: '1rem' }}>
                            <Button
                              onClick={() => {
                                this.setState({
                                  entriesToSend: [...this.state.entriesToSend].filter(
                                    (entry, i) => i !== index
                                  ),
                                  errorMessage: '',
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                        ) : null}
                      </Row>
                    </>
                  );
                })}
              </Form.Group>

              {this.state.errorMessage ? (
                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
              ) : null}

              <Button
                variant="primary"
                onClick={() => {
                  const entriesToSend = [...this.state.entriesToSend];
                  entriesToSend.push({
                    address: '',
                    amount: '',
                  });
                  this.setState({ entriesToSend });
                }}
              >
                Add Entry
              </Button>

              <Button
                variant="primary"
                id="firstSubmit"
                type="submit"
                disabled={(() => {
                  let disabled = false;
                  this.state.entriesToSend.forEach((entry) => {
                    if (!entry.address || !entry.amount) disabled = true;
                  });
                  return disabled;
                })()}
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
      screen = (
        <>
          <Card>
            <div
              className="custom-pad-margin"
              style={{
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
                width: '100%',
                padding: '20px 40px',
                margin: '15px',
              }}
            >
              {startOverAgainButton}

              <Table responsive>
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.entriesToSend.map((entry) => (
                    <tr>
                      <td>{entry.address}</td>
                      <td>{entry.amount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td>{this.getTotalSendingAmount()}</td>
                  </tr>
                </tbody>
              </Table>

              {this.state.errorMessage ? (
                <Alert variant="danger">{this.state.errorMessage}</Alert>
              ) : null}
              <Button
                onClick={() => {
                  this.setState({
                    showSendPrepaidESDifferentTransactionModal: true,
                    spinner: true,
                  });
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
                  : 'Send PrepaidES'}
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
              <h3 style={{ marginBottom: '15px' }}>PrepaidES Sent!</h3>
              <Alert variant="success">
                PrepaidES are sent! You can view your transaction on{' '}
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
                . Since, this is not Liquid EraSwap transaction, EtherScan does not show the tokens
                transferred clearly.
              </Alert>
              <Button
              // onClick={() => this.props.history.push('/pet')}
              >
                Go to PET Home
              </Button>
            </div>
          </Card>
        </>
      );
    }

    return (
      <Layout
        breadcrumb={['Home', 'PET', 'New']}
        title="Send Prepaid ES Different"
        subtitle="Send multiple Prepaid ES in one transaction!"
        buttonName="Add to Prepaid ES"
        // buttonOnClick={() => this.props.history.push('/pet/prepaid-es/add-to-prepaid')}
      >
        <p style={{ marginTop: '.5rem' }}>
          Your PrepaidES balance:{' '}
          {this.state.prepaidESBalance
            ? ethers.utils.formatEther(this.state.prepaidESBalance)
            : 'Loading...'}{' '}
          ES
        </p>
        {screen}
        <TransactionModal
          show={this.state.showSendPrepaidESDifferentTransactionModal}
          hideFunction={() =>
            this.setState({ showSendPrepaidESDifferentTransactionModal: false, spinner: false })
          }
          ethereum={{
            // transactor: window.petInstance.functions.sendPrepaidESDifferent,
            estimator: window.petInstance.estimate.sendPrepaidESDifferent,
            contract: window.petInstance,
            contractName: 'TimeAllyPET',
            arguments: [
              this.state.entriesToSend.map((entry) => entry.address),
              this.state.entriesToSend.map((entry) => ethers.utils.parseEther(entry.amount || '0')),
            ],
            ESAmount: String(this.getTotalSendingAmount()),
            headingName: 'Send Prepaid ES Different',
            functionName: 'sendPrepaidESDifferent',
            // stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: (txHash: any) =>
              this.setState({
                spinner: false,
                currentScreen: 2,
                showSendPrepaidESDifferentTransactionModal: false,
                txHash,
              }),
          }}
        />
      </Layout>
    );
  }
}

export default SendPrepaidESDifferent;
