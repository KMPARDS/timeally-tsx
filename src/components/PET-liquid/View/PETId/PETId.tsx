import { RouteComponentProps, RouteProps } from 'react-router';
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import Layout from '../../../Layout/LayoutPET';
// import DepositElement from './DepositElement';
import '../../PET.css';
import { ethers } from 'ethers';
import { hexToNum, sliceDataTo32Bytes } from '../../../../utils';

interface RouteParams {
  id: string;
}
type Props = {};

type State = {
  months: any[];
  loading: boolean;
  currentTime: number;
  lumSum: boolean;
  commitmentAmount: ethers.BigNumber;
  initTimestamp: number;
  depositMonth: number;
};

class PETId extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    months: [],
    loading: true,
    currentTime: Math.floor(Date.now() / 1000),
    lumSum: false,
    commitmentAmount: ethers.constants.Zero,
    initTimestamp: -1,
    depositMonth: -1,
  };

  componentDidMount = async () => {
    if (window.wallet) {
      // const currentTime = process.env.network === 'homestead' ? Math.floor(Date.now() / 1000) : (await window.esInstance.functions.mou()).toNumber();

      const depositMonth = (
        await window.petLiquidInstance.getDepositMonth(
          window.wallet.address,
          this.props.match.params.id
        )
      ).toNumber();

      const pet = await window.petLiquidInstance.pets(
        window.wallet.address,
        // '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26',
        this.props.match.params.id
      );
      const petPlan = await window.petLiquidInstance.petPlans(pet.planId);

      const months: any[] = [];
      for (let i = 1; i <= 12; i++) {
        months.push([]);
      }

      // const data = (await window.petLiquidInstance.queryFilter(window.petLiquidInstance.filters.NewDeposit(
      //     window.wallet.address,
      //     ethers.utils.parseEther(this.props.match.params.id).toHexString(),
      //     null,
      //     null,
      //     null,
      //     null))
      //   )
      //   .map(log => window.petLiquidInstance.interface.parseLog(log))
      //   .map(log => {
      //     console.log({log});

      //   });

      const newDepositSig = ethers.utils.id(
        'NewDeposit(address,uint256,uint256,uint256,address,bool)'
      );

      const topics = [
        newDepositSig,
        ethers.utils.hexZeroPad(window.wallet.address, 32),
        ethers.utils.hexZeroPad('0x' + Number(this.props.match.params.id).toString(16), 32),
      ];

      const logs = await window.provider.getLogs({
        address: window.petLiquidInstance.address,
        fromBlock: 0,
        toBlock: 'latest',
        topics,
      });

      console.log('deposits logs', logs);

      logs.forEach((log) => {
        const month = Number(sliceDataTo32Bytes(log.data, 0));
        months[month - 1].push(
          // window.lessDecimals(
          ethers.BigNumber.from(sliceDataTo32Bytes(log.data, 1))
          // )
        );
      });

      (
        await window.petLiquidInstance.queryFilter(
          window.petLiquidInstance.filters.NewDeposit(
            window.wallet.address,
            Number(this.props.match.params.id),
            null,
            null,
            null,
            null
          )
        )
      )
        .map((log) => window.petLiquidInstance.interface.parseLog(log))
        .map((log) => ({
          monthId: log.args['_monthId'],
          depositAmount: log.args['_depositAmount'],
        }))
        .map((deposit) => {
          months[deposit.monthId - 1].depositAmount += hexToNum(deposit.depositAmount);
        });

      this.setState({
        months,
        commitmentAmount: pet.monthlyCommitmentAmount,
        initTimestamp: pet.initTimestamp.toNumber(),
        depositMonth,
        lumSum: months[depositMonth - 1].length === 0,
      });
    }
  };

  render = () => (
    <Layout breadcrumb={['Home', 'PET', 'View']} title={`PET ID: ${this.props.match.params.id}`}>
      {this.state.months.length ? (
        <>
          <p style={{ padding: '10px' }}>On this page you can see your deposits on your PET.</p>
          {this.state.lumSum ? (
            <div
              style={{
                backgroundColor: '#ffffed',
                padding: '1rem',
                borderRadius: '.25rem',
                margin: '16px 0',
              }}
            >
              <p>
                PET is all about Systematic Accumulation Plan (SAP) to accumulate ES on a regular
                basis at different price points of ES. SAP monthly mode is fee free and helps in ES
                cost averaging. PET Smart Contract gives bounty to stake holders for accumulating ES
                by influencing their behaviour to follow SAP methodology and gives an opportunity to
                acquire ES without exposing their ES tokens in trading risk. PET encourages SAP and
                discourages LumpSum deposits, however from convenience prospective PET provides
                options in Smart Contract to even choose LumpSum options like Quarterly, Half Yearly
                and Annual Deposit Frequency Mode with a fee of 1%, 2% and 3% respectively.
              </p>
              <Button
                onClick={() =>
                  this.props.history.push(
                    `/pet-old/view/${this.props.match.params.id}/lum-sum-deposit`
                  )
                }
              >
                Make LumpSum Deposit
              </Button>
            </div>
          ) : null}
          <Table style={{ marginBottom: '0' }} responsive>
            <thead>
              <tr>
                <th>Deposit Month</th>
                <th>Self ES Deposit</th>
                <th>PET's Contribution</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.months.map((depositArray: [], index) => {
                const monthId = index + 1;
                let depositAmount = ethers.constants.Zero;
                depositArray.forEach((amount) => (depositAmount = depositAmount.add(amount)));
                let status = '';
                const petArray = [];
                if (depositAmount.gte(this.state.commitmentAmount)) {
                  petArray.push(this.state.commitmentAmount);

                  const topUp = depositAmount.sub(this.state.commitmentAmount);
                  petArray.push(topUp.div(2));
                } else if (depositAmount.gte(this.state.commitmentAmount.div(2))) {
                  petArray.push(depositAmount);
                }
                let petAmount = ethers.constants.Zero;
                petArray.forEach((amount) => (petAmount = petAmount.add(amount)));

                const MONTH_LENGTH = 2629744;
                const windowOpenUntil = this.state.initTimestamp + 2629744 * monthId;
                const currentTimestamp = Math.floor(Date.now() / 1000);
                console.log('this.state.depositMonth',this.state.depositMonth);
                console.log({monthId});
                console.log(depositAmount,this.state.commitmentAmount);

                let targetStatus = '',
                  backgroundColor,
                  showDepositButton = false,
                  statusText = '';
                if (depositAmount.gte(this.state.commitmentAmount)) {
                  targetStatus = `Target of ${hexToNum(
                    this.state.commitmentAmount
                  )} ES is Acheived!`;
                  backgroundColor = '#90EE90';
                } else if (depositAmount.gte(this.state.commitmentAmount.div(2))) {
                  targetStatus = `Half of ${hexToNum(
                    this.state.commitmentAmount
                  )} ES Target Acheived.`;
                  backgroundColor = '#CBA580';
                } else if (this.state.depositMonth > monthId) {
                  targetStatus = `Target of ${hexToNum(
                    this.state.commitmentAmount
                  )} ES is not achieved.`;
                  backgroundColor = '#E19FAF';
                } else {
                  targetStatus = `Target of ${hexToNum(
                    this.state.commitmentAmount
                  )} ES is yet to be achieved.`;
                  if (depositAmount.gt(0)) {
                    backgroundColor = '#E19FAF';
                  }
                }

                if (this.state.depositMonth < monthId) {
                  statusText = 'Deposit window is not yet open.';
                } else if (this.state.depositMonth === monthId && depositAmount.lt(this.state.commitmentAmount)) {
                  statusText = 'Deposit window is open.';
                  if(depositAmount.lte(this.state.commitmentAmount))
                    showDepositButton = true;
                } else {
                  statusText = 'Deposit time elapsed.';

                }

                return (
                  <tr
                    style={{ backgroundColor: backgroundColor ? backgroundColor + '77' : '#fff' }}
                  >
                    <td>{monthId}</td>
                    <td>
                      {depositArray.length ? (
                        <span style={{ fontSize: '1rem' }}>
                          {depositArray.map((amount) => hexToNum(amount) + ' ES').join(' + ')}
                          {depositArray.length > 1 ? <> = {hexToNum(depositAmount)} ES</> : null}
                        </span>
                      ) : null}
                      <br />
                      {targetStatus}
                      {showDepositButton ? (
                        <>
                          <br />
                          <Button
                            variant={
                              depositAmount.gte(this.state.commitmentAmount) ? 'warning' : 'primary'
                            }
                            onClick={() =>
                              this.props.history.push(this.props.location.pathname + '/deposit/')
                            }
                          >
                            {depositAmount.gte(this.state.commitmentAmount) ? (
                              <>Make Topup</>
                            ) : (
                              <>Make Monthly Deposit</>
                            )}
                          </Button>
                        </>
                      ) : null}
                    </td>
                    <td>
                      {petArray[0] ? (
                        <>
                          <span style={{ fontSize: '1rem' }}>{hexToNum(petAmount)} ES</span>
                          <br />
                          {hexToNum(petArray[0] || ethers.constants.Zero)} ES (for acheiving{' '}
                          {(() => {
                            if (depositAmount.gte(this.state.commitmentAmount)) {
                              return <>self commitment</>;
                            } else if (
                              depositAmount.lt(this.state.commitmentAmount) &&
                              depositAmount.gte(this.state.commitmentAmount.div(2))
                            ) {
                              return <>half of self commitment</>;
                            }
                          })()}{' '}
                          of {hexToNum(this.state.commitmentAmount)} ES)
                          {(petArray[1] || ethers.constants.Zero).gt(0) ? (
                            <>
                              {' '}
                              and {hexToNum(petArray[1] || ethers.constants.Zero)} ES (for topup of{' '}
                              {hexToNum(depositAmount.sub(this.state.commitmentAmount))} ES)
                            </>
                          ) : null}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{statusText}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div style={{ backgroundColor: '#eee', padding: '1rem', borderRadius: '.25rem' }}>
            <p>
              To make a deposit for the current month in your PET you can click the below button.
            </p>
            <Button
              onClick={() =>
                this.props.history.push(`/pet-old/view/${this.props.match.params.id}/deposit`)
              }
            >
              Make a Deposit
            </Button>
          </div>

          <div className="details">
            <Button
              onClick={() =>
                this.props.history.push(`/pet-old/view/${this.props.match.params.id}/benefits`)
              }
            >
              Benefit Page
            </Button>
          </div>

          <div className="details" style={{ margin: '10px auto' }}>
            <Button
              onClick={() =>
                this.props.history.push(`/pet-old/view/${this.props.match.params.id}/nominees`)
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

export default PETId;
