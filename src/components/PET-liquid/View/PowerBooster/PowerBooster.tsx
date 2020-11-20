import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '../../../Layout/LayoutPET';

interface RouteParams {
  id: string;
};
type Props = {};
type State = {};

class PowerBooster extends Component<Props & RouteComponentProps<RouteParams>, State> {
  render = () => {
    return (
      <Layout
        breadcrumb={['Home', 'PET', 'View', this.props.match.params.id, 'PowerBooster']}
        title="PowerBooster"
      >
        This is PowerBooster page. Here user will see his her 3 power boosters and timer and a
        withdraw button and some details.
      </Layout>
    );
  };
}

export default PowerBooster;
