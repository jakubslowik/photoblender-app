import styled from "styled-components";
import theme from "../config/theme";

const Container = styled.div`
  flex: 1;
  margin: 0 auto;
  max-width: 1800px;
  
  @media(max-width: ${theme.breakpoints.xl}){
    max-width: calc((100% - ${theme.rhythm(2)}));
  }
  
  @media(max-width: ${theme.breakpoints.l}){
    max-width: calc((100% - ${theme.rhythm(4)}));
  }
  
  @media(max-width: ${theme.breakpoints.m}){
    max-width: calc((100% - ${theme.rhythm(3)}));
  }
  
  @media(max-width: ${theme.breakpoints.s}){
    max-width: calc((100% - ${theme.rhythm(2)}));
  }
`

export default Container