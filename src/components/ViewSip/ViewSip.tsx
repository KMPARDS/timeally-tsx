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

  componentDidMount = async () => {};



 
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
    );
  }
}
