import styled from "styled-components";
import theme from "../../config/theme";

const Textarea = styled.textarea`
  border: 1px solid rgba(255,255,255,0.75);
  background: rgba(249,249,252,1);
  font-size: 1.1rem;
  font-family: GilroyMedium, sans-serif;
  padding: 0.75rem;
  overflow: auto;
  min-height: 10rem;
  resize: vertical;
  min-width: 62ch;
  border-radius: 1px;
  box-shadow: ${theme.shadows.input.default};
  margin: 0 ${theme.rhythm(1)} ${theme.rhythm(1)} 0;
  transition: all 0.4s ease;
  color: #333;
  :hover {
    transition-delay: -0.2s;
    //TODO
    box-shadow: ${theme.shadows.input.hover};
  }
  :focus{
    transition-delay: -0.3s;
    box-shadow: ${theme.shadows.input.focus};
    outline: none;
  }
  @media(max-width: ${theme.breakpoints.m}){
    width: 100%;
    border: 1px solid red;
  }
`

export default Textarea;