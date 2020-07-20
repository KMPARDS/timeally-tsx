import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class NavbarMain extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="NavbarComponent">
        <div className="top-bar">
          {/* top-bar */}
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-4 col-sm-6 d-none d-xl-block d-lg-block">
                <p className="mail-text">Current Time: </p>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3  d-none d-xl-block d-lg-block">
                <p className="mail-text text-center">ES Price: </p>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 d-none d-xl-block d-lg-block">
                <p className="mail-text text-center">Ether Price: </p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-none d-xl-block d-lg-block">
                <p className="mail-text text-center">Gas Price: </p>
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
                  </div>
                </div>
                <div className="col-sm-10">
                  <div className="quick-info">
                    <span>
                      <a className="btn main-btn btn-default btn-sm margin-custom">
                        Connect to a Wallet
                      </a>
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
                      <Link to="/">Home</Link>

                      <Link to="/1life1time">1Life1Time</Link>

                      <Link to="/dashboard">Dashboard</Link>
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
