import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import '../Stakings.css';

type Props = {
  instance: TimeAllyStaking;
  startMonth: number | null;
  endMonth: number | null;
};

export class Withdraw extends Component<Props> {
  instance = this.props.instance;

  render() {
    if (this.props.startMonth === null || this.props.endMonth === null) {
      return <>Please wait...</>;
    }

    return (
      <div className="container dashboard-bg">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wrapper-content-stack bg-white pinside10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row table-padding">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>NRT Month</th>
                          <th>Monthly Benefits</th>
                          <th>Withdraw</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.keys([...Array(this.props.endMonth - this.props.startMonth + 1)])
                          // below null coalescing is used due to a bug in typescript https://github.com/microsoft/TypeScript/issues/36436
                          .map((n) => +n + (this.props.startMonth ?? 0))
                          .map((month, i) => (
                            <tr key={i}>
                              <td>{month}</td>
                              <td>67.78 ES </td>
                              <td>
                                <div className="withdraw-data-flex">
                                  <a className="pink-btn-with">WITHDRAW</a>
                                  <a className="btn btn-default main-btn-blue">RESTAKE </a>
                                  <a className="btn  border-conv">CONVERT TO WES</a>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
