import { HeaderWrapper, Logo } from './Header.styled';
import { HOME } from '@/router/Main/paths';

const Header = () => {
  return (
    <header>
      <HeaderWrapper>
        <Logo to={HOME}>Cinema</Logo>
      </HeaderWrapper>
    </header>
  );
};

export default Header;
