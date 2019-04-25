import styled from "styled-components";
import theme from "../../config/theme";

const FormSection = styled.div`
  display: flex;
  margin-bottom: ${theme.rhythm(1)};
  @media(max-width: ${theme.breakpoints.l}){
    flex-direction:column;
  }
`

export default FormSection;