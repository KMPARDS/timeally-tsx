import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Spinner,
  Alert,
  Badge,
  Card,
  ListGroup,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

const ethers = require('ethers');

class TransactionModal extends Component {
  state = {
    userAddress: '',
    contractAddress: '',
    currentScreen: 0,
    esTokensToBet: '',
    exaEsTokensToBet: '',
    estimating: false,
    estimationError: '',
    estimatedGas: 0,
    ethGasStation: {},
    selectedGwei: 0,
    stakingPlan: undefined,
    transactionStatus: 0,
    transactionError: '',
    hash: '',
  };

  // componentDidUpdate = () => {
  //   console.log(this.props);
  //   if(this.props.ethereum.directGasScreen) {
  //     this.setState({ currentScreen: 1 });
  //   }
  //   if(this.props.ethereum.stakingPlan) {
  //     console.log('soham', this.props.ethereum.stakingPlan);
  //     this.setState({ stakingPlan: this.props.ethereum.stakingPlan });
  //   }
  // }

  componentDidUpdate = async (prevProps) => {
    if (this.props.show && prevProps.show != this.props.show) {
      console.log(this.props);
      if (this.props.ethereum.directGasScreen) {
        // this.setState({ currentScreen: 1 });
        this.showEstimateGasScreen();
      }
      if (this.props.ethereum.stakingPlan !== undefined) {
        console.log('soham', this.props.ethereum.stakingPlan);
        this.setState({ stakingPlan: this.props.ethereum.stakingPlan });
      }
    }

    //console.log(await this.props.estimator() );

    //
    // let data = ethers.utils.hexDataSlice(ethers.utils.id('fee()'), 0, 4);
    //
    // let transaction = {
    //     to: address,
    //     data: data
    // }
    //
    // let callPromise = defaultProvider.call(transaction);
  };

  showEstimateGasScreen = async () => {
    this.setState({
      estimating: true,
      estimationError: '',
      userAddress: window.wallet.address.toLowerCase(),
      contractAddress: this.props.ethereum.contract.address,
    });

    try {
      //const amountStringArray = this.state.esTokensToBet.split('.');
      //
      // let betTokensInExaEsString;
      // if(amountStringArray[0].length === this.state.esTokensToBet.length) {
      //   // no decimal point
      //   betTokensInExaEsString = this.state.esTokensToBet + '0'.repeat(18);
      // } else {
      //   // decimal point is entered
      //   if(amountStringArray[1].length > 18 || amountStringArray[2]) {
      //     throw new Error('Can have only upto 18 decimal points');
      //   } else {
      //     // between 1 and 18 decimals
      //     betTokensInExaEsString = amountStringArray[0] + amountStringArray[1] + '0'.repeat(18 - amountStringArray[1].length);
      //   }
      // }
      //
      // this.state.exaEsTokensToBet = betTokensInExaEsString;
      //
      // const betTokensInExaEs = ethers.utils.bigNumberify(this.state.exaEsTokensToBet)//.mul(10**15).mul(10**3);
      const args = this.props.ethereum.directGasScreen
        ? this.props.ethereum.arguments
        : [this.state.stakingPlan];
      const estimatedGas = (await this.props.ethereum.estimator(...args)).toNumber();
      let ethGasStationResponse;
      try {
        ethGasStationResponse = (await axios.get('https://ethgasstation.info/json/ethgasAPI.json'))
          .data;
        console.log(ethGasStationResponse);
        await this.setState({
          ethGasStation: [
            ethGasStationResponse['safeLow'] / 10,
            ethGasStationResponse['average'] / 10,
            ethGasStationResponse['fast'] / 10,
            ethGasStationResponse['fastest'] / 10,
          ],
        });
      } catch (err) {
        console.log('Eth Gas Station API error:', err.message);
        await this.setState({ ethGasStation: [10, 15, 20, 25] });
      }
      this.setState({
        estimatedGas,
        selectedGwei: this.state.ethGasStation[this.state.ethGasStation.length - 1],
        currentScreen: 1,
      });

      this.setState({ currentScreen: 1 });
    } catch (e) {
      this.setState({ estimating: false, estimationError: e.message });
    }
  };

  sendTransaction = async () => {
    this.setState({ currentScreen: 3, transactionStatus: 1, transactionError: '' });
    const start = new Date();
    // const betTokensInExaEs = ethers.utils.bigNumberify(this.state.exaEsTokensToBet);
    try {
      const args = this.props.ethereum.directGasScreen
        ? this.props.ethereum.arguments
        : [this.state.stakingPlan];
      const overides = {
        gasPrice: ethers.utils.parseUnits(String(this.state.selectedGwei), 'gwei'),
      };
      console.log('this.props.ethereum', this.props.ethereum);
      if (this.props.ethereum.transferAmount)
        overides.value = ethers.utils.parseEther(this.props.ethereum.transferAmount);
      console.log({ args, overides });
      const response = await this.props.ethereum.transactor(...args, overides);
      console.log(response, `time taken: ${new Date() - start}`);
      this.setState({ transactionStatus: 2, hash: response.hash });
      await response.wait();
      this.setState({ transactionStatus: 3 });
    } catch (err) {
      console.log('Error from blockchain:' + err.message);
      this.setState({ transactionError: err.message });
    }
  };

  render() {
    let screenContent;
    // console.log('window.wallet._ethersType !== \'Signer\'', window.wallet._ethersType !== 'Signer');
    if (Object.entries(window.wallet).length === 0) {
      screenContent = (
        <Modal.Body style={{ textAlign: 'center' }}>
          <h5>You need to load your wallet to place your staking.</h5>
          <Button
            onClick={() => {
              window.redirectHereAfterLoadWallet = this.props.location.pathname;
              this.props.history.push('/load-wallet');
            }}
          >
            Load my wallet
          </Button>
          <hr />
          <h5>If you don't yet have a wallet, create it now.</h5>
          <Button onClick={() => this.props.history.push('/create-wallet')}>Create wallet</Button>
        </Modal.Body>
      );
      // } else if(window.wallet._ethersType !== 'Signer') {
    } else if (!window.wallet._isSigner) {
      screenContent = (
        <Modal.Body style={{ textAlign: 'center' }}>
          You are trying to do a transaction using an address. For a transaction on behalf of an
          address to be accepted by the blockchain, the private key corresponding to the address is
          required to sign the transaction. Without a private key, tranasaction cannot be signed.
          The private key can be in the form of a mnemonic, keystore or stored inside your hardware
          wallet or metamask. You can load your wallet to make transaction.
          <Button
            onClick={() => {
              window.redirectHereAfterLoadWallet = this.props.location.pathname;
              this.props.history.push('/load-wallet');
            }}
          >
            Go to load wallet page
          </Button>
        </Modal.Body>
      );
    } else if (this.state.currentScreen === 0) {
      screenContent = (
        <Modal.Body>
          {this.props.ethereum.directGasScreen ? null : (
            <>
              <h5>Please select a staking plan to create a new staking.</h5>
              <Form.Control
                as="select"
                style={{ width: '100%' }}
                onChange={(event) => this.setState({ stakingPlan: event.target.value })}
              >
                <option selected disabled>
                  Please click to select a plan
                </option>
                <option value="0">1 Year</option>
                <option value="1">2 Year</option>
              </Form.Control>
            </>
          )}
          {this.state.estimationError ? (
            <Alert variant="danger">
              There was this error while estimating: {this.state.estimationError}
            </Alert>
          ) : null}
          {this.state.estimationError && this.props.ethereum.directGasScreen ? null : (
            <div style={{ display: 'block', textAlign: 'center' }}>
              <Button
                onClick={this.showEstimateGasScreen}
                disabled={this.state.estimating || this.state.stakingPlan === undefined}
              >
                {this.state.estimating ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '2px' }}
                  />
                ) : null}
                {this.state.estimating
                  ? 'Estimating Gas'
                  : this.state.stakingPlan === undefined
                  ? 'Please select plan'
                  : 'Estimate Network Fees'}
              </Button>
            </div>
          )}
        </Modal.Body>
      );
    } else if (this.state.currentScreen === 1) {
      screenContent = (
        <Modal.Body style={{ padding: '15px' }}>
          From: Your address{' '}
          <strong>
            {this.state.userAddress.slice(0, 6) +
              '..' +
              this.state.userAddress.slice(this.state.userAddress.length - 3)}
          </strong>
          <br />
          To: {this.props.ethereum.contractName
            ? this.props.ethereum.contractName
            : 'TimeAlly'}{' '}
          address{' '}
          <strong>
            {this.state.contractAddress.slice(0, 6) +
              '..' +
              this.state.contractAddress.slice(this.state.contractAddress.length - 3)}
          </strong>
          <Card style={{ display: 'block', padding: '15px 15px 30px', marginTop: '5px' }}>
            {this.props.ethereum.functionName &&
            this.props.ethereum.functionName !== 'New Staking' ? (
              <Badge variant="dark">{this.props.ethereum.functionName}</Badge>
            ) : (
              <>
                <Badge variant="dark">New Staking</Badge> with&nbsp;
                <Badge variant={this.state.stakingPlan == 0 ? 'success' : 'warning'}>
                  {this.state.stakingPlan == 0
                    ? '1 Year Plan'
                    : this.state.stakingPlan == 1
                    ? '2 Year Plan'
                    : 'Plan Id ' + this.state.stakingPlan}
                </Badge>
                {this.props.ethereum.directGasScreen ? null : 'using Vesting Rewards balance:'}
              </>
            )}
            <span style={{ display: 'block', fontSize: '1.8rem' }}>
              {this.props.ethereum.reward || this.props.ethereum.ESAmount}
              <strong>ES</strong>
            </span>
            Network fee of Ethereum:
            <span style={{ display: 'block', fontSize: '1.8rem' }}>
              {Math.round(this.state.estimatedGas * this.state.selectedGwei) / 10 ** 9}
              <strong>ETH</strong>
            </span>
            <span
              onClick={() => this.setState({ currentScreen: 2 })}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                float: 'right',
                fontSize: '0.8rem',
                textDecoration: 'underline',
              }}
            >
              Advanced settings
            </span>
          </Card>
          {(() => {
            if (this.state.selectedGwei <= this.state.ethGasStation[0]) {
              return (
                <Alert variant="danger">
                  Your transaction might take plenty of hours to get confirmed. Please increase gas
                  price from advanced settings.
                </Alert>
              );
            } else if (this.state.selectedGwei < this.state.ethGasStation[3]) {
              return (
                <Alert variant="warning">
                  Your transaction might take some time to get confirmed. If you don't want to wait,
                  you can increase gas price.
                </Alert>
              );
            } else if (this.state.selectedGwei > this.state.ethGasStation[3]) {
              return (
                <Alert variant="success">
                  You have selected higher gas fee than what others are paying. Your transaction
                  would be prioritized by the miners and would be confirmed in the next one or two
                  blocks!
                </Alert>
              );
            }
          })()}
          <Button
            style={{ margin: '0' }}
            variant="primary"
            size="lg"
            block
            onClick={this.sendTransaction}
          >
            {window.connectedToMetamask ? 'Proceed to Metamask' : 'Sign and Submit'}
          </Button>
          {/*<Row style={{marginTop: '12px'}}>
            <Col style={{paddingRight: '6px'}}>
              <Button variant="secondary" size="lg" block>Reject</Button>
            </Col>
            <Col>

            </Col>
          </Row>*/}
        </Modal.Body>
      );
    } else if (this.state.currentScreen === 2) {
      screenContent = (
        <Modal.Body style={{ padding: '15px' }}>
          <h5>Advanced gas settings</h5>
          {[
            { name: 'Slow', gwei: '1 ESMETER', time: 'around 30 mins to confirm' },
            {
              name: 'Average',
              gwei: '5 ESMETER',
              time: 'around 10 mins to confirm',
            },
            { name: 'Fast', gwei: '10 ESMETER', time: 'around 2 mins to confirm' },
            {
              name: 'Faster',
              gwei: '20 ESMETER',
              time: 'around 30 secs to confirm',
            },
          ].map((plan) => (
            <Card
              key={'advanced-' + plan.name}
              style={{ cursor: 'pointer', margin: '10px 0', padding: '10px' }}
              onClick={() => {
                // update the gwei being used
                // change screen to 1
                this.setState({
                  selectedGwei: plan.gwei,
                  currentScreen: 1,
                });
              }}
            >
              <Card.Title>
                {plan.name} ({plan.gwei} per unit gas)
              </Card.Title>
              <Card.Subtitle>
                {Math.round(this.state.estimatedGas * plan.gwei) / 10 ** 9} ETH
              </Card.Subtitle>
              <Card.Text>{plan.time}</Card.Text>
            </Card>
          ))}
          <Card style={{ margin: '10px 0', padding: '10px' }}>
            <Card.Title>Custom Gas Price</Card.Title>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(event) => this.setState({ selectedGwei: event.target.value })}
                value={this.state.selectedGwei}
                placeholder="Enter Gas Price in gwei"
                aria-label="Gas Price"
                aria-describedby="Gas Price Modal"
              />
              <InputGroup.Append>
                <InputGroup.Text id="customGas-units">gwei</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <Card.Text>
              {/* Network fee: {Math.round(this.state.estimatedGas * this.state.selectedGwei) / 10 ** 9}{' '}
              ETH */}
              Estimated Gas Fee :0.001014025 ES <br />
              More You pay the gas fee,more quickly <br />
              your transaction will be confirmed, as it'd be preferred
              <br />
              by validators to include in the next block they're sealing.
            </Card.Text>
            <p>
              You can refer to{' '}
              <a style={{ color: 'black' }} href="https://ethgasstation.info/" target="_blank">
                Eth Gas Station
              </a>{' '}
              for gas price stastics.
            </p>
            <button onClick={() => this.setState({ currentScreen: 1 })}>Proceed</button>
          </Card>
        </Modal.Body>
      );
    } else if (this.state.currentScreen === 3) {
      screenContent = (
        <Modal.Body style={{ padding: '15px' }}>
          <p>
            {this.state.transactionError ? (
              <Alert variant="danger">{this.state.transactionError}</Alert>
            ) : this.state.transactionStatus === 0 ? (
              'Your transaction is being prepared...'
            ) : this.state.transactionStatus === 1 ? (
              window.connectedToMetamask ? (
                'Please check MetaMask and CONFIRM to proceed...'
              ) : (
                'Sending your transaction to the Blockchain...'
              )
            ) : this.state.transactionStatus === 2 ? (
              'Waiting for confirmation of the transaction...'
            ) : this.state.transactionStatus === 3 ? (
              'Your transaction is confirmed!'
            ) : null}
          </p>
          {this.state.hash ? (
            <p>
              You can view your transaction on{' '}
              <a
                href={`https://eraswap.info/txn/${this.state.hash}`}
                style={{ color: 'black', textDecoration: 'underline' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Eraswap.info
              </a>
            </p>
          ) : null}

          {this.state.transactionStatus === 3 ? (
            <Button
              style={{ margin: '0' }}
              variant="primary"
              size="lg"
              block
              onClick={
                this.props.ethereum.continueFunction
                  ? this.props.ethereum.continueFunction.bind(this, this.state.hash)
                  : () => this.props.history.push('/stakings')
              }
            >
              {this.props.ethereum.continueFunction ? 'Continue' : 'Go to Stakings Page'}
            </Button>
          ) : null}
        </Modal.Body>
      );
    } else {
      screenContent = (
        <div>
          <Modal.Body>
            <p>
              Ethereum Network Fee: <br />
              Slow Safe:{' '}
              {Math.round(this.state.estimatedGas * (this.state.ethGasStation[0] / 10)) /
                10 ** 9}{' '}
              ETH
              <br />
              Average:{' '}
              {Math.round(this.state.estimatedGas * (this.state.ethGasStation[1] / 10)) /
                10 ** 9}{' '}
              ETH
              <br />
              Fast:{' '}
              {Math.round(this.state.estimatedGas * (this.state.ethGasStation[2] / 10)) /
                10 ** 9}{' '}
              ETH
              <br />
              Fastest:{' '}
              {Math.round(this.state.estimatedGas * (this.state.ethGasStation[3] / 10)) /
                10 ** 9}{' '}
              ETH
              <br />
              Click below button to sign your transaction and submit it to the blockchain.
            </p>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <Button>Sign and send to Blockchain</Button>
            </div>
          </Modal.Body>
        </div>
      );
    }
    return (
      <Modal
        {...this.props}
        onHide={() => {
          this.props.hideFunction();
          setTimeout(() => {
            this.setState({
              currentScreen: 0,
              esTokensToBet: 0,
              estimating: false,
              estimatedGas: 0,
              ethGasStation: {},
              stakingPlan: undefined,
            });
          }, 500);
        }}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              wordBreak:
                this.props.ethereum.headingName &&
                this.props.ethereum.headingName.split(' ').filter((word) => word.length >= 10)
                  .length > 0
                  ? 'break-all'
                  : 'break-word',
            }}
          >
            {this.props.ethereum.headingName || 'New Staking'}
          </Modal.Title>
        </Modal.Header>
        {screenContent}
      </Modal>
    );
  }
}
export default withRouter(TransactionModal);
