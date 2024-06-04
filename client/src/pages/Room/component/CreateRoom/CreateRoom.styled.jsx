import styled from 'styled-components';

export const CreateRoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #000;
  justify-content: space-between;
  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }
  input {
    width: 334px;
    padding: 12px 24px 12px 24px;
    border-radius: 8px;
    border: 3px solid #ff6f00;
    color: #000;
    font-weight: 600;
    background: #000;
    color: #fff;
  }

  button.send {
    width: 176px;
    padding: 12px 24px;
    border: 1px solid transparent;
    color: #ffc226;
    background-color: #000;
    border: 2px solid #ffc226;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.5s ease;
    &:hover {
      color: #fff;
      background-color: #ffc226;
    }
  }
`;
