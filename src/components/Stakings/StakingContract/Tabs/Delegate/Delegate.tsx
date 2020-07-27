import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

export class Delegate extends Component<Props> {
  render() {
    return <>Delegate Todo</>;
  }
}
