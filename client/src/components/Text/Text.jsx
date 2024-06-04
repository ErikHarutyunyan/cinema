import { TextWrapper } from './Text.styled';

const Text = ({ title, subTitle, className }) => {
  return (
    <TextWrapper className={className}>
      {title && <h1>{title}</h1>}
      {subTitle && <h2>{subTitle}</h2>}
    </TextWrapper>
  );
};

export default Text;
