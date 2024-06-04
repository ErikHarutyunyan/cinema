import styled from 'styled-components';

export const RoomWrapper = styled.section`
  .roomCreate {
    margin-top: 50px;
    button {
      width: 176px;
      padding: 12px 24px;
      color: #fff;
      font-size: 16px;
      background:
        linear-gradient(#000000, #000000) padding-box,
        linear-gradient(60deg, #ffc226, #f84119) border-box;
      border: 1px solid transparent;
      border-radius: 5px;
    }
  }
  .roomListContainer {
    padding-bottom: 80px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  button {
    color: #ffc226c3;
    margin: 0 10px;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      color: #ffc226;
    }
  }
`;
