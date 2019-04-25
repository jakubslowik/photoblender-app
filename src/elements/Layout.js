import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import theme from '../config/theme';
import '../components/fonts.css';

let DEBUG = false;
// DEBUG = true; //TURN THIS ON TO DEBUG CSS

const GlobalStyle = createGlobalStyle`
  html{
    min-height: 100vh;
  }
  
  body{
    height: 100%;
    user-select: none!important;
    background: #111519;
  }
  
  h1, h2, h3, h4, h5, h6{
    font-weight: 400!important; //fix for inconsistent firefox bold font rendering
  }
  
  p {
    letter-spacing: 0.015em;
  }

  b {
    font-weight: 800;
    font-family: GilroyBold, sans-serif;
  } 
    
  ${DEBUG ? `
  *:not(path):not(g) {
    color:  hsla(210, 100%, 100%, 1);
    background: hsla(210, 100%,  50%, 0.2);
    outline:  solid 2px hsla(210, 100%, 100%, 0.5);
    box-shadow: none !important;
  }` : ''}
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={siteMetadataQuery}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle/>
          {children}
        </>
      </ThemeProvider>
    )}
  />
);

const siteMetadataQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
