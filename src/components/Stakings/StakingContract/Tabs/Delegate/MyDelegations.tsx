import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { ethers } from 'ethers';
import { Table, Button } from 'react-bootstrap';

type Props = {
  instance: TimeAllyStaking;
};

interface Delegation {
  platform: string;
  delegatee: string;
  amount: ethers.BigNumber;
}

type State = {
  currentMonth: number | null;
  monthlyDelegations: Delegation[][] | null;
};

export class MyDelegations extends Component<Props, State> {
  state: State = {
    currentMonth: null,
    monthlyDelegations: null,
  };

  componentDidMount = async () => {
    this.loadDelegations();
  };

  loadDelegations = async () => {
    const currentMonth = (await window.nrtManagerInstance.currentNrtMonth()).toNumber();
    const startMonth = (await this.props.instance.startMonth()).toNumber();
    const endMonth = (await this.props.instance.endMonth()).toNumber();
    const monthlyDelegations = await Promise.all(
      Object.keys([...Array(endMonth - startMonth + 1)]).map(async (i) => {
        const delegations = await this.props.instance.getDelegations(startMonth + +i);
        return delegations;
      })
    );
    this.setState({ monthlyDelegations, currentMonth });
  };

  // withdrawBenefit = async (month: ethers.BigNumberish) => {
  //   // i wish there was a way to get validator index from smart contract
  //   // window.validatorManagerInstance.getValidatorStakingDelegators();
  // };

  render() {
    return (
      <>
        {this.state.monthlyDelegations === null || this.state.currentMonth === null ? (
          'Loading delegations...'
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>NRT Month</th>
                  <th>Platform</th>
                  <th>Delegatee</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.monthlyDelegations.map((delegations, i) =>
                  delegations.map((delegation) => (
                    <tr>
                      <td>{(this.state.currentMonth ?? 0) + i}</td>
                      <td>{delegation.platform}</td>
                      <td>{delegation.delegatee}</td>
                      <td>{ethers.utils.formatEther(delegation.amount)} ES</td>
                      <td>
                        <Button disabled>Withdraw benefit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </>
        )}
      </>
    );
  }
}
