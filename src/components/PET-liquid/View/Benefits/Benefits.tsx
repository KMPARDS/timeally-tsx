import React, { Component } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '../../../Layout/LayoutPET';
import '../../PET.css';
import { ethers } from 'ethers';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { hexToNum } from '../../../../utils';
interface RouteParams {
  id: string;
}
type Props = {};
type State = {
  monthlyBenefitAmountArray: ethers.BigNumber[];
  depositStatusArray: number[];
  currentMonth: number;
  selectedMonth: number;
  withdrawMessage: string;
  showWithdrawModal: boolean;
  spinner: boolean;
  benefitAmount: number;
  selectedPowerBooster: number;
  powerBoosterAmount: number;
  showPowerBoosterWithdrawModal: boolean;
};
class Benefits extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    monthlyBenefitAmountArray: [],
    depositStatusArray: [],
    currentMonth: -1,
    selectedMonth: -1,
    withdrawMessage: '',
    showWithdrawModal: false,
    spinner: false,
    benefitAmount: -1,
    selectedPowerBooster: -1,
    powerBoosterAmount: -1,
    showPowerBoosterWithdrawModal: false,
  };

  componentDidMount = async () => {
    console.log('mounted');

    if (window.wallet) {
      console.log('called');
      const currentMonth = await window.petLiquidInstance.getDepositMonth(
        window.wallet.address,
        this.props.match.params.id
      );

      const powerBoosterAmount = await window.petLiquidInstance.calculatePowerBoosterAmount(
        window.wallet.address,
        this.props.match.params.id
      );

      const pets = await window.petLiquidInstance.pets(
        window.wallet?.address,
        this.props.match.params.id
      );

      const petPlan = await window.petLiquidInstance.petPlans(pets.planId);
      const monthlyBenefitAmountArray = [];
      const TWELVETH_MONTH = 12;
      for (let i = 1; i <= TWELVETH_MONTH; i++) {
        monthlyBenefitAmountArray.push(
          await window.petLiquidInstance.getSumOfMonthlyAnnuity(
            window.wallet.address,
            pets.planId,
            i,
            i
          )
        );
      }
      // const monthlyBenefitAmountPromiseArray = []
      // , depositDoneStatusPromiseArray = [];
      // for(let i = 1; i <= petPlan.accumulationPeriodMonths; i++) {
      //   monthlyBenefitAmountPromiseArray.push(
      //     window.petLiquidInstance.viewMonthlyBenefitAmount(
      //       window.wallet?.address,
      //       this.props.match.params.id,
      //       i
      //     )
      //   );
      //   depositDoneStatusPromiseArray.push(
      //     window.petLiquidInstance.getDepositDoneStatus(
      //       window.wallet?.address,
      //       this.props.match.params.id,
      //       i
      //     )
      //   );
      // }
      // //@ts-ignore
      // console.log('logs',await Promise.all([...monthlyBenefitAmountPromiseArray, ...depositDoneStatusPromiseArray]));
      // const monthlyBenefitAmountArray = []
      // , depositStatusArray = [];
      // for(let i = 0; i < petPlan.accumulationPeriodMonths; i++) {
      //   monthlyBenefitAmountArray.push(await monthlyBenefitAmountPromiseArray[i]);
      //   depositStatusArray.push(await depositDoneStatusPromiseArray[i]);
      // }
      console.log('currentMonth', currentMonth);

      console.log(`hexToNum(${currentMonth})`, hexToNum(currentMonth));

      this.setState({
        monthlyBenefitAmountArray,
        currentMonth: hexToNum(currentMonth),
        powerBoosterAmount: hexToNum(powerBoosterAmount),
        // depositStatusArray,
      });
    }
  };

  withdrawAnnuity = async () => {
    try {
      if (window.wallet) {
        const tx = await window.petLiquidInstance.withdrawAnnuity(
          window.wallet.address,
          this.props.match.params.id,
          this.state.selectedMonth
        );
        await tx.wait();
        this.setState({
          withdrawMessage: 'Success! Tx Hash: ' + tx.hash,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        withdrawMessage: e.message,
      });
    }
  };

  render = () => {
    const benefitTableElementArray = [];
    const LAST_MONTH_NUMBER = 12 * 5;
    let powerBoosterCount = 0;
    for (let i = 0; i < LAST_MONTH_NUMBER; i++) {
      benefitTableElementArray.push(
        <tr>
          <td>{i + 1}</td>
          <td>
            {this.state.monthlyBenefitAmountArray[i % 12]
              ? ethers.utils.formatEther(this.state.monthlyBenefitAmountArray[i % 12]) + ' ES'
              : 'Loading...'}
          </td>
          <td>
            <Button
              onClick={async (e) => {
                if (window.wallet) {
                  const benefitAmount = await window.petLiquidInstance.getSumOfMonthlyAnnuity(
                    window.wallet?.address,
                    this.props.match.params.id,
                    1,
                    i + 1
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
            </Button>
          </td>
        </tr>
      );

      if ((i + 1) % 36 === 0) {
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
        breadcrumb={['Home', 'PET', 'View', this.props.match.params.id, 'Benefits']}
        title={`PET ID: ${this.props.match.params.id}`}
      >
        {/* <p>
          This page is under construction. On this page user can see their monthly benefits in
          advance and withdraw them after the withdraw window is open for the month.
        </p> */}
        <Table responsive>
          <thead>
            <tr>
              <th>Month Number</th>
              <th>Benefit Amount</th>
              <th>Click on buttons to Select</th>
            </tr>
          </thead>
          <tbody>{benefitTableElementArray}</tbody>
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
            transactor: window.petLiquidInstance.connect(window.wallet?.connect(window.provider))
              .withdrawAnnuity,
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
  };
}

export default Benefits;
