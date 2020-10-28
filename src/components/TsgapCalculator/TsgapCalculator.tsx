import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import './TsgapCalc.css';

type Props = {};

type State = {
  commitmentAmount: string;
  errorMessage: string;
  montlhyAmount: number;
};

export class TsgapCalculator extends Component {
  state: State = {
    commitmentAmount: '',
    errorMessage: '',
    montlhyAmount: 0,
  };

  //@ts-ignore
  updateCommitment = async (event) => {
    try {
      if (String(+event.target.value) === 'NaN') throw new Error('Only Number is allowed');
      // console.log(+event.target.value, +event.target.value === NaN);

      this.setState({
        commitmentAmount: event.target.value,
        errorMessage: '',
        montlhyAmount:
          (+event.target.value *
            (+event.target.value >= 100000
              ? 24
              : +event.target.value >= 10000
              ? 22
              : +event.target.value >= 1000
              ? 20
              : +event.target.value >= 500
              ? 18
              : 16)) /
          100,
      });

      if (+event.target.value < 100) throw new Error('SIP of minimum 100 ES allowed');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render = () => {
    const returns = [];
    for (let i = 1; i <= 108; i++) {
      let amount = this.state.montlhyAmount;
      // if(i%12 === 0) amount += (+this.state.commitmentAmount)*12/3;
      returns.push(
        <tr>
          <td>
            <strong>Month {i}</strong> Withdraw
          </td>
          <td>
            <strong>{amount} ES</strong>
            {i % 36 === 0 ? (
              <>
                {' '}
                + power booster <strong>{(+this.state.commitmentAmount * 12) / 3} ES</strong>
              </>
            ) : null}
          </td>
        </tr>
      );
    }

    return (
      <div>
        <div className="page-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-breadcrumb"></div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="bg-white pinside30">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                      <h1 className="page-title">Calculate Your TimeAlly Super Goal</h1>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                      {/* {this.props.buttonName ? <Button onClick={this.props.buttonOnClick}>{this.props.buttonName}</Button> : null} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/*<a style={{color:'black', textDecoration: 'underline'}} href="/excel/TSGAP_Illustration.xlsx">Download Illustration Excel File</a>*/}

          <div className="display-ts-container">
            <div>
              <p style={{ margin: '0' }}>Commitment Amount Above 100 ES: 16%</p>
              <p style={{ margin: '0' }}>Commitment Amount Above 500 ES: 18%</p>
              <p style={{ margin: '0' }}>Commitment Amount Above 1,000 ES: 20%</p>
              <p style={{ margin: '0' }}>Commitment Amount Above 10,000 ES: 22%</p>
              <p style={{ margin: '0' }}>Commitment Amount Above 1,00,000 ES: 24%</p>
            </div>
          </div>

          <div style={{ width: '325px', margin: 'auto' }}>
            <Form.Group controlId="sipCommitment">
              <Form.Control
                className="sipCommitment"
                onChange={this.updateCommitment}
                value={this.state.commitmentAmount}
                type="text"
                placeholder="Enter commitment amount"
                autoComplete="off"
              />
            </Form.Group>

            {this.state.errorMessage ? (
              <Alert variant="danger">{this.state.errorMessage}</Alert>
            ) : (
              <></>
            )}
          </div>

          {this.state.montlhyAmount && !this.state.errorMessage ? (
            <>
              <p>Monthly returns after accumulation period: {this.state.montlhyAmount} ES</p>
              <table>
                <tr>
                  <th style={{ textAlign: 'center' }}>Deposit</th>
                  <th style={{ textAlign: 'center' }}>Staker Benefits</th>
                  <th style={{ textAlign: 'center' }}>Partner Benefits</th>
                </tr>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
                  <tr>
                    <td>
                      <strong>Month {number}</strong> Deposit
                    </td>
                    <td>
                      <strong>{this.state.commitmentAmount} ES</strong>
                    </td>
                    <td>
                      <strong>{(+this.state.commitmentAmount * 5) / 100} ES</strong> to Introducer,{' '}
                      <strong>{(+this.state.commitmentAmount * 5) / 100} ES</strong> to Tree
                    </td>
                  </tr>
                ))}
              </table>
              <table>
                <tr>
                  <th style={{ textAlign: 'center' }}>Withdrawals</th>
                  <th style={{ textAlign: 'center' }}>Staker Benefits</th>
                </tr>
                {returns}
              </table>
              <div style={{ padding: '1rem' }}>
                <p>
                  Total Deposit by Staker: <strong>{+this.state.commitmentAmount * 12} ES</strong>
                </p>
                <p>
                  Total Monthly to Staker: <strong>{this.state.montlhyAmount * 108} ES</strong>
                </p>
                <p>
                  Power Booster to Staker: <strong>{+this.state.commitmentAmount * 12} ES</strong>
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };
}
