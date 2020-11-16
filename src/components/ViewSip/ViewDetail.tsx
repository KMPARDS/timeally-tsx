import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { es } from 'eraswap-sdk/dist';
import { BigNumber, ethers } from 'ethers';
import { Link, RouteComponentProps } from 'react-router-dom';
import {TsgapFactory} from 'eraswap-sdk/dist/typechain/ESN';
import {Tsgap} from 'eraswap-sdk/dist/typechain/ESN'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

type Props ={
}

type State = {
  spinner: boolean;
  open: boolean;
  newSipEvent: NewSipEvent[],
  NewDeposit: NewDeposit[],
  sipId:number,
  staker:string
};


interface MatchParams {
  staker: string;
}

interface NewSipEvent {
  staker: string;
  sipId: number;
  monthlyCommitmentAmount: number;
}

interface NewDeposit {
  monthId: number |null,
  depositAmount: number,
  benefitQueued: number,
  depositedBy: string
}

export class ViewDetail extends Component<RouteComponentProps<MatchParams>, State> {
  //@ts-ignore
  tsgapInstance: Tsgap;
  constructor(props: Props) {
    //@ts-ignore
    super(props);
  
    this.state = {
      NewDeposit: [],
      newSipEvent: [],
      spinner: false,
      open: false,
      sipId:0,
      staker:''
    };
  }

  componentDidMount = async () => {
    this.tsgapInstance = TsgapFactory.connect(
     this.props.match.params.staker,
    	window.provider
    );
    this.fetchNewSip().catch((e) => console.log(e));
    this.getDepositStatus().catch((e) => console.log(e));
    this.sips().catch((e) => console.log(e));
    this.NewDeposit().catch((e) => console.log(e));

    const sipData = this.state.newSipEvent.map((log) => {
      this.setState({
        sipId:log.sipId,
        staker:log.staker
      })
    })
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

  getDepositStatus = async () => {
    await this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.tsgapLiquidInstance
        .connect(window.wallet.connect(window.provider))
        .monthlyDeposit(this.props.match.params.staker,this.state.sipId,1);
      const receipt = tx;
      console.log('Deposit is *****', receipt);
      this.setState({
       
      })
    } catch (error) {
      const readableError = es.utils.parseEthersJsError(error);
      console.log(`Error of deposit: ${readableError}`);
    }
    this.setState({
      spinner: false,
    });
  };

  sips = async () => {
    await this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.tsgapLiquidInstance
        .connect(window.wallet.connect(window.provider))
        .sips(this.props.match.params.staker,this.state.sipId);
      const receipt = tx;
      console.log('sips is *****', receipt);
    
      this.setState({
       
      })
    } catch (error) {
      const readableError = es.utils.parseEthersJsError(error);
      console.log(`Error of sips: ${readableError}`);
    }
    this.setState({
      spinner: false,
    });
  };

  async NewDeposit() {
    const data = await window.tsgapLiquidInstance.queryFilter(
      window.tsgapLiquidInstance.filters.NewDeposit(
        null, 
        null, 
        null,
        null, 
        null, 
        null)
    );
    console.log('fetchsip', data);
    const NewDeposit = data.map((log) => {
      return window.tsgapLiquidInstance.interface.parseLog(log);
    });
    console.log('NewDeposit22', NewDeposit);
    const newDeposit = NewDeposit.map((log) => ({
      benefitQueued:log.args['benefitQueued'],
      depositAmount:log.args['depositAmount'],
      depositedBy:log.args['depositedBy'],
      monthId:log.args['monthId']
    }));
    this.setState({
      NewDeposit:newDeposit
    })
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
      console.log("check NewDeposit",this.state.NewDeposit)
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
              <th>Deposit Month</th>
              <th>Deposit Amount</th>
              <th>Deposit Benefits</th>
              <th>Beneficiary</th>
            </tr>
            
            {this.state.NewDeposit?.length ? (
              this.state.NewDeposit.map((event) => (
                <tr>
              <td>{event.monthId}</td>
              <td>{ethers.utils.formatEther(event.depositAmount)}</td>
              <td>{ethers.utils.formatEther(event.benefitQueued)}</td>
              <td>{event.depositedBy}</td>
              </tr>
             ))
             ) : (
                 <div>No Deposit To show</div>
               )}
            
          </thead>
        </div>
        <div className="row">
           <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12"></div>
       <div>
        <p className="view-para">Grace penalty is 1% per graced months on Power Booster. <br/>Default penalty is 2% per defaulted months on Power Booster.</p>
      
      <div  className="view-flex-style">

        <div className="details">
          <Button href={"/benefits/"+ this.props.match.params.staker}>Benefit Page</Button>
        </div>

        <div className="details">
          <Button href={"/nominee/"+ this.props.match.params.staker}>Nominee Page</Button>
        </div>

        </div>
        </div>
       </div>
      </div>
    );
  }
}
