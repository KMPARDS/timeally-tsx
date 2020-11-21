import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '../../../Layout/LayoutPET';

interface RouteParams {
  id: string;
}
type Props = {};
type State = {};
class NewAppointee extends Component<Props & RouteComponentProps<RouteParams>, State> {
  render = () => {
    return (
      <Layout
        breadcrumb={['Home', 'PET', 'View', this.props.match.params.id, 'Appointee', 'New']}
        title="New Appointee"
      >
        This is new appointee page. Here user be able to add a new appointee.
      </Layout>
    );
  };
}

export default NewAppointee;
