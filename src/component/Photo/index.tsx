import styled from 'styled-components';
import Back from '../common/Back';
import ImgLoad from './ImgLoad';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Header = styled.nav`
  width: 100%;
`;

const PhotoPage = () => {
  return (
    <Wrapper>
      <Header>
        <Back />
      </Header>

      <ImgLoad />
    </Wrapper>
  );
};

export default PhotoPage;
