import styled from 'styled-components';

export const RoomSingleWrapper = styled.section`
  .roomInfo {
    display: inline-block;
    margin-top: 80px;
    position: relative;
    .roomTile {
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      background: none;
      &.edit {
        padding: 12px 24px 12px 24px;
        border-radius: 8px;
        border: 3px solid #ff6f00;
      }
    }
    .icon {
      &.edit {
        position: absolute;
        top: -30px;
        left: -30px;
      }
      &.check {
        position: absolute;
        top: 30%;
        right: -80px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      &Edit {
        .icon {
          position: absolute;
          top: -10px;
          right: 0px;
        }
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .movieCreate {
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
  .movieListContainer {
    padding-bottom: 80px;
  }
`;
