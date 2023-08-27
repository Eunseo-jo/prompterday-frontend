import styled from 'styled-components';
import Back from '../common/Back';
import ImgLoad from './ImgLoad';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ValuesRef } from '@/types/photo';

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
  const location = useLocation();
  const navigate = useNavigate();
  const valuesRef = useRef<ValuesRef | null>(null);
  const queryParams = new URLSearchParams(location.search);

  const valuesParam = queryParams.get('values');

  if (valuesParam) {
    valuesRef.current = JSON.parse(decodeURIComponent(valuesParam));
    console.log(valuesRef.current);
  } else {
    navigate('/');
  }

  return (
    <Wrapper>
      <Header>
        <Back />
      </Header>

      <ImgLoad valuesRef={valuesRef} />
    </Wrapper>
  );
};

export default PhotoPage;
