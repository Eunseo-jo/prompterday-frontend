import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../common/Back';
import Button from '../common/Button';
import Analysis from './Analysis';
import MyDisease from '../common/MyDisease';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  padding: 15px 20px;
  box-sizing: border-box;
  cursor: default !important;
`;

const ResultPage = () => {
  const navigate = useNavigate();

  const list = ['알레르기 비염'];

  return (
    <Wrapper>
      <Header>
        <Back />
        <h1>분석결과</h1>
      </Header>

      <section>
        <UserInfo>
          <MyDisease mode="result" selectedList={list} />
        </UserInfo>
        <Analysis />
      </section>

      <Button isDisabled={false} onClick={() => navigate('/')}>
        처음으로
      </Button>
    </Wrapper>
  );
};

export default ResultPage;
