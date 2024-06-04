import { useNavigate } from 'react-router-dom';

import { BackWrapper } from './Back.styled';

const Back = ({ path, style, className }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const url = typeof path === 'string' ? `${path}` : path;
    navigate(url);
  };

  return (
    <BackWrapper>
      <button onClick={handleGoBack} style={style} className={className}>
        {'<'} Back
      </button>
    </BackWrapper>
  );
};

export default Back;
