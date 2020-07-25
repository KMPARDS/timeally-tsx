import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Renderer } from '../Markdown';

export class Support extends Component {
  render() {
    return (
      <Layout title="Support">
        <Renderer file="Support.md" />
      </Layout>
    );
  }
}
