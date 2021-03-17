import React, { Component } from 'react';
import { Button, Card, Form, Spinner, Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '../../../Layout/LayoutPET';
import '../../PET.css';
import { ethers } from 'ethers';
import TransactionModal from '../../../TransactionModal/TransactionModal';
import { hexToNum } from '../../../../utils';
// import { sendTransaction } from './sendTransaction';
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
  showWithdrawModal1: boolean;
  spinner: boolean;
  benefitAmount: number;
  selectedPowerBooster: number;
  powerBoosterAmount: number;
  showPowerBoosterWithdrawModal: boolean;
  ClaimedWES: string;
  AllowedWES: string;
  ConvertAmount: string;
};
class Convert extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    monthlyBenefitAmountArray: [],
    depositStatusArray: [],
    currentMonth: -1,
    selectedMonth: -1,
    withdrawMessage: '',
    showWithdrawModal: false,
    showWithdrawModal1: false,
    spinner: false,
    benefitAmount: -1,
    selectedPowerBooster: -1,
    powerBoosterAmount: -1,
    showPowerBoosterWithdrawModal: false,
    ClaimedWES: '0',
    AllowedWES: '0',
    ConvertAmount: '0',
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
      const AllowedWES = ethers.utils.formatEther(
        await window.petConvert.AllowedWES(window.wallet.address)
      );
      const ClaimedWES = ethers.utils.formatEther(
        await window.petConvert.ClaimedWES(window.wallet.address)
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
  ConvertWES = async (e) => {
    e.preventDefault();
    if (window.wallet) {
      await window.prepaidEsInstance
        .connect(window.wallet)
        .approve(window.petConvert.address, ethers.utils.parseEther(this.state.ConvertAmount));
      this.setState({ showWithdrawModal1: true });
    }
  };

  withdrawAnnuity = async () => {
    try {
      if (window.wallet) {
        const tx = await window.petConvert.monthlyAnnuity(
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

      if ((i + 1) % 5 === 0) {
        benefitTableElementArray.push(
          <tr style={{ backgroundColor: '#aaa' }}>
            <td>Power Booster {Math.ceil(i / 5)}</td>
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
                Claim
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
        <div className="card">
          {/* You have Convert {this.state.ClaimedWES} {' '}ES out of {this.state.AllowedWES} {' '}ES . */}

          <Card style={{ marginBottom: '0' }}>
            <Form
              className="custom-width"
              onSubmit={this.ConvertWES}
              style={{ borderRadius: '.25rem', padding: '20px 40px', margin: '15px auto' }}
            >
              <h3 style={{ marginBottom: '15px' }}> Convert WES to ES</h3>
              <p>
                You have Convert {this.state.ClaimedWES} ES out of {this.state.AllowedWES} ES .
              </p>

              <Form.Group>
                <Form.Control
                  className="stakingInput"
                  onChange={(e) => this.setState({ ConvertAmount: e.target.value })}
                  autoFocus
                  type="number"
                  placeholder="Enter amount for convert"
                  style={{ width: '100%' }}
                />
              </Form.Group>

              <Button variant="primary" id="firstSubmit" type="submit">
                Convert
              </Button>
            </Form>
          </Card>
        </div>
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
            {this.state.spinner ? 'Please wait...' : 'Claim'}
          </Button>
        </div>
        <TransactionModal
          show={this.state.showPowerBoosterWithdrawModal}
          hideFunction={() =>
            this.setState({ showPowerBoosterWithdrawModal: false, spinner: false })
          }
          ethereum={{
            //@ts-ignore
            transactor: window.petConvert.connect(window.wallet?.connect(window.provider))
              .powerBooster,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              this.state.selectedPowerBooster,
            ],
            ESAmount: this.state.benefitAmount,
            headingName: 'Convert Power Booster',
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
            transactor: window.petConvert.connect(window.wallet?.connect(window.provider))
              .monthlyAnnuity,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [
              window.wallet?.address,
              this.props.match.params.id,
              this.state.selectedMonth,
            ],
            ESAmount: this.state.benefitAmount,
            headingName: 'Convert Benefit',
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
        <TransactionModal
          show={this.state.showWithdrawModal1}
          hideFunction={() => this.setState({ showWithdrawModal1: false, spinner: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.petConvert.connect(window.wallet?.connect(window.provider))
              .ConvertWES,
            estimator: () => ethers.constants.Zero,
            contract: window.prepaidEsInstance,
            contractName: 'EraSwap',
            arguments: [ethers.utils.parseEther(this.state.ConvertAmount)],
            ESAmount: this.state.benefitAmount,
            headingName: 'Convert Benefit',
            functionName: 'Withdraw',
            // stakingPlan: this.state.plan,
            directGasScreen: true,
            continueFunction: () =>
              this.setState({
                spinner: false,
                // currentScreen: 2,
                // approveSuccess: true,
                showWithdrawModal1: false,
              }),
          }}
        />
      </Layout>
    );
  };
}

export default Convert;
