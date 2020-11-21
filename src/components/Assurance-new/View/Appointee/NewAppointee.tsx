import React, { Component } from 'react';
import {Layout} from '../../../Layout/Layout';

class NewAppointee extends Component {
  render = () => {
    return (
      <Layout
        // breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Appointee', 'New']}
        title='New Appointee'
      >
        This is new appointee page. Here user be able to add a new appointee.
      </Layout>
    );
  }
}

export default NewAppointee;
