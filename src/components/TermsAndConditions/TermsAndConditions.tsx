import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Renderer } from '../Markdown';

export class TermsAndConditions extends Component {
  render() {
    return (
      <Layout title="Terms And Conditions">
        <Renderer file="TermsAndConditions.md" />
      </Layout>
    );
  }
}
