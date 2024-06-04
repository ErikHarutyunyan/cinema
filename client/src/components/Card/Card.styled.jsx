import styled from 'styled-components';

import { BASE_URL } from '@/configs';

export const CardBox = styled.div`
  width: 100%;
  background-image: ${(props) => `url(${BASE_URL}/${props.$bg})`};
  padding-top: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .remove {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 30px;
    z-index: 6;
    &:hover {
      opacity: 0.8;
    }
    path {
      stroke: #f93030;
    }
  }

  &:hover {
    .movieTitle {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .title {
    max-width: 220px;
    width: 100%;
    margin: 0 auto;
  }
  .movieTitle {
    position: relative;
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    background-color: #000000c6;
    /* opacity: 0; */
    /* transform: translateY(-100%); */
    transition: all 0.6s ease-in-out;
    .remove {
      top: calc(100% - 33px);
      left: calc(0% + 10px);
    }
  }
  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 20px;
  }
  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    background:
      linear-gradient(#000000, #000000) padding-box,
      linear-gradient(60deg, #ffc226, #f84119) border-box;
    border: 1px solid transparent;
    width: 130px;
    height: 110px;
    border-radius: 18px 0px 0px 18px;
    transform: translateX(+100%);
    transition: transform 0.8s ease-in-out;
    p {
      margin-top: 25px;
      color: #fff;
      font-weight: 600;
      font-size: 17px;
    }
    .number {
      display: flex;
      color: #fff;
      font-weight: 600;
      align-items: center;
      justify-content: center;
      width: 130px;
      height: 45px;
      border-radius: 18px 0px 0px 18px;
      background:
        linear-gradient(#323232, #000000) padding-box,
        linear-gradient(60deg, #f84119, #f84119) border-box;
      border: 1px solid transparent;
      margin-top: auto;
    }
    bottom: 20px;
    right: 0;
    gap: 0px;
  }
`;

export const CardWrapper = styled.div`
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  position: relative;
  background:
    linear-gradient(#000000, #000000) padding-box,
    linear-gradient(60deg, #ffc226, #f84119) border-box;
  border: 1px solid transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transform: translateY(0%);
  transition: all 0.5s ease-in-out;

  &:hover {
    box-shadow: 1px 1px 24px 2px #afafaf73;
    transform: translateY(-20px);
    .cardBox {
      .quantity {
        transform: translateX(0%);
      }
    }
  }
`;
