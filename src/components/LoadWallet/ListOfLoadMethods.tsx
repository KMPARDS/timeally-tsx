import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ListOfLoadMethods = () => {
  return (
    <div className="container bg-com">
      <Card
        style={{ margin: '15px 0', cursor: 'pointer' }}
        onClick={() => window.open('https://eraswap.life/', '', 'width=1001,height=650')}
      >
        <Card.Body>
          Connect using <strong>Era Swap Life</strong>
        </Card.Body>
      </Card>

      <Link to="/load-wallet/using-metamask">
        <Card style={{ margin: '15px 0', cursor: 'pointer' }}>
          <Card.Body>
            Connect to <strong>Metamask</strong> (supports many hardware wallets like Trezor and
            Ledger)
          </Card.Body>
        </Card>
      </Link>

      <Link to="/load-wallet/using-address">
        <Card style={{ margin: '15px 0', cursor: 'pointer' }}>
          <Card.Body>
            Use <strong>Address</strong> to read account
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};
