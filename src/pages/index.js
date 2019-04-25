import React from 'react';

import {
  SEO,
  Layout,
} from '../elements'

import {
  App,
} from '../components'

const IndexPage = () => {
  return (
    <div>
      <Layout>
        <SEO title="Photoblender app" keywords={[`css`, `filters`, `photoblender`, `mixing`, `photos`, `app`]}/>
        <App/>
      </Layout>
    </div>
  )
};

export default IndexPage;
