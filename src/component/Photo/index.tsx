import styled from 'styled-components';
import Back from '../common/Back';
import ImgLoad from './ImgLoad';
import edit from '../../assets/edit.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ValuesRef } from '@/types/photo';
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

  flex: 1;
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
  resize: none;
`;

const PhotoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScan, setIsScan] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isNextButton, setIsNextButton] = useState(true);
  const valuesRef = useRef<ValuesRef | null>(null);
  const inferTextRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const valuesParam = queryParams.get('values');

    if (valuesParam) {
      valuesRef.current = JSON.parse(decodeURIComponent(valuesParam));
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    const { current: inferTextCurrent } = inferTextRef;
    const { current: valuesCurrent } = valuesRef;

    if (!isScan) {
      if (inferTextCurrent && valuesCurrent?.inferText) {
        inferTextCurrent.value += valuesCurrent.inferText.join(',');
        setIsNextButton(false);
      }
    }
    if (inferTextCurrent && valuesCurrent?.inferText && isScan) {
      inferTextCurrent.value = '';
    }
  }, [isScan]);

  const handleEdit = async () => {
    await setIsInputDisabled((prev) => !prev);

    if (inferTextRef.current && isInputDisabled) {
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

  const scanToggle = (state: boolean) => {
    setIsScan(state);
  };

  const inputEmptyCheck = () => {
    if (inferTextRef.current?.value === '') {
      setIsNextButton(true);
    } else {
      setIsNextButton(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Back />
      </Header>

      <ImgLoad isScan={isScan} scanToggle={scanToggle} valuesRef={valuesRef} />

      <InferTextContainer>
        <>
          <InferText
            ref={inferTextRef}
            disabled={isInputDisabled || isScan}
            onChange={inputEmptyCheck}
            placeholder={`성분 뒤에 ,(쉼표)를 넣어주세요`}
          />
          <EditImg src={edit} onClick={handleEdit} />
        </>
      </InferTextContainer>
      <Button
        isDisabled={
          isScan || inferTextRef?.current?.value === undefined || isNextButton
        }
        onClick={onClickNext}
      >
        다음
      </Button>
    </Wrapper>
  );
};

export default PhotoPage;
