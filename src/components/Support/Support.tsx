import React, { Component } from 'react';
import { Layout } from '../Layout';
import ReactMarkdown from 'react-markdown/with-html';

type State = {
  content: string | null;
};

export class Support extends Component<{}, State> {
  state: State = {
    content: null,
  };

  componentDidMount = async () => {
    const result = await fetch('/markdowns/Support.md');
    const content = await result.text();
    this.setState({ content });
  };

  render() {
    return (
      <Layout title="Support" breadcrumb={['Home', 'Support']}>
        {this.state.content === null ? (
          'Loading...'
        ) : (
          <ReactMarkdown source={this.state.content} escapeHtml={false} />
        )}
      </Layout>
    );
  }
}
