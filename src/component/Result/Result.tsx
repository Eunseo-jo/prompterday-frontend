import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../common/Back';
import Button from '../common/Button';
import Analysis from './Analysis';
import MyDisease from '../common/MyDisease';
import { ResponseItem } from '@/types/common';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  section {
    display: flex;
    flex-direction: column;
    height: 80%;
    flex: 1;
    margin-bottom: 10px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  h1 {
    color: #000;
    text-align: center;
    font-size: 1.25rem;
    font-weight: var(--font-bold);
    flex: 1;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 5px;
  cursor: default !important;
`;

interface ResultProps {
  userDisease: string[];
  resultData: ResponseItem[];
}

const Result = ({ userDisease, resultData }: ResultProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <Back />
        <h1>분석결과</h1>
      </Header>

      <section>
        <UserInfo>
          <MyDisease mode="result" selectedList={userDisease} />
        </UserInfo>
        <Analysis resultData={resultData} />
      </section>

      <Button isDisabled={false} onClick={() => navigate('/')}>
        처음으로
      </Button>
    </Wrapper>
  );
};

export default Result;
