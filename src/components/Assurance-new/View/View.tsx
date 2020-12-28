import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
// import { Layout } from '../../Layout/Layout';
import { LayoutTSGAP as Layout } from '../../Layout/LayoutTSGAP';
import SIPElement from './SIPElement';
import '../Assurance.css';
import { sliceDataTo32Bytes } from '../../../utils';
import { RouteComponentProps } from 'react-router-dom';
import { withdrawTsgapIncentives } from '../../../lib/Apis';

const ethers = require('ethers');
interface SIP {
  sipId: number;
  monthlyCommitmentAmount: any;
}
type State = {
  sips: SIP[];
  loading: boolean;
};
interface PropsInterface extends RouteComponentProps<any> {}

class View extends Component<PropsInterface, State> {
  state: State = {
    sips: [],
    loading: true,
  };

  componentDidMount = async () => {
    if (window.wallet) {
      // const newSIPEventSig = ethers.utils.id('NewSIP(address,uint256,uint256)');
      // const topics = [ newSIPEventSig, ethers.utils.hexZeroPad(window.wallet.address, 32) ];

      // const logs = await window.provider.getLogs({
      //   address: window.tsgapLiquidInstance.address,
      //   fromBlock: 0,
      //   toBlock: 'latest',
      //   topics
      // });

      // console.log('logs', logs);
      // const sips = [];
      // for(let i = logs.length - 1; i >= 0; i--) {
      //   const log = logs[i];
      //   const sipId = Number(sliceDataTo32Bytes(log.data,0));
      //   const monthlyCommitmentAmount = ethers.utils.bigNumberify(sliceDataTo32Bytes(log.data,1));
      //   sips.push({
      //     sipId, monthlyCommitmentAmount
      //   });
      // }
      const sips = (
        await window.tsgapLiquidInstance.queryFilter(
          window.tsgapLiquidInstance.filters.NewSIP(window.wallet.address, null, null)
        )
      )
        .map((log) => window.tsgapLiquidInstance.interface.parseLog(log))
        .map((log) => ({
          sipId: log.args['sipId'],
          monthlyCommitmentAmount: log.args['monthlyCommitmentAmount'],
        }));
      this.setState({ sips, loading: false });
    }
  };

  async withdrawIncentives() {
    try {
      if (window.wallet) {
        const resp = await withdrawTsgapIncentives(window.wallet.address);
        if (resp.ok) {
          // this.setState({
          //   withdrawMessage: resp?.data?.message || 'Success'
          // });
          //@ts-ignore
          window.alert(
            'You have successfully claimed your Incentive from this smart . Please visit Dayswappers & Timeally Club dashboard to withdraw same in preferred mode' ||
              resp?.data?.message ||
              'Success'
          );
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
      // breadcrumb={['Home', 'Assurance','View']}
      title="Assurance View"
      buttonName="Withdraw Incentives"
      buttonOnClick={() => {
        if (window.confirm('Are you sure to pet prepaid withdraw incentives ?'))
          this.withdrawIncentives();
      }}
    >
      {this.state.sips.length ? (
        <Table responsive>
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
          <tbody>
            {this.state.sips.map((sip: any) => (
              <SIPElement
                sipId={sip.sipId}
                monthlyCommitmentAmount={ethers.utils.formatEther(sip.monthlyCommitmentAmount)}
                onClick={() => this.props.history.push('/assurance/view/' + sip.sipId)}
              />
            ))}
          </tbody>
        </Table>
      ) : this.state.loading ? (
        <p>Please wait loading SIPs...</p>
      ) : (
        <p>There are no SIPs to show.</p>
      )}
    </Layout>
  );
}

export default View;
