import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type LayoutProps = {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  breadcrumb: string[];
  button?: {
    name: string;
    link?: string;
    className?: string;
    // @TODO: Get rid of any
    onClick?: (event: any) => void;
  };
};

export class Layout extends Component<LayoutProps> {
  render = () => (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-breadcrumb">
                <ol className="breadcrumb">
                  {this.props.breadcrumb.map((name, index) => (
                    <li className={this.props.breadcrumb.length - 1 === index ? 'active' : ''}>
                      {name}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="bg-white pinside30">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                    <h1 className="page-title">{this.props.title}</h1>
                    {this.props.subtitle ? <p>{this.props.subtitle}</p> : null}
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                    {this.props.button ? (
                      <>
                        {(() => {
                          const button = (
                            <Button
                              onClick={this.props.button.onClick}
                              className={this.props.button.className}
                            >
                              {this.props.button.name}
                            </Button>
                          );

                          if (this.props.button.link) {
                            return <Link to={this.props.button.link}>{button}</Link>;
                          } else {
                            return button;
                          }
                        })()}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          {this.props.transparent ? (
            <>{this.props.children}</>
          ) : (
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="wrapper-content bg-white pinside10">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
