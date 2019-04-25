import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.a`
  text-decoration: none;
`

const Anchor = ({children, href, style}) => (
  <StyledWrapper style={style} href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </StyledWrapper>
)

export default Anchor;