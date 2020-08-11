import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { ethers } from 'ethers';
import { routine } from '../../utils';

type State = {
  displayScreen: number;
  network: ethers.providers.Network | null;
};

export class UsingMetamask extends Component<{}, State> {
  state: State = {
    displayScreen: 0,
    network: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.loadMetamask, 500));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  loadMetamask = async () => {
    // this.setState({ displayScreen: 0 });
    try {
      if (window.ethereum) {
        // @ts-ignore
        window.ethereum.enable();
        const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await metamaskProvider.getNetwork();
        // console.log(network);
        if (network.name === 'homestead') {
          network.name = 'Main Ethereum Network';
        } else if (network.chainId === 5196) {
          network.name = 'Test EraSwap Network';
        } else if (network.chainId === 5197) {
          network.name = 'Main Era Swap Network';
        }

        // console.log(network);

        const onCorrectNetwork = network.chainId === Number(process.env.REACT_APP_CHAIN_ID ?? 0);

        if (!onCorrectNetwork) {
          this.setState({
            displayScreen: 1,
            network,
          });
        } else {
          const wallet = metamaskProvider.getSigner();
          const address = await wallet.getAddress();
          if (typeof window.wallet === 'object') {
            // @ts-ignore
            wallet.address = address;
          }
          // @ts-ignore
          window.wallet = wallet;

          setTimeout(async () => {
            this.setState({
              displayScreen: 2,
            });
          }, 300);
        }
      } else {
        this.setState({
          displayScreen: 3,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container className="text-center bg-com mb20">
        <Card className="mt40">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto mt40 mb40">
            <h3>Using Metamask to login</h3>

            {(() => {
              switch (this.state.displayScreen) {
                case 0:
                  return (
                    <p>
                      Please wait connecting to metamask... Now Metamask popup should open, click{' '}
                      <b>Confirm</b> in Metamask to allow it to connect with TimeAlly. If popup did
                      not open, please click on Metamask to open it (it sometimes ignores connection
                      requests) or try refreshing this page.
                    </p>
                  );
                case 1:
                  return (
                    <div>
                      You are on "
                      {this.state.network !== null ? this.state.network.name : 'Unknown'}" network
                      in MetaMask, but to use the New TimeAlly you need to connect to the Era Swap
                      Network.
                      <br />
                      To connect to Era Swap Network, follow these steps:{' '}
                      <ol>
                        <li>Open MetaMask.</li>
                        <li>Select Network dropdown (it's in top middle).</li>
                        <li>
                          Select <u>Custom RPC</u>.
                        </li>
                        <li>
                          Network Name: <u>Test EraSwap Network</u>
                        </li>
                        <li>
                          New RPC Url: <u>https://testnet.eraswap.network</u>
                        </li>
                        <li>
                          Symbol: <u>ES</u>
                        </li>
                        <li>
                          You can leave other fields blank. Click on Save button. If you've followed
                          the above instructions and still don't see your address on this page,
                          please try refreshing this page.
                        </li>
                      </ol>
                      For more help, visit this{' '}
                      <a
                        href="https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-Network-RPC-and-or-Block-Explorer"
                        target="_blank"
                        rel="noopenner noreferrer"
                      >
                        blog
                      </a>
                      .
                    </div>
                  );
                case 2:
                  return (
                    <p>
                      Connected to Metamask! Your address is{' '}
                      {window.wallet ? window.wallet.address : 'Unknown'}
                    </p>
                  );
                case 3:
                  return (
                    <p>
                      Metamask is not found. If you have Metamask installed, you can try updating
                      it. EIP 1102 proposed a communication protocol between dApps and
                      Ethereum-enabled DOM environments like Metamask.
                    </p>
                  );
              }
            })()}
          </div>
        </Card>
      </Container>
    );
  }
}
