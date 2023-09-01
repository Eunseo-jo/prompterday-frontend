import styled from 'styled-components';
import Button from '../common/Button';
import Big_Logo from '../../assets/Big_Logo.png';
import Icon from '../common/Icon';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: keep-all;

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  p {
    display: flex;
    font-size: 1.25rem;
    line-height: 30px;
    text-align: center;
    margin-top: 90px;
    margin-bottom: 100px;
  }
  img {
    width: 80%;
    margin-top: 45px;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  height: 37px;
  display: flex;
  border-bottom: 2px solid var(--color-main);
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <img src={Big_Logo} />
      <p>나의 질환(질병, 알러지)을 검색 후 선택해주세요</p>
      <section>
        <SearchBox onClick={() => navigate('/select')}>
          <Icon icon="search" size={24} />
        </SearchBox>
      </section>

      <Button isDisabled={true} onClick={() => navigate('/select')}>
        다음
      </Button>
    </Wrapper>
  );
};

export default HomePage;
