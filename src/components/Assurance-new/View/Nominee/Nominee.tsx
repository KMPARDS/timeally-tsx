import { addresses } from 'eraswap-sdk/dist';
import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../../../Layout/Layout';
import TransactionModal from '../../../TransactionModal/TransactionModal';
const ethers = require('ethers');

interface RouteParams {
  id: string;
}
type Props = {};

interface SIPS {
  sipId: number;
  nomineeAddress: string;
  nomineeStatus: boolean;
}

type State = {
  loading: boolean;
  activeNominees: string[];
  removeNomineeAddress: string;
  showRemoveNomineeModal: boolean;
};

class Nominee extends Component<Props & RouteComponentProps<RouteParams>, State> {
  state: State = {
    loading: true,
    activeNominees: [],
    removeNomineeAddress: '',
    showRemoveNomineeModal: false,
  };

  componentDidMount = async () => {
    if (window.wallet) {
      // const nomineeNewEventSig = ethers.utils.id("NomineeUpdated(address,uint256,address,bool)");
      // const topics = [
      //   nomineeNewEventSig,
      //   ethers.utils.hexZeroPad(window.wallet.address, 32),
      //   ethers.utils.hexZeroPad(ethers.utils.bigNumberify(this.props.match.params.id)._hex, 32)
      // ];

      // const logs = await window.provider.getLogs({
      //   address:  process.env.REACT_APP_ENV === 'development' ? addresses.development.ESN.tsgap : addresses.production.ESN.tsgap,
      //   fromBlock: 0,
      //   toBlock: 'latest',
      //   topics
      // });

      // console.log(logs);

      // const nominees: any = {};
      // logs.forEach(log => {
      //   const address = ethers.utils.hexZeroPad(ethers.utils.hexStripZeros(log.topics[3]), 20);
      //   const status = Boolean(+log.data);
      //   nominees[address] = status;
      // });
      console.log('window.wallet.address', window.wallet.address);

      console.log('this.props.match.params.id', this.props.match.params.id);

      const nominees: any = {};
      (
        await window.tsgapLiquidInstance.queryFilter(
          window.tsgapLiquidInstance.filters.NomineeUpdated(
            window.wallet.address,
            ethers.utils.parseEther(this.props.match.params.id),
            null,
            null
          )
        )
      )
        .map((log) => window.tsgapLiquidInstance.interface.parseLog(log))
        .map((log) => ({
          nomineeAddress: log.args['nomineeAddress'],
          nomineeStatus: log.args['nomineeStatus'],
        }))
        .map((log) => {
          nominees[log.nomineeAddress] = log.nomineeStatus;
        });
      // .map(log => ({
      //   sipId: log.args['sipId'],
      //   nomineeAddress: log.args['nomineeAddress'],
      //   nomineeStatus: log.args['nomineeStatus']
      // }));

      console.log('nominees', nominees);
      this.setState({
        activeNominees: Object.entries(nominees)
          .filter((entry) => entry[1])
          .map((entry) => entry[0]),
        loading: false,
      });
    }
  };

  render = () => {
    return (
      <Layout
        // breadcrumb={['Home', 'Assurance','View', this.props.match.params.id, 'Nominee']}
        title="Nominee"
        button={{
          name: 'New Nominee',
          link: this.props.location.pathname + '/new',
        }}
        // buttonName="New Nominee"
        // buttonOnClick={() => this.props.history.push(this.props.location.pathname+'/new')}
      >
        <h2>Nominees of this SIP</h2>
        {this.state.loading ? (
          <p>Please wait scanning the blockchain for Nominees...</p>
        ) : (
          <>
            {!this.state.activeNominees.length ? (
              <p>No nominees found</p>
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nominee Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.activeNominees.map((address) => (
                    <tr>
                      <td>{address}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            this.setState({
                              removeNomineeAddress: address,
                              showRemoveNomineeModal: true,
                            })
                          }
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}

        <TransactionModal
          show={this.state.showRemoveNomineeModal}
          hideFunction={() => this.setState({ showRemoveNomineeModal: false })}
          ethereum={{
            //@ts-ignore
            transactor: window.tsgapLiquidInstance.connect(window.wallet?.connect(window.provider))
              .functions.toogleNominee,
            estimator: () => ethers.constants.Zero,
            contract: window.tsgapLiquidInstance,
            contractName: 'TimeAllySIP',
            arguments: [this.props.match.params.id, this.state.removeNomineeAddress, false],
            ESAmount: '0',
            headingName: `Remove Nominee (${this.state.removeNomineeAddress})`,
            functionName: 'Remove Nominee',
            directGasScreen: true,
            continueFunction: () => {
              this.setState({ showRemoveNomineeModal: false });
              this.componentDidMount();
            },
          }}
        />
      </Layout>
    );
  };
}

export default Nominee;
