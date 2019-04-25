import styled from 'styled-components';

const Button = styled.button`
  user-select: none;
  overflow: hidden;
  background: ${props => props.isActive ? "white" : "black"};
  color: ${props => props.isActive ? "black" : "white"};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 0.7rem;
  font-family: GilroyBold,sans-serif;
  padding: ${props => props.withIcon ? "0.5rem 1rem 0.5rem  1.5rem" : "0.5rem 1rem"}; //TODO
  text-align: center;
  //min-width: 125px;
  //max-width: 200px;
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 1px solid rgba(255,255,255,0.15);
  margin-bottom: 3px;
  :hover{
    transition-delay: -0.2s;
    color: ${props => props.isActive ? "#111" : "black"};
    background: ${props => props.isActive ? "#999" : "white"};
  }
  :active{
    transition-delay: -0.35s;
    color: #666;
    background: #ffffff;
  }
  svg{
    margin-bottom: -3px;
    font-size: 125%;
    color: #999;
  }
`

export default Button;
