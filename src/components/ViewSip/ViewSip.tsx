import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { es } from 'eraswap-sdk/dist';
import { ethers } from 'ethers';
import { Link, RouteComponentProps } from 'react-router-dom';
import {TsgapFactory} from 'eraswap-sdk/dist/typechain/ESN';
import {Tsgap} from 'eraswap-sdk/dist/typechain/ESN'

interface Props {
  navigation: any;
}

type State = {
  spinner: boolean;
  open: boolean;
  newSipEvent: NewSipEvent[],
  getSip: GetSip[],
  planId: number,
  stakingTimestamp: number,
  monthlyCommitmentAmount: number,
  totalDeposited: number,
  lastWithdrawlMonthId: number,
  powerBoosterWithdrawls: number,
  numberOfAppointees: number,
  appointeeVotes: number,
};


interface MatchParams {
  staker: string;
}

interface NewSipEvent {
  staker: string;
  sipId: number;
  monthlyCommitmentAmount: number;
}

interface GetSip {
  planId: number;
  stakingTimestamp: number;
  monthlyCommitmentAmount: number;
  totalDeposited: number;
  lastWithdrawlMonthId: number;
  powerBoosterWithdrawls: number;
  numberOfAppointees: number;
  appointeeVotes: number;
}

export class ViewSip extends Component<RouteComponentProps<MatchParams>,State> {
  //@ts-ignore
  tsgapInstance: Tsgap;

  constructor(props: Props) {
    //@ts-ignore
    super(props);
    this.state = {
      getSip: [],
      newSipEvent: [],
      spinner: false,
      open: false,
      planId: -1,
      stakingTimestamp: 0,
      monthlyCommitmentAmount: 0,
      totalDeposited: 0,
      lastWithdrawlMonthId: 0,
      powerBoosterWithdrawls: 0,
      numberOfAppointees: 0,
      appointeeVotes: 0,
    };
  }

  componentDidMount = async () => {
    this.tsgapInstance = TsgapFactory.connect(
     this.props.match.params.staker,
    	window.provider
    );
    this.viewSipFetch().catch((e) => console.log(e));
    this.fetchNewSip().catch((e) => console.log(e));
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
    const newSipData = sipNew.map((log) => ({
      staker: log.args['staker'],
      sipId: log.args['sipId'],
      monthlyCommitmentAmount: log.args['monthlyCommitmentAmount']
    }));
    this.setState({
      newSipEvent: newSipData,
    })
  }


  viewSipFetch = async () => {
    await this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.tsgapLiquidInstance
        .connect(window.wallet.connect(window.provider))
        .getSip("0x1031a1C7Cc8edc64Cae561DcEA4285f8ab97e02F", 0);
      const receipt = tx;
      console.log('receipt viewsip', receipt);
      this.setState({
        planId: receipt.planId,
        powerBoosterWithdrawls:receipt.powerBoosterWithdrawls,
        stakingTimestamp:receipt.stakingTimestamp,
        lastWithdrawlMonthId:receipt.lastWithdrawlMonthId,
        numberOfAppointees:receipt.numberOfAppointees
      })
    } catch (error) {
      const readableError = es.utils.parseEthersJsError(error);
      console.log(`Error: ${readableError}`);
    }
    this.setState({
      spinner: false,
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("match params****", this.props.match.params)
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
                      <h1 className="page-title">Assurance View</h1>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12"></div>
          <thead>
            <tr>
              <th>SIP ID</th>
              <th>Time of Staking</th>
             
              <th>Number Of Appointees</th>
              <th>Monthly Commitment Amount</th>
              <th>Last Withdrawl MonthId</th>
              <th>Click on the buttons to view</th>
            </tr>
            <tr>
              <td>{this.state.planId}</td>
              <td>{this.state.stakingTimestamp}</td>
              <td>{this.state.numberOfAppointees}</td>
               <td>{ethers.utils.formatEther(this.state.monthlyCommitmentAmount)}</td> 
               <td>{this.state.lastWithdrawlMonthId}</td>
               <td className="view-bgd-color"><Link to ={"/view-detail/" + this.props.match.params.staker }>VIEW</Link></td>
            </tr>
          </thead>
        </div>
      </div>
    );
  }
}
