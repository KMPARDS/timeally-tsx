import React, { Component } from 'react';
import { Button,Table } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import PETElement from './PETElement';
import '../PET.css';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { hexToNum } from '../../../utils';

const ethers = require('ethers');
type State = {

}

type Props = {

}

class View extends Component<Props & RouteComponentProps,State> {
  state = {
    pets: [],
    loading: true
  };

  componentDidMount = async() => {
    if(window.wallet){
      const pets =(await window.petInstance.queryFilter(window.petInstance.filters.NewPET(window.wallet?.address,null,null)))
        .map(log => window.petInstance.interface.parseLog(log))
        .map(log => {
          console.log({log});

          return {petId: hexToNum(log.args['_petId'])}
        });
        console.log({pets});

      this.setState({ pets,loading: false });
    }


    // const newPETEventSig = ethers.utils.id('NewPET(address,uint256,uint256)');
    // const topics = [ newPETEventSig, ethers.utils.hexZeroPad(window.wallet?.address, 32) ];

    // const logs = await window.provider.getLogs({
    //   address: window.petInstance.address,
    //   fromBlock: 0,
    //   toBlock: 'latest',
    //   topics
    // });

    // console.log('logs', logs);
    // const pets = [];
    // for(let i = logs.length - 1; i >= 0; i--) {
    //   const log = logs[i];
    //   const petId = Number(this.sliceDataTo32Bytes(log.data,0));
    //   // const monthlyCommitmentAmount = ethers.utils.bigNumberify(window.sliceDataTo32Bytes(log.data,1));
    //   pets.push({
    //     petId
    //   });
    // }

    // this.setState({ pets, loading: false });
  };

  sliceDataTo32Bytes = (data: any, index = 0) => {
    return '0x'+data.slice(2+64*index, 2+64*(index+1));
  }

  render = () => (
        <Layout
            breadcrumb={['Home', 'PET','View']}
            title='List of your PETs'
            buttonName={!this.state.loading && this.state.pets.length === 0 ? 'New PET' : null}
            // buttonOnClick={window.wallet && window.wallet.address
            //   ? () => this.props.history.push('/pet/new')
            //   : () => this.setState({showLoginModal:true})}
              >
            {this.state.pets.length ? <Table style={{marginBottom: '0'}} responsive>
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
              {this.state.pets.map((pet:any) => (
                <PETElement
                  petId={pet.petId}
                  onClick={() => {
                    this.props.history.push('/pet/view/'+pet.petId)
                    return null;
                  }}
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

export default withRouter(View);
