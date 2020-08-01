import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Card, Form, Alert, Button, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';

type State = {
  addressInput: string;
  success: boolean;
};

export class UsingAddress extends Component<{}, State> {
  state: State = {
    addressInput: '',
    success: false,
  };

  render() {
    return (
      <Layout title="Load Wallet using Address">
        <Card>
          <Card.Body>
            <h4>View wallet using Address</h4>

            <p>
              Please note that using address you will not be able to do any transaction on behalf of
              the address. To do transaction on behalf of an address on Ethereum Blockchain, you
              need to have the private key (it can be in form or a mnemonic, keystore or stored
              inside your hardware wallet or metamask)
            </p>

            <Form.Group controlId="address">
              <Form.Control
                autoComplete="off"
                onChange={(event) => this.setState({ addressInput: event.target.value })}
                type="text"
                placeholder="Enter your Address"
                style={{ width: '325px' }}
                isValid={ethers.utils.isAddress(this.state.addressInput)}
                isInvalid={
                  this.state.addressInput !== '' && !ethers.utils.isAddress(this.state.addressInput)
                }
              />
            </Form.Group>

            <Button
              variant="primary"
              id="addressSubmit"
              type="submit"
              disabled={!ethers.utils.isAddress(this.state.addressInput)}
              onClick={() => {
                console.log(1234);
                // @ts-ignore
                window.wallet = new ethers.VoidSigner(this.state.addressInput, window.provider);
              }}
            >
              Read Account
            </Button>
          </Card.Body>
        </Card>
      </Layout>
    );
  }
}
