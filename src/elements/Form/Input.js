import styled from "styled-components";
import theme from "../../config/theme";

const Input = styled.input`
  flex: 2;
  border: 1px solid rgba(255,255,255,0.75);
  background: rgba(249,249,252,1);
  font-size: 1rem;
  font-family: GilroyMedium;
  padding: 0.25rem 0.5rem;
  border-radius: 1px;
  box-shadow: ${theme.shadows.input.default};
  transition: all 0.4s ease;
  background: #333;
  color: #afafaf;
`

export default Input;