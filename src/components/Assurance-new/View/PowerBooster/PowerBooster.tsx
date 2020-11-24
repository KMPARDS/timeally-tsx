import React, { Component } from 'react';
import { Layout } from '../../../Layout';

class PowerBooster extends Component {
  render = () => {
    return (
      <Layout
        // breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'PowerBooster']}
        title="PowerBooster"
      >
        This is PowerBooster page. Here user will see his her 3 power boosters and timer and a
        withdraw button and some details.
      </Layout>
    );
  };
}

export default PowerBooster;
