import styled from 'styled-components'
import {FiX} from 'react-icons/fi'

import theme from '../config/theme'

const X = styled(FiX)`
  position: absolute;
  top: ${theme.rhythm(1)};
  right:  ${theme.rhythm(1)};
  font-size: 4rem;
  color: #333;
  color: white;
  cursor: pointer;
  :active, :focus{
    color: ${theme.colors.colorPrimary};
  }
`

export default X