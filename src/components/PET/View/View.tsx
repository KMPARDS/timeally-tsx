import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import PETElement from './PETElement';
import '../PET.css';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { hexToNum } from '../../../utils';
import { withdrawPetPrepaidIncentives } from '../../../lib/Apis';

const ethers = require('ethers');
type State = {};

type Props = {};

class View extends Component<Props & RouteComponentProps, State> {
  state = {
    pets: [],
    loading: true,
    withdrawMessage: '',
  };

  componentDidMount = async () => {
    if (window.wallet) {
      console.log('hello');

      const pets = (
        await window.petInstance.queryFilter(
          window.petInstance.filters.NewPET(window.wallet?.address, null, null)
        )
      )
        .map((log) => window.petInstance.interface.parseLog(log))
        .map((log) => ({ petId: log.args['_petId'].toNumber() }));
      console.log(pets);
      this.setState({ pets, loading: false });
    }
  };

  sliceDataTo32Bytes = (data: any, index = 0) => {
    return '0x' + data.slice(2 + 64 * index, 2 + 64 * (index + 1));
  };

  async withdrawIncentives() {
    try {
      if (window.wallet) {
        const resp = await withdrawPetPrepaidIncentives(window.wallet.address);
        if (resp.ok) {
          // this.setState({
          //   withdrawMessage: resp?.data?.message || 'Success'
          // });
          //@ts-ignore
          window.alert('You have successfully claimed your Incentive from this smart . Please visit Dayswappers & Timeally Club dashboard to withdraw same in preferred mode' || resp?.data?.message || 'Success');
        } else {
          // this.setState({
          //   withdrawMessage: resp?.data?.message || 'Unable to process request, try again later'
          // });
          //@ts-ignore
          window.alert(resp?.data?.message || 'Unable to process request, try again later');
        }
      }
    } catch (e) {
      console.log(e);
      // this.setState({
      //   withdrawMessage: e.message
      // });
      alert(e.message);
    }
  }

  render = () => (
    <Layout
      breadcrumb={['Home', 'PET', 'View']}
      title="List of your PETs"
      buttonName={
        !this.state.loading && this.state.pets.length === 0 ? 'New PET' : 'Withdraw Incentives'
      }
      buttonOnClick={() => {
        if (this.state.pets.length === 0) {
          window.wallet && window.wallet.address
            ? this.props.history.push('/pet-new/new')
            : this.setState({ showLoginModal: true });
        } else {
          if (window.confirm('Are you sure to pet prepaid withdraw incentives ?'))
            this.withdrawIncentives();
        }
      }}
    >
      {this.state.pets.length ? (
        <Table style={{ marginBottom: '0' }} responsive>
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
            {this.state.pets.map((pet: any) => (
              <PETElement
                petId={pet.petId}
                onClick={() => {
                  this.props.history.push('/pet-new/view/' + pet.petId);
                  return null;
                }}
              />
            ))}
          </tbody>
        </Table>
      ) : this.state.loading ? (
        <p>Please wait loading PETs...</p>
      ) : (
        <p>There are no PETs to show.</p>
      )}
    </Layout>
  );
}

export default withRouter(View);
