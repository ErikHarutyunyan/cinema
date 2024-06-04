import { BannerBackground, BannerWrapper } from './Banner.styled';

const Banner = ({ bg, children }) => {
  return (
    <BannerWrapper>
      <BannerBackground $bg={bg}>{children}</BannerBackground>
    </BannerWrapper>
  );
};

export default Banner;
