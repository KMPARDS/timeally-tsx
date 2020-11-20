import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Layout from '../../Layout/LayoutPET';

const ethers = require('ethers');

class PrepaidES extends Component {
  state = {
    fundsDeposit: null,
    pendingBenefits: null,
    showLoginModal: false,
    prepaidESBalance: '',
  };

  componentDidMount = async () => {
    // const prepaidESBalance = await window.petInstance.functions.prepaidES(window.walletInstance.address);
    // console.log(prepaidESBalance);
    // this.setState({ prepaidESBalance });
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
          {/* {this.state.prepaidESBalance ? window.lessDecimals(this.state.prepaidESBalance) + ' ES' : 'Loading...'} */}
        </p>
        <Button
          className="margin-custom"
          // onClick={() => this.props.history.push('/pet/prepaid-es/add-to-prepaid')}
        >
          Add ES To Prepaid
        </Button>
        <Button
          className="margin-custom"
          // onClick={() => this.props.history.push('/pet/view')}
        >
          Go to PETs
        </Button>
        <Button
        // onClick={() => this.props.history.push('/pet/prepaid-es/send')}
        >
          Send Prepaid ES to Peers
        </Button>
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
            // onClick={() => this.props.history.push('/load-wallet')}
            variant="primary"
          >
            Go to Load Wallet Page
          </Button>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default PrepaidES;
