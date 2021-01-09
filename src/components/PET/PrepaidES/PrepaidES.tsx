import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { hexToNum, lessDecimals } from '../../../utils';

const ethers = require('ethers');
type State = {
  showLoginModal: boolean,
  prepaidESBalance: number,
};

type Props = {};

class PrepaidES extends Component<Props & RouteComponentProps, State> {
  state:State = {
    showLoginModal: false,
    prepaidESBalance: 0,
  };

  componentDidMount = async () => {
    if(window.wallet){
      const prepaidESBalance = await window.prepaidEsInstance.balanceOf(window.wallet.address);
      console.log(prepaidESBalance);
      this.setState({ prepaidESBalance: hexToNum(prepaidESBalance) });
    }
  };

  render = () => (
    <Layout
      breadcrumb={['Home', 'PET']}
      title="PET Prepaid ES"
      subtitle="Prepaid ES for direct PET transactions"
      transparent={true}
    >
      <p style={{ backgroundColor: '#fff', padding: '10px' }}>
        You can use PET PrepaidES to make a deposit (in one transaction, this saves gas because
        deposit using liquid ES requires approve tx then again deposit tx) in your PET or you can
        also transfer it to anyone. To Make a deposit using PrepaidES, you need to create a new PET
        if you don't have one already and make your deposit, for that you can <u>Go to PETs</u> to
        proceed. You can also transfer your PrepaidES to multiple wallet addresses, you can do so
        using <u>Send Prepaid ES Different</u> button below.
      </p>
      <div
        className="outline pinside30 bg-boxshadow"
        style={{ marginBottom: '1rem', backgroundColor: '#fff' }}
      >
        <p>
          <strong>PrepaidES Balance:</strong>
          {' '}{this.state.prepaidESBalance + ' ES'}
        </p>
        <Button
          className="margin-custom"
          onClick={() => this.props.history.push('/pet-new/prepaid-es/add-to-prepaid')}
        >
          Add ES To Prepaid
        </Button>
        <Button
          className="margin-custom"
          onClick={() => this.props.history.push('/pet-new/view')}
        >
          Go to PETs
        </Button>
        {/* <Button
        onClick={() => this.props.history.push('/pet-new/prepaid-es/send')}
        >
          Send Prepaid ES to Peers
        </Button> */}
      </div>
      <Modal
        show={this.state.showLoginModal}
        onHide={() => this.setState({ showLoginModal: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet Needed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            You need to load your ethereum wallet in order to proceed. Please click the below button
            to go to the load wallet page.
          </p>
          <Button
            onClick={() => this.props.history.push('/load-wallet')}
            variant="primary"
          >
            Go to Load Wallet Page
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default withRouter(PrepaidES);
