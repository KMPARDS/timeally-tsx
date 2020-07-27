import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

export class Merge extends Component<Props> {
  render() {
    return (
      <>
        <h3>Merge</h3>
      </>
    );
  }
}
