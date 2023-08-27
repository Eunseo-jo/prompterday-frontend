import styled from 'styled-components';
import Back from '../common/Back';
import ImgLoad from './ImgLoad';
import edit from '../../assets/edit.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ValuesRef } from '@/types/common';
import Button from '../common/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Header = styled.nav`
  width: 100%;
`;

const InferTextContainer = styled.section`
  position: relative;
  width: 100%;
  height: 45%;
  margin: 4%;
`;

const EditImg = styled.img`
  position: absolute;

  right: 2px;
  bottom: 1px;
`;

const InferText = styled.textarea`
  width: 100%;
  height: 100%;

  padding: 10px;
  box-sizing: border-box;

  background-color: white;
  border: 1px solid #12ddce;

  font-size: 0.875rem;
  font-weight: var(--font-bold);
  line-height: 1.25rem;

  word-break: keep-all;
  outline: none;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const PhotoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScan, setIsScan] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const valuesRef = useRef<ValuesRef | null>(null);
  const inferTextRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const valuesParam = queryParams.get('values');

    if (valuesParam) {
      valuesRef.current = JSON.parse(decodeURIComponent(valuesParam));
    } else {
      navigate('/');
    }
  }, []);

  const handleEdit = async () => {
    await setIsDisabled(false);

    if (inferTextRef.current) {
      const textarea = inferTextRef.current;
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  };

  const onClickNext = () => {
    const { current: inferTextCurrent } = inferTextRef;
    const { current: valuesCurrent } = valuesRef;

    if (inferTextCurrent?.value && valuesCurrent?.inferText) {
      valuesCurrent.inferText = inferTextCurrent.value.split(',');
    }

    const values = encodeURIComponent(JSON.stringify(valuesCurrent));
    navigate(`/result?values=${values}`);
  };

  return (
    <Wrapper>
      <Header>
        <Back />
      </Header>

      <ImgLoad
        isScan={isScan}
        setIsScan={setIsScan}
        valuesRef={valuesRef}
        setIsDisabled={setIsDisabled}
      />

      <InferTextContainer>
        {!isScan && valuesRef.current?.inferText !== undefined ? (
          <InferText
            ref={inferTextRef}
            defaultValue={valuesRef.current?.inferText}
            disabled={isDisabled}
          />
        ) : (
          <Container />
        )}
        {!isScan && valuesRef.current?.inferText !== undefined && (
          <EditImg src={edit} onClick={handleEdit} />
        )}
      </InferTextContainer>

      <Button
        isDisabled={isScan || valuesRef.current?.inferText === undefined}
        onClick={onClickNext}
      >
        다음
      </Button>
    </Wrapper>
  );
};

export default PhotoPage;
