import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { es } from 'eraswap-sdk/dist';
import { ethers } from 'ethers';

interface Props {
  navigation: any;
}

type State = {
  spinner: boolean;
  open: boolean;
  newSipEvent: NewSipEvent[],
};


interface MatchParams {
	staker: string;
}

interface NewSipEvent {
  staker: string;
  sipId: number;
  monthlyCommitmentAmount: number;
}

export class ViewSip extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newSipEvent:[],
      spinner: false,
      open: false,
     
    };
  }

  componentDidMount = async () => {
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
    const newSipData= sipNew.map((log) => ({
      staker: log.args['staker'],
      sipId:log.args['sipId'],
      monthlyCommitmentAmount:log.args['monthlyCommitmentAmount']
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
    console.log("newsipvalue",this.state.newSipEvent)
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
              <th>SIP Plan</th>
              <th>Monthly Commitment Amount</th>
              <th>Next Deposit Due</th>
              <th>Next Withdraw Release</th>
              <th>Click on the buttons to view</th>
            </tr>
          </thead>
        </div>
      </div>
    );
  }
}
