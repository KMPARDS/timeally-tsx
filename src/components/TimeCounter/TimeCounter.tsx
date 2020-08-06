import React, { Component } from 'react';
import { renderSecondsRemaining, routine } from '../../utils';

type Props = {
  timestamp: number;
  remaining?: boolean;
  elapsed?: boolean;
};

type State = {
  currentTime: number;
};

export class TimeCounter extends Component<Props, State> {
  state: State = {
    currentTime: Math.round(Date.now() / 1000),
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(
      routine(() => this.setState({ currentTime: Math.round(Date.now() / 1000) }), 1000)
    );
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  render() {
    if (this.props.remaining) {
      return <>{renderSecondsRemaining(this.props.timestamp - this.state.currentTime)} remaining</>;
    } else if (this.props.elapsed) {
      return <>{renderSecondsRemaining(this.state.currentTime - this.props.timestamp)} ago</>;
    }
  }
}
