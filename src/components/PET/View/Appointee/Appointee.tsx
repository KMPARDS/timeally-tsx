import React, { Component } from 'react';
import Layout from '../../../Layout/LayoutPET';

class Appointee extends Component {
  render = () => {
    return (
      <Layout
        breadcrumb={['Home', 'PET','View', this.props.match.params.id, 'Appointee']}
        title='Appointee'
      >
        This is Appointee page. Here user will see all the appointees. and can add new using add button.
      </Layout>
    );
  }
}

export default Appointee;
