import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../Layout';
import { Card, Form, Alert, Button, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';

type State = {
  addressInput: string;
  success: boolean;
};

export function UsingAddress() {
  let [addressInput, setAddressInput] = useState<string>('');
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [isCorrectKycName, setIsCorrectKycName] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setIsChecking(true);
  }, [addressInput]);

  console.log('hi', addressInput);

  const checkedAddressInputRef = useRef('');

  const savedCallback = useRef<() => Promise<void>>();
  const callback = async () => {
    console.log({ addressInput, checked: checkedAddressInputRef.current, isCorrectKycName });

    if (
      !ethers.utils.isHexString(addressInput) &&
      addressInput !== checkedAddressInputRef.current
    ) {
      try {
        await window.provider.resolveAddress(addressInput);
        setIsCorrectKycName(true);
      } catch (error) {
        console.log('check address error', error);
        if (isCorrectKycName) setIsCorrectKycName(false);
      }
      setIsChecking(false);
      checkedAddressInputRef.current = addressInput;
    }
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    console.log('hooooo', addressInput);

    const intervalId = setInterval(() => {
      if (savedCallback.current) savedCallback.current();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Layout title="Load Wallet using Address">
      <Card>
        <Card.Body>
          <h4>View wallet using Address</h4>

          <p>
            Please note that using address you will not be able to do any transaction on behalf of
            the address. To do transaction on behalf of an address on Ethereum Blockchain, you need
            to have the private key (it can be in form or a mnemonic, keystore or stored inside your
            hardware wallet or metamask)
          </p>

          <Form.Group controlId="address">
            <Form.Control
              autoComplete="off"
              onChange={(event) => setAddressInput(event.target.value)}
              type="text"
              placeholder="Enter address or kyc name"
              style={{ width: '325px' }}
              isValid={
                addressInput !== '' &&
                (ethers.utils.isAddress(addressInput) || isCorrectKycName) &&
                !isChecking
              }
              isInvalid={
                addressInput !== '' &&
                !ethers.utils.isAddress(addressInput) &&
                !isCorrectKycName &&
                !isChecking
              }
            />
          </Form.Group>

          {displayMessage ? <Alert variant="success">{displayMessage}</Alert> : null}

          <Button
            variant="primary"
            id="addressSubmit"
            type="submit"
            disabled={(!isCorrectKycName && !ethers.utils.isAddress(addressInput)) || isChecking}
            onClick={async () => {
              // @ts-ignore
              window.wallet = new ethers.VoidSigner(
                await window.provider.resolveAddress(addressInput),
                window.provider
              );

              setDisplayMessage('Address loaded. Redirecting to wallet page...');
              setTimeout(() => history.push('/wallet'), 1500);
            }}
          >
            Read Account
          </Button>
        </Card.Body>
      </Card>
    </Layout>
  );
}
