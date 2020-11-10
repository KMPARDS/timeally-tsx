import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class LayoutPET extends Component {
  render = () => (
    <div>
        <div className="page-header-pet">
              <div className="container">
                <div className="row">
                  {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        {this.props.breadcrumb.map((name, index) => (
                          <li className={this.props.breadcrumb.length - 1 === index ? 'active' : ''}>{name}</li>
                        ))}
                      </ol>
                    </div>
                  </div> */}
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="pinside30">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <h1 className="page-title-pet">{this.props.title}</h1>
                          {this.props.subtitle ? <p className="page-subtitle-pet">{this.props.subtitle}</p> : null}
                        </div>
                        
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                        {this.props.buttonName ? <Button className="custom-button" onClick={this.props.buttonOnClick}>{this.props.buttonName}</Button> : null}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        <div className="background-bones">
        <div className="container">
      {this.props.transparent
        ? <>{this.props.children}</>
        : <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="wrapper-content remove-boxshadow bg-white">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>

        </div>
     </div>
  );
}

export default LayoutPET;
