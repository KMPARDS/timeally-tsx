import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export class StakingContract extends Component<RouteComponentProps> {
  render() {
    console.log(this.props);
    return <>StakingContract</>;
  }
}
