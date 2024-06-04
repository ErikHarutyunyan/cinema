import styled from 'styled-components';

export const BackWrapper = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 35px;
    color: #e3ad23;
    transition: all 0.3s ease-in-out;
    opacity: 0.8;
    font-weight: 600;
    &:hover {
      opacity: 1;
      color: #ffbf1d;
    }
  }
`;
