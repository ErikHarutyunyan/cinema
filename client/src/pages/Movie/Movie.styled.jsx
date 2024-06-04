import styled from 'styled-components';

import { BASE_URL } from '@/configs';

export const MovieWrapper = styled.section`
  .movie {
    &-content {
      align-items: flex-start;
      display: flex;
      justify-content: flex-start;
      margin-left: auto;
      margin-right: auto;
      margin-top: -300px;
      margin-bottom: 200px;
      max-width: 1260px;
      padding: 65px;
      position: relative;
      background-color: #0000009c;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      &__edit {
        position: absolute;
        top: 20px;
        right: 30px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      &__poster {
        flex: 1 1;
        position: relative;
        &__img {
          background-image: ${(props) => `url(${BASE_URL}/${props.$bg})`};
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          padding-top: 165%;
          border: 2px solid transparent;
          border-image: linear-gradient(60deg, #ffc226, #f84119) 1 stretch;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          mask-image: radial-gradient(circle, white 100%, black 100%);
          border-radius: 4px;
          overflow: hidden;
        }
      }
      &__info {
        padding-left: 2rem;
        position: relative;
        width: 70%;
        & > * {
          margin-bottom: 2rem;
        }
        .title {
          font-size: 4rem;
          line-height: 1;
        }
        .action {
          position: relative;
          margin-top: 50px;
          &__item {
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
      }
    }
  }
`;
