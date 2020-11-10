import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import PETElement from './PETElement';
import '../PET.css';

const ethers = require('ethers');

class View extends Component {
  state = {
    pets: [],
    loading: true
  };

  componentDidMount = async() => {
    const newPETEventSig = ethers.utils.id('NewPET(address,uint256,uint256)');
    const topics = [ newPETEventSig, ethers.utils.hexZeroPad(window.walletInstance.address, 32) ];

    const logs = await window.providerInstance.getLogs({
      address: window.petInstance.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics
    });

    console.log('logs', logs);
    const pets = [];
    for(let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const petId = Number(window.sliceDataTo32Bytes(log.data,0));
      // const monthlyCommitmentAmount = ethers.utils.bigNumberify(window.sliceDataTo32Bytes(log.data,1));
      pets.push({
        petId
      });
    }

    this.setState({ pets, loading: false });
  };

  render = () => (
        <Layout
            breadcrumb={['Home', 'PET','View']}
            title='List of your PETs'
            buttonName={!this.state.loading && this.state.pets.length === 0 ? 'New PET' : null}
            buttonOnClick={window.walletInstance && window.walletInstance.address
              ? () => this.props.history.push('/pet/new')
              : () => this.setState({showLoginModal:true})}>
            {this.state.pets.length ? <Table style={{'margin-bottom': '0'}} responsive>
            <thead>
              <tr>
                <th>PET ID</th>
                <th>Time of Staking</th>
                <th>Self ES Deposit</th>
                <th>Deposit Window Open Until</th>
                <th>Next Withdraw Release</th>
                <th>Click on the buttons to view</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pets.map(pet => (
                <PETElement
                  petId={pet.petId}
                  onClick={() => this.props.history.push('/pet/view/'+pet.petId)}
                />
              ))}
            </tbody>
          </Table> : (
            this.state.loading
            ? <p>Please wait loading PETs...</p>
            : <p>There are no PETs to show.</p>
          )}
        </Layout>

    );
}

export default View;
