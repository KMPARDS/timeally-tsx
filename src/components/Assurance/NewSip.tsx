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
