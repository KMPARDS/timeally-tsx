import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

import './OneLifeTime.css';

export class OneLifeTime extends Component {
  render() {
    return (
      <div>
        <div className="hero-section lifetime">
          <div className="container">
            <div className="row">
              <div className="banner-con ">
                <div className="hero-tab-block">
                  <div className="banner-in-bg pinside40">
                    <h1 className="text-white">TimeAlly 1 Life Time Smart Contract</h1>
                    <p className="text-white">
                      First Generation TimeAlly Smart Contract is built especially for the staker,
                      who wants to support ESN & Accumulate Era Swap in Long-term.
                    </p>
                    <div className="mt30">
                      <Link to="stakings/new" className="btn btn-default main-btn-blue mt10 mr20">
                        GET STARTED
                      </Link>
                      <Link to="/stakings" className="btn  bg-txt-white mt10 ">
                        VIEW MY STAKINGS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white what-bg">
          <div className="container pinside20 ">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-md-12 col-sm-12 col-12 mt20 mb30">
                <div className="mb30 text-center section-title ">
                  {/* section title start*/}
                  <h2>FEATURES OF TIMEALLY 1LT REWARDS FOR PARTICIPANTS IN ES</h2>
                </div>
                {/* /.section title start*/}
                <div className="row mt20">
                  <div className="col-md-4 pinside40 bor-right text-center">
                    <div className="what-dapp ">
                      <h1>15% of NRT</h1>
                      <p>TimeAlly can be claimed 50% in TimeAlly stakes and 50% in ES</p>
                    </div>
                  </div>
                  <div className="col-md-4 pinside40 bor-right text-center">
                    <div className="what-timeally">
                      <h1>10% of NRT</h1>
                      <p>
                        Power Tokens can be sent 50% in TimeAlly stakes and 50% in Wrapped ES (WES)
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 pinside40 text-center">
                    <div className="what-timeally">
                      <h1>12% of NRT</h1>
                      <p>
                        ESN PoS CP can be claimed in Wrapped ES (WES) if POS delegated to ESN node
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-space80">
          <div className="container">
            <div className="row">
              <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                <div className="section-title mb60 text-center">
                  {/* section title start*/}
                  <p className="opp-txt-sz">
                    Opportunity for Era Swap Stakers to avail TimeAlly Loan based on there IssTime
                    Limit in their stakings section
                  </p>
                </div>
                {/* /.section title start*/}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-6 pdb30">
                <div className="business-loan-sample bg-boxshadow">
                  <img className="loan-hnd-img" src="./images/loan.jpg" />
                  <div className="loan-products-content col-md-12">
                    <h3 className="mt20">TimeAlly Loan</h3>
                    <p>
                      Time Ally 1 Life Time Stake holders will get opportunity to avail TimeAlly
                      Loan based on theit IssTime Limit, which they have to repay back within 30 Day
                      10 Hours or before end of ES NRT Month (whichever is earlier).{' '}
                    </p>
                    <p>There will be an interest of 0.1% per day on the Loan amount.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 pdb30">
                <div className="business-loan-sample bg-boxshadow">
                  <div className="loan-products-content">
                    <img className="loan-hnd-img" src="./images/calc.jpg" />
                    <div className="loan-products-content col-md-12">
                      <h3 className="mt20">ISSTIME LIMIT</h3>
                      <p>
                        IssTime Limit decides the individual TimeAlly Loan Limit of a staker in his
                        / her TimeAlly 1 Life Time Smart Contracts. Based on his / her IssTime Limit
                        a staker can claim TimeAlly Loan.
                      </p>
                      <p>
                        IssTime Limit depends on Four levers, whose Sum collectively decides the
                        IssTime Limit of a staker
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="loan-work-bg">
          <div className="card-loan-hero-section ">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* hero-caption */}
                  <div className="card-hero-block text-center">
                    <h1 className="text-white">Why People Choose Us</h1>
                    <p className="text-white">
                      TimeAlly 1LT is also a perfect solution for stakers
                      <br />
                      who do not want to get into the risk of day trading to maximize their token
                      counts.
                    </p>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6 col-lg-4 pdt30">
                          <div className="">
                            <div className="sm-calc-flex">
                              <img className="sm-calc-img" src="./images/smallcalc.png" />
                            </div>
                            <h3 className="text-white mt20 ">Multiple Reward Options</h3>
                            <p className="text-white ">
                              TimeAlly 1Life Time offers rewards to users from multiple options of
                              NRT Distribution Chart. i.e. 15% + 10% + 12% of NRT for staking once
                              in 1LT.
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4 pdt30">
                          <div className="">
                            <div className="sm-calc-flex">
                              <img className="sm-calc-img" src="./images/smallcalc.png" />
                            </div>
                            <h3 className="text-white mt20">Long Term</h3>
                            <p className="text-white">
                              TimeAlly 1Life Time empowers community members to participate in ESN
                              via PoS CP to secure their stakes and withstand network inflation in
                              Long Term leveraging Decentralized Structure of Era Swap DAO.
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-4 pdt30">
                          <div className="">
                            <div className="sm-calc-flex">
                              <img className="sm-calc-img" src="./images/smallcalc.png" />
                            </div>
                            <h3 className="text-white mt20">Flexible</h3>
                            <p className="text-white">
                              TimeAlly Staking (TA 1Life Time) offers TimeAlly Loan with flexible
                              IssTime Limit based on 4 Key Levers for an Individual's IssTime Limit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.hero-caption */}
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 text-right">
                  <div className="mt10">
                    {/* <img src="./images/TimeAlly-Info-wp.png" alt className="img-fluid" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="test-bg">
          <div className="card-hero-section">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* hero-caption */}
                  <div className="card-hero-block text-center">
                    <h1 className="text-white mb40">TimeAlly Stakers Testimonials </h1>
                    <div className="row">
                      <div className="col-md-6 col-lg-4 pdb30">
                        <div className="business-loan-products bg-boxshadow">
                          <div className="loan-products-content">
                            <p className="read-more-wrap">
                              I loved the transparency in TimeAlly Staking Smart Contracts available
                              for stakers. I would really recommend it to people who are looking for
                              a long-term accumulation staking plan.{' '}
                            </p>
                            <p className="testimonial-txt">-Manoj Kumar</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 pdb30">
                        <div className="business-loan-products bg-boxshadow">
                          <div className="loan-products-content">
                            <p className="read-more-wrap">
                              TimeAlly 1 Life Time Smart Contract is the foundation to participate
                              in Era Swap Network, which will be the game-changer for the future
                              economy. I have staked in Era Swap and look forward to it.
                            </p>
                            <p className="testimonial-txt">-Shyam Pandey</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-4 pdb30">
                        <div className="business-loan-products bg-boxshadow">
                          <div className="loan-products-content">
                            <p className="read-more-wrap">
                              TimeAlly rewards users for long-term disciplined behavior while
                              staking. If you stake in a disciplined manner in TimeAlly PET or TSGAP
                              on a monthly basis then the returns are good{' '}
                            </p>
                            <p className="testimonial-txt">-Rajkumar Dubey</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.hero-caption */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-space80 bg-white ">
          <div className="container pdb60">
            <div className="row">
              <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                <div className="text-center section-title">
                  {/* section title start*/}
                  <h1 className="black-head-txt">Frequently Asked Question</h1>
                  <p>Our Mission is to deliver reliable , latest news and opinions</p>
                </div>
                {/* /.section title start*/}
              </div>
            </div>
            <div className="row mt30">
              <div className="col-lg-12">
                <div className="bg-white">
                  <Accordion defaultActiveKey="0" style={{ textAlign: 'left' }}>
                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Q-1. &nbsp;Will an existing staker miss his / her rewards due to his delay
                        in activating staking?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            {' '}
                            All existing stakers will be receiving a pre-activated upgraded TimeAlly
                            staking plan on ESN. There will not be any transition loss of staking
                            rewards due to a delay in staking in ESN.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        Q-2. &nbsp; How will a staker pay the transaction fee/network fee?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            Stakers can use ES to pay for their transaction fee instead of their
                            current requirement of paying in ether.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="3">
                        Q-3. &nbsp;How Stakers will be eligible to participate in ES mining?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            Stakers will be eligible to participate in Era Swap mining by delegating
                            their PoS to a validator node.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="4">
                        Q-4. &nbsp; What is IssTime and on whose activities decide an Individual
                        staker’s IssTime Limit?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            There is special dynamic IssTime limit awarded to every TimeAlly stake
                            Holders as per their behaviour and action for deciding their eligible
                            TimeAlly Loan amount
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="5">
                        Q-5. &nbsp; Can Stakers Transfer their TimeAlly 1LT Contracts to any other?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            Stakers can split & transfer their pre-activated TimeAlly smart contract
                            to other users from Day 1
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="6">
                        Q-6. &nbsp; Is there any risk of total fund loss due to any breach?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="6">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            New TimeAlly uses a distributed fund pattern which mitigates the risk of
                            total funds loss in an event of breach.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="7">
                        Q-7. &nbsp; Is this Smart Contract design recommended?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="7">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            This is a smart contract design security recommended from ConsenSys.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="8">
                        Q-8. &nbsp; When can a Staker claim his / her rewards?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="8">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            All Rewards can be claimed by participants at the end of the ES NRT
                            month.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    <Card
                      style={{
                        color: '#3c4d6b',
                        marginBottom: '0px',
                        fontWeight: 500,
                        borderRight: '0px',
                        borderLeft: '0px',
                        borderTop: '1px solid #ccc',
                        padding: '10px 0px 10px 30px',
                      }}
                    >
                      <Accordion.Toggle as={Card.Header} eventKey="9">
                        Q-9. &nbsp; How much ES is reserved for Staking rewards and will this supply
                        reduce in the future?
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="9">
                        <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: 300 }}>
                          {' '}
                          <br></br>
                          <br></br>
                          <p style={{ textAlign: 'left' }}>
                            Global 37% NRT for 3rd year is 272.727 million ES which is reserved for
                            Staking Rewards and will reduce by 10% every year.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
