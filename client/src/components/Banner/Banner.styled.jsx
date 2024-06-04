import styled from 'styled-components';

export const BannerWrapper = styled.div`
  width: 100%;
  height: 600px;
`;

export const BannerBackground = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(${(props) => props.$bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  &:after,
  &:before {
    content: '';
    left: 0;
    position: absolute;
    width: 100%;
  }
  &::after {
    background-image: linear-gradient(0deg, #191713b3, #19171303);
    bottom: 0;
    height: 100px;
  }
  &::before {
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    top: 0;
  }
  .bannerText {
    position: absolute;
    bottom: 15%;
    left: 3%;
    z-index: 1;
  }
`;
