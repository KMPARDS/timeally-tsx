import React, { ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type LayoutProps = {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  button?: {
    name: string;
    link?: string;
    className?: string;
    // @TODO: Get rid of any
    onClick?: (event: any) => void;
  };
  children?: ReactNode;
};

export function Layout(props: LayoutProps) {
  const { pathname } = window.location;
  const breadcrumb = pathname.split('/');
  if (breadcrumb[breadcrumb.length - 1] === '') {
    breadcrumb.pop();
  }
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-breadcrumb">
                <ol className="breadcrumb">
                  {breadcrumb.map((name, index) => (
                    <li key={index}>
                      <Link
                        to={breadcrumb.slice(0, index + 1).join('/')}
                        className={breadcrumb.length - 1 === index ? 'active' : ''}
                      >
                        {name || 'Home'}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="bg-white pinside30">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                    <h1 className="page-title">{props.title}</h1>
                    {props.subtitle ? <p>{props.subtitle}</p> : null}
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12 text-right">
                    {props.button ? (
                      <>
                        {(() => {
                          const button = (
                            <Button
                              onClick={props.button.onClick}
                              className={props.button.className}
                            >
                              {props.button.name}
                            </Button>
                          );

                          if (props.button.link) {
                            return <Link to={props.button.link}>{button}</Link>;
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
      {props.transparent ? (
        <>{props.children}</>
      ) : (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="wrapper-content bg-white pinside30">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {props.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
