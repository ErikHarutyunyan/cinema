import styled from 'styled-components';

import { BASE_URL } from '@/configs';

export const HallWrapper = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 100vh;
  font-family: 'Exo 2', sans-serif;
  gap: 50px;
  margin-bottom: 180px;
  margin-top: 80px;
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
`;

export const MoviesContainer = styled.div`
  margin-bottom: 24px;
`;

export const MovieSelect = styled.select`
  appearance: none;
  background: white;
  border-radius: 4px;
  padding: 6px 24px;
  font-size: 14px;
`;

export const ShowCaseContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  padding: 18px 25px;
  background-color: #00000062;
  border-radius: 10px;
  backdrop-filter: blur(10px);

  column-gap: 35px;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    small {
      font-size: 14px;
      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export const SeatIndicator = styled.div`
  display: inline-block;
  & .selected {
    cursor: pointer;
  }
  & .empty {
    cursor: pointer;
    &:hover,
    &:focus {
      g {
        opacity: 1;
        transition: all 0.3s ease-in-out;
      }
      rect:first-child {
        fill: rgb(251, 123, 31);
      }
      rect:last-child {
        fill: rgb(251, 123, 31);
        stroke: black;
      }
    }
  }
`;

export const CinemaContainer = styled.div`
  margin-bottom: 18px;
  perspective: 400px;
  display: grid;
  place-items: center;
  grid-gap: 24px;
`;

export const Screen = styled.div`
  width: 650px;
  height: 350px;
  background: white;
  transform: rotateX(-10deg) scale(1.1);
  box-shadow: 0 3px 10px 2px #ffe7a8;
  background-image: ${(props) => `url(${BASE_URL}/${props.$bg})`};
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Seats = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(8, min-content);
  align-items: center;
  margin-top: 150px;
  transform: scale(1.5);
  margin-bottom: 80px;
`;

export const Seat = styled(SeatIndicator)`
  position: relative;
  top: 1px;
  &:nth-of-type(8n + 2) {
    margin-right: 25px;
  }
  &:nth-of-type(8n + 6) {
    margin-right: 25px;
  }
`;

export const Info = styled.p`
  font-size: 18px;
  span {
    color: #ffc400;
  }
`;
