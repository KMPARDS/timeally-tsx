import React, { Component } from 'react';
import { Layout } from '../Layout';
import {
  Card,
  Form,
  Row,
  Alert,
  Button,
  Spinner,
  Tabs,
  Tab,
  Table,
  Dropdown,
  InputGroup,
  DropdownButton,
  Modal,
  Col,
} from 'react-bootstrap';
import { Renderer } from '../Markdown';
import { CustomModal } from '../Modal';

// const myBtn  = ()=> <button type="button" className="btn btn-danger">Danger</button>;

type State = {
  
} 

export class Nominee extends Component {
  render() {
    return (
      <Layout title="Nominee">
        <div className="nominee-home">
          <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
            <Tab eventKey="home" title="Home">
              <h3>Hi, 0x56d38C60793b64aeab5E62630a2b690C695779da</h3>
              <p>
                you have
                <Form.Control
                  className="mb-2 homeinput"
                  id="inlineFormInput"
                  placeholder=""
                  width="125"
                />
                Pending vote requirements.
              </p>
              <p>
                Your current staking is
                <Form.Control
                  className="mb-2 homeinput"
                  id="inlineFormInput"
                  placeholder=""
                  width="125"
                />
                %
              </p>
              <p>
                Your current vote multiplier is
                <Form.Control
                  className="mb-2 homeinput"
                  id="inlineFormInput"
                  placeholder=""
                  width="125"
                />
              </p>
              <div className="">
                <button type="button" className="btn btn-primary">
                  Confirm
                </button>
              </div>

              <p className="mt40">
                you have
                <Form.Control
                  className="mb-2 homeinput"
                  id="inlineFormInput"
                  placeholder=""
                  width="125"
                />
                Pending Transaction to be Approved
              </p>
              <div className="row table-padding mt20">
                <Table responsive className="hometable">
                  <thead>
                    <tr>
                      <th>Wallet Address</th>
                      <th>Current Staking %</th>
                      <th>Current Vote Weight (Multiplier)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="5"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <a type="submit" className="mb-2 btn btn-dark text-white btnsm">
                          <i className="fa fa-close"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="5"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <a type="submit" className="mb-2 btn btn-dark text-white btnsm">
                          <i className="fa fa-close"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="5"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          MODIFY
                        </a>
                      </td>
                      <td>
                        <a type="submit" className="mb-2 btn btn-dark text-white btnsm">
                          <i className="fa fa-close"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="nominee" title="Nominee">
              <h3>Wallet Address:0x56d38C60793b64aeab5E62630a2b690C695779da</h3>
              <p>
                Relationship
                <Form.Control as="select" className="homeinput">
                  <option>Empty</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Friend</option>
                  <option>Wife</option>
                  <option>other</option>
                </Form.Control>
                Pending vote requirements.
              </p>

              <div className="mt40">
                <button type="button" className="btn btn-primary">
                  Confirm
                </button>
              </div>

              <Form.Group as={Row} controlId="formPlaintextPassword" className="mt40">
                <Form.Label column sm="2">
                  Wallet Address :
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" placeholder="Enter Wallet Address" />
                </Col>
              </Form.Group>

              <CustomModal title="Add Nominee" buttonText="Add Nominee" className="mt10">
                <div className="text-center mt40 mb40">
                  <i className="fa fa-check-circle fa-5x text-primary" aria-hidden="true"></i>
                  <p>Your Nominee is Successfully Added</p>
                </div>
              </CustomModal>
              <h3 className="mt20">MODIFY STAKING </h3>
              <div className="row table-padding mt20">
                <Table responsive className="hometable">
                  <tbody>
                    <tr>
                      <td className="inline text-right">
                        Available Stake (in %)
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Nominee 1</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          +
                        </a>
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          -
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Nominee 2</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          +
                        </a>
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          -
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Nominee N</td>
                      <td className="inline">
                        <Form.Control
                          className="mb-2 hometableinput d-inline"
                          id="inlineFormInput"
                          placeholder="10%"
                        />
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          +
                        </a>
                        <a type="submit" className="mb-2 btn btn-primary btnsm ml10">
                          -
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="mt40">
                <button type="button" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Tab>
            <Tab eventKey="transactions" title="Transactions">
              <h3>New Transaction</h3>
              <div className="col-md-12 text-right">
                <DropdownButton id="dropdown-basic-button" title="SORT">
                  <Dropdown.Item href="#/action-1" className="filterinput">
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      className="filterinput"
                    />{' '}
                    By Date (Ascending)
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" className="filterinput">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" /> By Date
                    (Descending)
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3" className="filterinput">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" /> Received
                    by me
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3" className="filterinput">
                    {' '}
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" /> Not
                    Received by me
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3" className="filterinput">
                    {' '}
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" /> All
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="row table-padding mt20">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Receiver ID</th>
                      <th>Amount</th>
                      <th>Details</th>
                      <th>Voted Approval</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-primary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-secondary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-primary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-secondary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-primary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>0x56d38C60793b64....................79da</td>
                      <td>20 ES</td>
                      <td>
                        <a href="" className="btn btn-secondary" type="button">
                          Pay
                        </a>
                      </td>
                      <td>
                        <div className="vc-toggle-container">
                          <label className="vc-switch">
                            <input type="checkbox" className="vc-switch-input" />
                            <span
                              className="vc-switch-label"
                              data-on="Voted"
                              data-off="No Voted"
                            ></span>
                            <span className="vc-handle"></span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="mode" title="Nominee Mode">
              <h3>
                Turn off / on Nominee Mode button
                <span className="pull-right">
                  <div className="vc-toggle-container">
                    <label className="vc-switch">
                      <input type="checkbox" className="vc-switch-input" />
                      <span className="vc-switch-label" data-on="Voted" data-off="No Voted"></span>
                      <span className="vc-handle"></span>
                    </label>
                  </div>
                </span>
              </h3>

              {/* <CustomModal title="My title"  buttonText='hello'> 
            <h1>Hello Mark</h1> 
           </CustomModal>     */}
              {/* <CustomModal title="My title" buttonType='toggle' buttonText='hello'> 
            <h1>Hello Mark</h1> 
           </CustomModal> */}
            </Tab>
          </Tabs>
        </div>

        {/* <div className="container project-tab" >
                <div className="row">
                    <div className="col-md-12">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Project Tab 1</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Project Tab 2</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Project Tab 3</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                tab1
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                tab2
                            </div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                tab3
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      </Layout>
    );
  }
}
