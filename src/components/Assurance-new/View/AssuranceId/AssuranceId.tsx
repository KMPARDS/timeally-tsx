import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import { Layout } from '../../../Layout/Layout';
import DepositElement from './DepositElement';
import '../../Assurance.css';
import { RouteComponentProps } from 'react-router-dom';
import { getTimeRemaining, hexToNum, sliceDataTo32Bytes } from '../../../../utils';

const ethers = require('ethers');
interface RouteParams {
  id: string;
}
type Props = {
  sipId: string;
  monthId: string;
  stakingTimestamp: string;
  depositAmount: string;
};
type State = {
  months: [];
  loading: boolean;
};

class AssuranceId extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    months: [],
    loading: true,
  };

  componentDidMount = async () => {
    if (window.wallet) {
      const sip = await window.tsgapLiquidInstance.functions.sips(
        window.wallet.address,
        this.props.match.params.id
      );
      const sipPlan = await window.tsgapLiquidInstance.functions.sipPlans(sip.planId);
      const accumulationPeriodMonths = sipPlan.accumulationPeriodMonths;

      const months: any = [];
      for (let i = 1; i <= accumulationPeriodMonths; i++) {
        months.push({
          number: i,
          depositAmount: null,
          status: null,
          stakingTimestamp: sip.stakingTimestamp,
        });
      }

      // const newDepositSig = ethers.utils.id(
      //   'NewDeposit(address,uint256,uint256,uint256,uint256,address)'
      // );

      // const topics = [
      //   newDepositSig,
      //   ethers.utils.hexZeroPad(window.wallet.address, 32),
      //   ethers.utils.hexZeroPad('0x' + Number(this.props.match.params.id).toString(16), 32),
      // ];

      // const logs = await window.provider.getLogs({
      //   address: window.tsgapLiquidInstance.address,
      //   fromBlock: 0,
      //   toBlock: 'latest',
      //   topics,
      // });

      // console.log('deposits logs', logs);

      // logs.forEach((log) => {
      //   const month = Number(sliceDataTo32Bytes(log.data, 0));
      //   months[month - 1].depositAmount = ethers.utils.formatEther(
      //     ethers.utils.bigNumberify(sliceDataTo32Bytes(log.data, 1))
      //   );
      // });
      (await window.tsgapLiquidInstance.queryFilter(
        window.tsgapLiquidInstance.filters.NewDeposit(window.wallet.address,null,null,null,null,null)
      )).map(log => window.tsgapLiquidInstance.interface.parseLog(log))
      .map(log => ({
        monthId: log.args['monthId'],
        depositAmount: log.args['depositAmount'],
        benefitQueued: log.args['benefitQueued'],
      }))
      .map(deposit =>{
        months[deposit.monthId - 1].depositAmount += hexToNum(deposit.depositAmount)
      });

      this.setState({ months });
    }
  };

  render = () => (
    <Layout
      // breadcrumb={['Home', 'Assurance','View']}
      title={`SIP ID: ${this.props.match.params.id}`}
    >
      {this.state.months.length ? (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Deposit Month</th>
                <th>Deposit Amounts</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.months.map((month: any) => (
                //@ts-ignore
                <DepositElement
                  sipId={this.props.match.params.id}
                  monthId={month.number}
                  depositAmount={month.depositAmount}
                  status={month.status}
                  stakingTimestamp={month.stakingTimestamp}
                  history={this.props.history}
                  location={this.props.location}
                />
              ))}
            </tbody>
          </Table>
          <p>
            Grace penalty is 1% per graced months on Power Booster. Default penalty is 2% per
            defaulted months on Power Booster.
          </p>
          <div className="details">
            <Button
              onClick={() =>
                this.props.history.push(`/assurance/view/${this.props.match.params.id}/benefits`)
              }
            >
              Benefit Page
            </Button>
          </div>

          <div className="details">
            <Button
              onClick={() =>
                this.props.history.push(`/assurance/view/${this.props.match.params.id}/nominees`)
              }
            >
              Nominee Page
            </Button>
          </div>
        </>
      ) : this.state.loading ? (
        <p>Please wait loading...</p>
      ) : (
        <p>There is nothing to show.</p>
      )}
    </Layout>
  );
}

export default AssuranceId;
