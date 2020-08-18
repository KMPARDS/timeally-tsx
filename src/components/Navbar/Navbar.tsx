import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { routine } from '../../utils';
import './Navbar.css';

type State = {
  walletAddress: string | null;
  addressCopied: boolean;
  currentTime: number;
  esPrice: string;
};

export class NavbarMain extends Component<{}, State> {
  state: State = {
    walletAddress: null,
    addressCopied: false,
    currentTime: Date.now(),
    esPrice: '',
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.updateWalletStatus, 500));
    this.intervalIds.push(routine(this.updateTime, 500));
    this.intervalIds.push(routine(this.fetchEsPrice, 10000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateWalletStatus = async () => {
    const isWalletLoaded = !!window.wallet;

    const currentWalletAddress: string | null = window.wallet
      ? (await window.wallet?.getAddress()) ?? window.wallet.address
      : null;

    if (currentWalletAddress !== this.state.walletAddress) {
      this.setState({ walletAddress: currentWalletAddress });
    }
  };

  fetchEsPrice = async () => {
    const result = await fetch('https://eraswap.technology/probit/getESPrice');
    const json = await result.json();
    const prices = json.data.probitResponse.data as { last: string }[];
    this.setState({
      esPrice: prices[0].last + ' USDT / ' + prices[1].last + ' BTC',
    });
  };

  updateTime = () => {
    this.setState({ currentTime: Date.now() });
  };

  copyAddress = () => {
    if (this.state.walletAddress && copy(this.state.walletAddress)) {
      this.setState({ addressCopied: true });
      setTimeout(() => this.setState({ addressCopied: false }), 2000);
    }
  };

  render() {
    return (
      <div className="NavbarComponent">
        <div className="top-bar">
          {/* top-bar */}
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6 d-none d-xl-block d-lg-block">
                <p className="mail-text">
                  Current Time: {new Date(this.state.currentTime).toLocaleString()}
                </p>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4  d-none d-xl-block d-lg-block">
                <p className="mail-text text-center">ES Price: {this.state.esPrice}</p>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-2 d-none d-xl-block d-lg-block">
                <p className="mail-text text-center">Gas Price: 0 ESMETER</p>
              </div>
            </div>
          </div>
        </div>
        <div className="header-standard header">
          <div className="top-header">
            <div className="container">
              <div className="row">
                <div className="col-sm-2">
                  {/* logo */}
                  <div className="logo">
                    <img src="/images/logo.png" alt="TimeAlly" />
                    {process.env.NODE_ENV === 'development' ? (
                      <span style={{ color: 'red' }}>[Testnet]</span>
                    ) : null}
                  </div>
                </div>
                <div className="col-sm-10">
                  <div className="quick-info">
                    <span>
                      {this.state.walletAddress && window.wallet ? (
                        <>
                          <span
                            className="btn main-btn btn-default btn-sm margin-custom"
                            onClick={this.copyAddress}
                            style={{ cursor: 'pointer' }}
                          >
                            {this.state.addressCopied ? (
                              <>address copied</>
                            ) : (
                              <>
                                {this.state.walletAddress.slice(0, 6)}...
                                {this.state.walletAddress.slice(38)}
                              </>
                            )}
                          </span>
                          <Link
                            className="btn main-btn btn-default btn-sm margin-custom"
                            to="/1lifetime"
                            onClick={() => {
                              delete window.wallet;
                            }}
                          >
                            Logout
                          </Link>
                        </>
                      ) : (
                        <Link
                          to="/load-wallet"
                          className="btn main-btn btn-default btn-sm margin-custom"
                        >
                          Connect to a Wallet
                        </Link>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-light-blue">
            <div className="container">
              <div className="row">
                {/* logo */}
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Link to="/">
                        <div className="navbar-item">Home</div>
                      </Link>
                      <Link to="/dashboard">
                        <div className="navbar-item">Dashboard</div>
                      </Link>

                      <Link to="/1lifetime">
                        <div className="navbar-item">
                          1LifeTime
                          <img src="/images/new.png" className="new-img" alt="TimeAlly" />
                        </div>
                      </Link>
                      <Nav.Link
                        as="a"
                        href="https://www.youtube.com/embed/LfRqq2EnQBQ"
                        target="_blank"
                      >
                        <span style={{ color: '#fff' }}>
                          1LifeTime Teaser{' '}
                          <img
                            src="/images/new.png"
                            style={{ height: '20px', position: 'relative', bottom: '10px' }}
                          />
                        </span>
                      </Nav.Link>

                      <Link to="/wallet">
                        <div className="navbar-item">My Wallet</div>
                      </Link>

                      <Link to="/stakings">
                        <div className="navbar-item">Stakings</div>
                      </Link>
                      <Link to="/nominee">
                        <div className="navbar-item">Nominee</div>
                      </Link>

                      <Link to="/support">
                        <div className="navbar-item">Report a bug</div>
                      </Link>

                      <Link to="/terms">
                        <div className="navbar-item">Terms & Conditions</div>
                      </Link>
                    </Navbar.Collapse>
                  </Navbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
