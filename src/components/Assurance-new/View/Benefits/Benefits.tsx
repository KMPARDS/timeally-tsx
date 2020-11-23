import React, { Component } from 'react';
import { Button,Spinner,Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import {Layout} from '../../../Layout/Layout';
import '../../Assurance.css';
import { ethers } from  'ethers';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { hexToNum } from '../../../../utils';

interface RouteParams {
  id: string;
}
type Props = {};
type State = {
  monthlyBenefitAmountArray: ethers.BigNumber[],
  depositStatusArray: number[],
  selectedMonth: number;
  withdrawMessage: string;
  showWithdrawModal: boolean;
  spinner: boolean;
  benefitAmount: number;
  selectedPowerBooster: number;
  powerBoosterAmount: number;
  showPowerBoosterWithdrawModal: boolean;
}

class Benefits extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    monthlyBenefitAmountArray: [],
    depositStatusArray: [],
    selectedMonth: -1,
    withdrawMessage: '',
    showWithdrawModal: false,
    spinner: false,
    benefitAmount: -1,
    selectedPowerBooster: -1,
    powerBoosterAmount: -1,
    showPowerBoosterWithdrawModal: false,
  };

  componentDidMount = async() => {
    if(window.wallet){


      const sip = await window.tsgapLiquidInstance.sips(
        window.wallet.address,
        this.props.match.params.id
      );
      const sipPlan = await window.tsgapLiquidInstance.sipPlans(sip.planId);

      const monthlyBenefitAmountPromiseArray = []
      , depositDoneStatusPromiseArray = [];

      for(let i = 1; i <= sipPlan.accumulationPeriodMonths; i++) {
        monthlyBenefitAmountPromiseArray.push(
          window.tsgapLiquidInstance.viewMonthlyBenefitAmount(
            window.wallet.address,
            this.props.match.params.id,
            i
          )
        );
        depositDoneStatusPromiseArray.push(
          window.tsgapLiquidInstance.getDepositDoneStatus(
            window.wallet.address,
            this.props.match.params.id,
            i
          )
        );
      }
      //@ts-ignore
      await Promise.all([...monthlyBenefitAmountPromiseArray, ...depositDoneStatusPromiseArray]);

      const monthlyBenefitAmountArray = []
      , depositStatusArray = [];

      for(let i = 0; i < sipPlan.accumulationPeriodMonths; i++) {
        monthlyBenefitAmountArray.push(await monthlyBenefitAmountPromiseArray[i]);
        depositStatusArray.push(await depositDoneStatusPromiseArray[i]);
      }

      this.setState({
        monthlyBenefitAmountArray,
        depositStatusArray,

      });
    }


  }
  render = () => {
    const benefitTableElementArray = [];
    let powerBoosterCount = 0;
    for(let i = 0; i < 108; i++) {
      benefitTableElementArray.push(
        <tr>
          <td>{i+1}</td>
          <td>{this.state.monthlyBenefitAmountArray[i%12] ? ethers.utils.formatEther(this.state.monthlyBenefitAmountArray[i%12]) + ' ES' : 'Loading...'}</td>
          <td>
          <Button
              onClick={async (e) => {
                if (window.wallet) {
                  const benefitAmount = await window.tsgapLiquidInstance.viewMonthlyBenefitAmount(
                    window.wallet?.address,
                    this.props.match.params.id,
                    i+1
                  );
                  this.setState({
                    selectedMonth: i + 1,
                    benefitAmount: hexToNum(benefitAmount),
                  });
                }
              }}
              // disabled={this.state.selectedMonth > (i+1)}
            >
              {this.state.selectedMonth >= i + 1 ? 'Selected' : 'Select'}
            </Button></td>
        </tr>
      );
      if((i+1)%36===0) {
        benefitTableElementArray.push(
          <tr style={{ backgroundColor: '#aaa' }}>
            <td>Power Booster {Math.ceil(i / 36)}</td>
            <td>
              {this.state.powerBoosterAmount > -1 ? this.state.powerBoosterAmount : 'Loading...'}
            </td>
            <td>
              <Button
                onClick={async (e) => {
                  if (window.wallet) {
                    this.setState({
                      selectedPowerBooster: powerBoosterCount,
                      benefitAmount: this.state.powerBoosterAmount,
                      showPowerBoosterWithdrawModal: true,
                    });
                  }
                }}
              >
                Withdraw
              </Button>
            </td>
          </tr>
        );
        powerBoosterCount++;
      }
    }

    return (
      <Layout
          // breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Benefits']}
          title={this.props.match.params.id}>
          {/* <p>This page is under construction. On this page user can see their monthly benefits in advance and withdraw them after the withdraw window is open for the month.</p> */}
          <Table responsive>
          <thead>
            <tr>
              <th>Month Number</th>
              <th>Benefit Amount</th>
              <th>Click on buttons to Select</th>
            </tr>
          </thead>
          <tbody>
            {benefitTableElementArray}
          </tbody>
        </Table>

      <div className="details">
      <Button
            disabled={this.state.selectedMonth === -1 || this.state.spinner}
            onClick={() => {
              this.setState({
                showWithdrawModal: true,
                spinner: true,
              });
            }}
          >
            {this.state.spinner ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: '2px' }}
              />
            ) : null}
            {this.state.spinner ? 'Please wait...' : 'Withdraw'}
          </Button>
      </div>
      <TransactionModal
          show={this.state.showPowerBoosterWithdrawModal}
          hideFunction={() =>
            this.setState({ showPowerBoosterWithdrawModal: false, spinner: false })
          }
          ethereum={{
            //@ts-ignore
            transactor: window.petLiquidInstance.connect(window.wallet?.connect(window.provider))
              .withdrawPowerBooster,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              this.state.selectedPowerBooster,
            ],
            ESAmount: this.state.benefitAmount,
            headingName: 'Withdraw Power Booster',
            functionName: 'Withdraw',
            // stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () =>
              this.setState({
                spinner: false,
                // currentScreen: 2,
                // approveSuccess: true,
                showPowerBoosterWithdrawModal: false,
              }),
          }}
        />
      <TransactionModal
          show={this.state.showWithdrawModal}
          hideFunction={() => this.setState({ showWithdrawModal: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.tsgapLiquidInstance.connect(window.wallet?.connect(window.provider))
              .withdrawBenefit,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              this.state.selectedMonth,
            ],
            ESAmount: this.state.benefitAmount,
            headingName: 'Withdraw Benefit',
            functionName: 'Withdraw',
            // stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () =>
              this.setState({
                spinner: false,
                // currentScreen: 2,
                // approveSuccess: true,
                showWithdrawModal: false,
              }),
          }}
        />
      </Layout>

    );
  }
}

export default Benefits;
