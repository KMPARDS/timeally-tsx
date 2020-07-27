import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

export class Transfer extends Component<Props> {
  render() {
    return <>Transfer Todo</>;
  }
}
