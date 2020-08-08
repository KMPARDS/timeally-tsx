import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { ethers } from 'ethers';
import { routine } from '../../utils';

type State = {
  timeallyNrt: ethers.BigNumber | null;
  totalActiveStakings: ethers.BigNumber | null;
};

export class Home extends Component<{}, State> {
  state: State = {
    timeallyNrt: null,
    totalActiveStakings: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateValues, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateValues = async () => {
    const currentNrtMonth = await window.nrtManagerInstance.currentNrtMonth();
    const timeallyNrt = await window.timeallyManagerInstance.getTimeAllyMonthlyNRT(currentNrtMonth);
    const totalActiveStakings = await window.timeallyManagerInstance.getTotalActiveStaking(
      currentNrtMonth.add(1)
    );

    this.setState({ timeallyNrt, totalActiveStakings });
  };

  render() {
    return (
      <>
        <div>
          <div className="hero-section">
            <div className="container">
              <div className="row">
                <div className="banner-con ">
                  <div className="hero-tab-block">
                    <div className="banner-in-bg pinside40">
                      <h1 className="text-white">Accumulate wealth in the future economy</h1>
                      <div className="mt30">
                        <Link to="/stakings/new" className="btn btn-default main-btn-blue">
                          Vest Now
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
                <div className="col-md-6 pinside40 bor-right">
                  <div className="what-dapp ">
                    <h1>What is DApp?</h1>
                    <p>
                      Decentralized Application (DApp) is an open-source application that runs
                      autonomously on s decentralized public blockchain. DApp uses distributed
                      ledger technology which aren’t stored on a centralized location, hence cant be
                      controlled by a single entity
                    </p>
                    <p>
                      <a
                        style={{ color: 'black', textDecoration: 'underline' }}
                        href="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp"
                        target="_blank"
                      >
                        Click to open TimeAlly Teaser in a new tab
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 pinside40">
                  <div className="what-timeally">
                    <h1>What is TimeAlly?</h1>
                    <p>
                      TimeAlly is a decentralized application based on a pre-defined set of rules of
                      Smart Contracts to offer multiple benefits to the community. TimeAlly
                      increases Era Swap Utility count for TimeAlly contract holders for holding
                      tokens over a period of time, using flexible TimeAlly Plans
                    </p>
                    <p>
                      <a
                        style={{ color: 'black', textDecoration: 'underline' }}
                        href="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp"
                        target="_blank"
                      >
                        Click to open TimeAlly Walkthrough in a new tab
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rate-table total-es-count">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="rate-counter-block">
                    <div className="rate-box">
                      <h1 className="loan-rate">
                        {this.state.timeallyNrt !== null
                          ? `${ethers.utils.formatEther(this.state.timeallyNrt)} ES`
                          : 'Loading...'}
                      </h1>
                      <small className="rate-title">NRT Released in this month for TimeAlly</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rate-counter-block-second">
                    <div className="rate-box">
                      <h1 className="loan-rate">
                        {this.state.totalActiveStakings !== null
                          ? `${ethers.utils.formatEther(this.state.totalActiveStakings)} ES`
                          : 'Loading...'}
                      </h1>
                      <small className="rate-title">Total Active Stakes in next month</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-space80 mb10 features-bg">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-md-12 col-sm-12 col-12">
                  <div className="mb100 text-center section-title">
                    {/* section title start*/}
                    <h1>Features of TimeAlly</h1>
                    <p>
                      TimeAlly is an open-source application and can work even without any
                      web-interference. It is powered on a pre-defined set of rules of Smart
                      Contract and executes code of arbitrary algorithmic complexity following
                      standard cryptography with no downtime and keeping everything safe from
                      modifying{' '}
                    </p>
                    <a
                      rel="noopener noreferrer"
                      className="btn btn-default"
                      href="https://github.com/KMPARDS/esn-contracts/blob/master/contracts/ESN/TimeAllyStaking.sol"
                      target="_blank"
                    >
                      <p style={{ color: '#fff' }}>View TA Smart Contract</p>
                    </a>
                  </div>
                  {/* /.section title start*/}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/control.png" />
                    </div>
                    <h3 className="number-title">Control</h3>
                    <p>
                      You get bonus rewards based on your TimeAlly Plan, and the value of your ES
                      held may go up as more usage increases of ES Utility
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/benifits.png" />
                    </div>
                    <h3 className="number-title"> Future benefits</h3>
                    <p>
                      You get bonus rewards based on your TimeAlly Plan, and the value of your ES
                      held may go up as more usage increases of ES Utility
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/blocks.png" />
                    </div>
                    <h3 className="number-title"> Blocks</h3>
                    <p>
                      Every transaction triggered by users are recorded transparently & irreversibly
                      in block confirmation so that old transactions persevere forever
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/nomination.png" />
                    </div>
                    <h3 className="number-title">Nomination</h3>
                    <p>
                      You get to appoint trusted nomine on your plan, who will be receiving all the
                      benefits of TimeAlly in case of uncertainty{' '}
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/no-central-aut.png" />
                    </div>

                    <h3 className="number-title">No Central Authority</h3>
                    <p>
                      TimeAlly uses Ethereum Virtual Machine (EVM) to execute standard cryptography
                      with no downtime to keep it all safe and untouched .
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 pdt30">
                  <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                    <div className="circle">
                      <img src="./images/box.png" />
                    </div>
                    <h3 className="number-title">ES NRT Distribution</h3>
                    <p>
                      With TimeAlly decentralized application you can govern the distribution of ES
                      from NRT (Newly Released Token) pool to users
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="row">
        <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12 text-center"> <a href="#" className="btn btn-default">View Our Loans</a> </div>
      </div> */}
            </div>
          </div>

          <div className="how-bg">
            <div className="card-hero-section">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    {/* hero-caption */}
                    <div className="card-hero-block text-center">
                      <h1 className="text-white">How TimeAlly works</h1>
                      <p className="text-white">
                        TimeAlly rewards TA holders for locking their tokens in TA smart contract
                        (TA Time Vault) for a specified time period.
                      </p>

                      <p style={{ color: '#fff' }}>
                        There is a fixed number of ES rewarded every month to users which is
                        governed by TA smart contract. Total number of ES tokens to be distributed
                        among TA holders is pre-defined, but which user will get how many ES tokens
                        is not defined. It depends on number of token staked in proportion to their
                        vesting plans.
                      </p>
                      <div className="border"></div>
                      <div className="row">
                        <div className="col-md-6 border-right">
                          <h2 className="text-white pdt40 ">In case of more users</h2>
                          <img src="./images/a.png"></img>
                          <p className="text-white">
                            If more users opt for TimeAlly vesting then there will be scarcity of
                            liquid tokens which will create more demand of ES. This way the value of
                            ES holded by users is expected to go up as the price per ES shall
                            increase with increasing demand.
                          </p>
                        </div>
                        <div className="col-md-6">
                          <h2 className="text-white pdt40">In case of few users</h2>
                          <img src="./images/b.png"></img>
                          <p className="text-white">
                            If few users opt for TimeAlly vesting then more tokens per user will be
                            received. As the number of tokens to be distributed every month is fixed
                            but the number of receivers is reduced. This way more ES will be
                            received to these fewer members.
                          </p>
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

          <div className="section-space80">
            <div className="container">
              <div className="row">
                <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                  <div className="section-title mb60 text-center">
                    {/* section title start*/}
                    <h1>More TimeAlly Products</h1>
                    <p>
                      here is an extended product line of TimeAlly Smart Contract for users. They
                      are TimeAlly 1LT, TSGAP, TimeAlly PET & TimeAlly Loan for Era Swap Community
                      stakers who have staked ES in TimeAlly Contract. To become a TimeAlly Smart
                      Contract holder you can choose any of these Smart Contracts.
                    </p>
                  </div>
                  {/* /.section title start*/}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-lg-3 pdb30">
                  <div className="business-loan-products bg-boxshadow">
                    <div className="circle">
                      <img src="./images/jar.png" />
                    </div>
                    {/* <div className="loan-products-icon"><img src="./images/medal.png"/></div> */}
                    <div className="loan-products-content">
                      <h3>TimeAlly Loan</h3>
                      <input type="checkbox" className="read-more-state" id="post-1" />
                      <p className="read-more-wrap">
                        TimeAlly 1 Life Time stakehoders can apply for TimeAlly Loan based on their
                        individual IssTime Limit{' '}
                        <span className="read-more-target">
                          The stakers have to repay back the Loan Amount within 30 Day 10 Hours or
                          before end of ES NRT Month (whichever is earlier). There will be an
                          interest of 0.1% per day on the loan amount.If the staker fails to repay
                          back the TimeAlly Loan Principle amount and interest, then the stakes of
                          the staker will be burnt.
                        </span>
                      </p>
                      <label htmlFor="post-1" className="btn btn-default read-more-trigger"></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 pdb30">
                  <div className="business-loan-products bg-boxshadow">
                    <div className="circle">
                      <img src="./images/value.png" />
                    </div>
                    {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                    <div className="loan-products-content">
                      <h3>TimeAlly 1LT</h3>
                      <input type="checkbox" className="read-more-state" id="post-2" />
                      <p className="read-more-wrap">
                        TimeAlly 1 Life Time is the first generation TimeAlly Smart Contract, built
                        especially for the staker, who wants to{' '}
                        <span className="read-more-target">
                          {' '}
                          support ESN &amp; Accumulate Era Swap in Long-term.{' '}
                        </span>{' '}
                      </p>
                      <label htmlFor="post-2" className="btn btn-default read-more-trigger"></label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 pdb30">
                  <div className="business-loan-products bg-boxshadow">
                    <div className="circle">
                      <img src="./images/life-insurance.png" />
                    </div>
                    {/* <div className="loan-products-icon"><i className="flaticon-rich icon-4x icon-primary" /></div> */}
                    <div className="loan-products-content">
                      <h3>TimeAlly Assurance</h3>
                      <input type="checkbox" className="read-more-state" id="post-3" />
                      <p className="read-more-wrap">
                        TimeAlly Super Goal Achiever Plan (TSGAP) is a Decentralized Smart Contract
                        powered Systematic{' '}
                        <span className="read-more-target">
                          {' '}
                          Accumulation Plan designed to safeguard community`s interest, so they can
                          have financial support to support their goals, its incentivize Stakers
                          behavior for regularly in a disciplined way. The benefit of this SAP is
                          that Stakers can choose minimal staking in Era Swap, Leverage Power of
                          Compounding, Milestone based Goal Achievement, Booster Bonus, with
                          complete transparency and ownership of your digital assets{' '}
                        </span>
                      </p>
                      <label htmlFor="post-3" className="btn btn-default read-more-trigger"></label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3 pdb30">
                  <div className="business-loan-products bg-boxshadow">
                    <div className="circle">
                      <img src="./images/pet.png" />
                    </div>
                    {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                    <div className="loan-products-content">
                      <h3>TimeAlly PET </h3>
                      <input type="checkbox" className="read-more-state" id="post-4" />
                      <p className="read-more-wrap">
                        TimeAlly PET Stands for Personal Era Swap Teller, it is a 50-50 Plan
                        designed to provide a helping hand{' '}
                        <span className="read-more-target">
                          {' '}
                          to those who wish to stake but couldn’t. It is a Systematic Accumulation
                          Plan powered on Smart Contracts, it is an extraordinary plan intend to
                          help you with your stakings with PET`s Smart Contribution, hence you don’t
                          have to stake the complete amount of your selected plan and PET will
                          contribute another half. For.eg. Choose 100000 ES Plan. Stake 50000 ES &
                          PET will stake another 50000 ES for you{' '}
                        </span>
                      </p>
                      <label htmlFor="post-4" className="btn btn-default read-more-trigger"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="power-bg">
            <div className="card-hero-section ">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    {/* hero-caption */}
                    <div className="card-hero-block text-center">
                      <h1 className="text-white">
                        Power <img src="./images/pt.png" style={{ height: '69px' }} /> Tokens
                      </h1>
                      <p className="text-white">
                        Power Tokens are additional 10% of NRT allocated every month to TimeAlly
                        vestors. Power Tokens are allocated to the TimeAlly members in a ratio 10:1
                        per year. The Power Tokens can be uses to encourage, appreciate, donate to
                        friends, family, collegues on Swappers Wall and services on Time Swappers &
                        Buzcafe.<br></br>To know more about power token the user can read{' '}
                        <a
                          href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                          target="_blank"
                        >
                          Era Swap White Paper
                        </a>
                        <br></br>
                        <br></br>
                        <strong>Used to encourage, appreciate new talents</strong>
                      </p>
                      <div className="col-md-12">
                        <span style={{ marginLeft: '10px' }}>
                          <a href="http://timeswappers.com/home" target="_blank">
                            <img src="./images/swp_bz-01.png" style={{ height: '80px' }}></img>
                          </a>
                        </span>
                      </div>
                      <br></br>
                      <p>
                        <a
                          style={{ color: 'white', textDecoration: 'underline' }}
                          href="https://www.youtube-nocookie.com/embed/V3PtAX_GMjw?rel=0&amp"
                          target="_blank"
                        >
                          Click to open Power Token Insights Video in a new tab
                        </a>
                      </p>
                      <p>
                        <a
                          style={{ color: 'white', textDecoration: 'underline' }}
                          href="https://www.youtube-nocookie.com/embed/a89tFlAQ2vY?rel=0&amp"
                          target="_blank"
                        >
                          Click to open SwappersWall Video in a new tab
                        </a>
                      </p>
                      {/*<div className="row">
                    <div className="offset-md-2 col-md-4">
                      <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                          <iframe src="https://www.youtube-nocookie.com/embed/V3PtAX_GMjw?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                        </div>
                    </div>

                    <div className="col-md-4">
                      <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                        <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/a89tFlAQ2vY?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                    </div>
                  </div>*/}
                      <div className="row">
                        {/* <div className="col-md-4">
                      <img src="./images/swp_bz-01.png"></img>
                    </div> */}

                        {/* <div className="col-md-4">
                    <img src="./images/swp_bz-02.png"></img>
                    </div> */}
                      </div>
                      {/* <a className="btn-link-white">Watch the video for TimeAlly activation</a> */}
                      {/* <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                      <iframe width="560" height="315" style={{position: 'absolute', top: 0, left: 0,}} src="https://www.youtube-nocookie.com/embed/X0SV9pGQls4?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div> */}
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
          <div className="section-space80 bg-white ">
            <div className="container pdb60">
              <div className="row">
                <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
                  <div className="text-center section-title">
                    {/* section title start*/}
                    <h1>FAQ's</h1>
                    <hr></hr>
                  </div>
                  {/* /.section title start*/}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="bg-white">
                    <Accordion defaultActiveKey="0" style={{ textAlign: 'left' }}>
                      <Card
                        style={{
                          color: '#3c4d6b',
                          marginBottom: '0px',
                          fontWeight: 500,
                          borderRight: '0px',
                          borderLeft: '0px',
                          borderTop: '0px',
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Q-1. &nbsp; What is Era Swap Token?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Era Swap Token or ES is a decentralized utility token currently based on
                            Ethereum blockchain (ERC20) which will be used on multiple platforms for
                            exchange of services(P2P), avail discounts, get rewards and many more
                            utility.
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
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          Q-2. &nbsp; What is TimeAlly DApp?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            TimeAlly is a Decentralized App (DApp) which is based on pre-defined set
                            of rules through Smart Contracts to offers multiple benefits to users,
                            govern the generation & distribution of ES Newly released Token.{' '}
                            <br></br>
                            <br></br>
                            <h4 style={{ textAlign: 'center' }}>
                              Please watch this videos to understand .
                            </h4>
                            <p style={{ textAlign: 'center' }}>
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline',
                                }}
                                href="https://www.youtube-nocookie.com/embed/Xqx8wEGQNXE?rel=0&amp"
                                target="_blank"
                              >
                                Click to open the <u>TimeAlly Tour</u> Video in a new tab
                              </a>
                            </p>
                            <div className="row">
                              <div className="offset-md-4 col-md-4">
                                {/*<div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                              <iframe src="https://www.youtube-nocookie.com/embed/Xqx8wEGQNXE?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                            </div>*/}
                              </div>
                            </div>
                            <p style={{ textAlign: 'center' }}>
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline',
                                }}
                                href="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp"
                                target="_blank"
                              >
                                Click to open the <u>TimeAlly Quick Walk Through</u> Video in a new
                                tab
                              </a>
                            </p>
                            <div className="row">
                              <div className="offset-md-4 col-md-4">
                                {/*<div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                                <iframe src="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                            </div>*/}
                              </div>
                            </div>
                            <p style={{ textAlign: 'center' }}>
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline',
                                }}
                                href="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp"
                                target="_blank"
                              >
                                Click to open the <u>TimeAlly Teaser</u> Video in a new tab
                              </a>
                            </p>
                            <div className="row">
                              <div className="offset-md-4 col-md-4">
                                <div
                                  style={{
                                    position: 'relative',
                                    height: 0,
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    paddingBottom: '56.25%',
                                    marginBottom: '20px',
                                  }}
                                >
                                  <iframe
                                    src="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp;showinfo=0"
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '350px',
                                      height: '350px',
                                    }}
                                    frameBorder={0}
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            </div>
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                          Q-3. &nbsp; How to claim your staking in TimeAlly
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Please watch this video on how to claim your staking in TimeAlly DApp.
                            <br></br>
                            <br></br>
                            <p style={{ textAlign: 'center' }}>
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline',
                                }}
                                href="https://www.youtube-nocookie.com/embed/31PT42RIOQs?rel=0&amp"
                                target="_blank"
                              >
                                Click to open the Video in a new tab
                              </a>
                            </p>
                            <div className="row">
                              <div className="offset-md-4 col-md-4">
                                <div
                                  style={{
                                    position: 'relative',
                                    height: 0,
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    paddingBottom: '56.25%',
                                    marginBottom: '20px',
                                  }}
                                >
                                  <iframe
                                    src="https://www.youtube-nocookie.com/embed/31PT42RIOQs?rel=0&amp;showinfo=0"
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '100%',
                                    }}
                                    frameBorder={0}
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            </div>
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                          Q-4. &nbsp; How to vest in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            One can vest in TimeAlly just by locking up ES in TimeAlly smart
                            contract for a specefied vesting period.<br></br>
                            <br></br>
                            <br></br>
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="4">
                          Q-5. &nbsp; How to do staking of TimeAlly on Etherscan?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            <div className="col-md-4 offset-md-4">
                              <strong style={{ textAlign: 'center' }}>
                                Please watch this video on how to do staking of TimeAlly on
                                Etherscan.
                              </strong>{' '}
                              <br></br>
                              <br></br>
                              <p style={{ textAlign: 'center' }}>
                                <a
                                  style={{
                                    color: 'black',
                                    textDecoration: 'underline',
                                  }}
                                  href="https://www.youtube-nocookie.com/embed/Jtc3unocmEA?rel=0&amp"
                                  target="_blank"
                                >
                                  Click to open the Video in a new tab
                                </a>
                              </p>
                              <div
                                style={{
                                  position: 'relative',
                                  height: 0,
                                  overflow: 'hidden',
                                  maxWidth: '100%',
                                  paddingBottom: '56.25%',
                                }}
                              >
                                <iframe
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                  }}
                                  src="https://www.youtube-nocookie.com/embed/Jtc3unocmEA?rel=0&amp;showinfo=0"
                                  frameBorder="0"
                                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                            <br></br>
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                          Q-6. &nbsp; What benefit user gets on locking up their ES in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            <p>
                              Vestors in TimeAlly 1LT can claim the below mentioned benefits
                              <br></br>
                              15% of newly release token as per NRT for staking.<br></br>
                              {/* Vesting for 1 Year: 13% (1.08% per month) of ES Tokens from NRT pool is allocated to be distributed among TA Vestors who vest tokens for 1 year.<br></br> */}
                              12% of newly release token as per NRT for ESN delegation.<br></br>
                              10% of newly release token as per NRT for Swappers wall
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="6">
                          Q-7. &nbsp; How rewards are distributed through TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Era Swap ecosystem users receive rewards for the tasks they perform. The
                            rewards are always distributed as per NRT distribution Chart to every
                            Active user in Era Swap ecosystem
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="7">
                          Q-8. &nbsp; How TimeAlly vestors get rewarded in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="7">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Era Swap (ES) has to be claimed by the users based on the work performed
                            in the ecosystem or vesting done in TimeAlly. As per preset rules, if
                            the user has performed tasks, then they are eligible for rewards. User
                            can trigger and withdraw once they have received rewards.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="bg-white">
                    <Accordion defaultActiveKey="0" style={{ textAlign: 'left' }}>
                      <Card
                        style={{
                          color: '#3c4d6b',
                          marginBottom: '0px',
                          fontWeight: 500,
                          borderRight: '0px',
                          borderLeft: '0px',
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="8">
                          Q-9 &nbsp; Is TimeAlly a guaranteed return plan?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="8">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            No, TimeAlly doesn’t given any guarantee of any return. however, it
                            gives a guaranteed number of Era Swap tokens (ES) from ES NRT pool to
                            users according to their vesting periods.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="9">
                          Q-10. &nbsp; Does ES give guaranteed return?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="9">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            ES doesn’t give any guaranteed return however the value of Era Swap
                            depends on demand and supply dynamics of the ecosystem which depends on
                            usage and users.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="10">
                          Q-11. &nbsp; How Time Vaults increases the ES count for TimeAlly vestor?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="10">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Time Vault holds the token allocated from NRT every month. The Smart
                            Contract releases ES token from NRT Pool over next 50 years under
                            pre-defined set of rules.<br></br>
                            All ES tokens which are to be released in future are stored in Time
                            Vault and are distributed based on the work performed by the users among
                            them.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="11">
                          Q-12. &nbsp; Does Era Swap guarantee Fiat or other crypto?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="11">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Era Swap doesn’t guarantee any Fiat or Crypto because Era Swap doesn’t
                            control any Fiat or any other cryptocurrency.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="12">
                          Q-13. &nbsp; Can Era Swap token be used outside the system?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="12">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            No, Era Swap token can only be used in the Eco System. ES cannot be used
                            outside Era swap Ecosystem.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="13">
                          Q-14. &nbsp; Do you store my private keys, Keystore or mnemonic?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="13">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            When you load Wallet in the TimeAlly ÐApp, your private keys stay only
                            on your computer. The TimeAlly ÐApp directly talks with blockchain hence
                            any centralized intermediate server is not at all required and hence any
                            of your data is NOT sent to our servers (we are also not recording any
                            usage data). Your computer signs any transactions you authorise and only
                            the signed transaction is submitted to blockchain for being included in
                            blocks by miners who are mining in Ethereum. When you logout or even
                            refresh page your private keys are erased from computer’s memory. The
                            TimeAlly ÐApp source code is open source and anyone can check what is
                            happening.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="14">
                          Q-15. &nbsp; What is Gas Fee / Network Fee?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="14">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Era Swap Network is a decentralized network. Generally, miners dedicate
                            their computers to maintain the network. For compensation, the concept
                            of the gas fee is there. All transactions on Era swap Network cost small
                            gas and this fee is transferred to miners. Users can choose to pay gas
                            to miners for the transaction to happen. A miner can choose which
                            transactions to mine, and generally, they give priority to those
                            transactions which give them more gas fees.
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
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="18">
                          Q-16. &nbsp; How To Stake Your Era Swap Tokens In TimeAlly Using Keystore/
                          Mnemonics/Private Key?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="18">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            Please watch this video to understand "How To Stake Your Era Swap Tokens
                            In TimeAlly Using Keystore/ Mnemonics/Private Key"
                            <p style={{ textAlign: 'center' }}>
                              <a
                                style={{
                                  color: 'black',
                                  textDecoration: 'underline',
                                }}
                                href="https://www.youtube.com/embed/Jtc3unocmEA"
                                target="_blank"
                              >
                                Click to open the Video in a new tab
                              </a>
                            </p>
                            <div className="row">
                              <div className="offset-md-4 col-md-4">
                                <div
                                  style={{
                                    position: 'relative',
                                    height: 0,
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    paddingBottom: '56.25%',
                                    marginBottom: '20px',
                                    marginTop: '20px',
                                  }}
                                >
                                  {
                                    <iframe
                                      width="560"
                                      height="315"
                                      src="https://www.youtube.com/embed/Jtc3unocmEA"
                                      frameBorder={0}
                                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  }
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card
                        style={{
                          color: '#3c4d6b',
                          fontWeight: 500,
                          borderRight: '0px',
                          borderLeft: '0px',
                          padding: '10px 0px 10px 30px',
                        }}
                      >
                        <Accordion.Toggle as={Card.Header} eventKey="15">
                          Q-17. &nbsp; What is GitHub link of TimeAlly.io?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="15">
                          <Card.Body
                            style={{
                              color: '#333',
                              fontSize: '14px',
                              fontWeight: 300,
                            }}
                          >
                            <p>
                              <a href="https://github.com/KMPARDS/timeally-react" target="_blank">
                                TimeAlly: https://github.com/KMPARDS/timeally-react
                              </a>
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
      </>
    );
  }
}
