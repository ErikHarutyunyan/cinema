import styled from 'styled-components';

export const ConfirmWrapper = styled.div``;

export const ModalContent = styled.div`
  background: black;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 300px;
`;

export const Title = styled.h2`
  color: #ffc107;
  margin-bottom: 20px;
`;

export const Question = styled.p`
  color: white;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #ffc107;
  color: black;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #e0a800;
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #ffc107;
`;
