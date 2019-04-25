import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
`;

const Layer = ({ bgStyle }) => (
  <StyledWrapper style={bgStyle}>
  </StyledWrapper>
);

export default Layer;