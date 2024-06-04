import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  background: linear-gradient(90deg, rgb(0 0 0 / 85%) 40%, rgb(28, 28, 1) 50%, rgb(0 0 0 / 85%) 60%);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgb(255, 194, 38);
  border-top: 1px solid #ffc226;
  box-shadow: rgb(255, 194, 38) 0px 0px 5px 0px;
  padding: 0px 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  height: 70px;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Logo = styled(Link)`
  cursor: pointer;
  padding: 20px;
  color: white;
  text-decoration: none;
  width: auto;
  max-width: 200px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 7px;
  text-transform: uppercase;
`;
