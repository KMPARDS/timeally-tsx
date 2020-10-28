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
  
};


export class ViewSip extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spinner: false,
      open: false,
    };
  }

  componentDidMount = async () => {
    this.viewSipFetch().catch((e) => console.log(e));
  };
 

  
viewSipFetch = async () => {
  await this.setState({ spinner: true });
  try {
    if (!window.wallet) {
      throw new Error('Wallet is not loaded');                              
    }
    const tx = await window.tsgapLiquidInstance
      .connect(window.wallet.connect(window.provider))
      .getSip('hjgjh',0,{value:ethers.utils.parseEther('1000')});
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
