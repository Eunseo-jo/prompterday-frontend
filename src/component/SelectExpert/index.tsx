import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../common/Back';
import Button from '../common/Button';
import Icon from '../common/Icon';
import nutritionist from '../../assets/nutritionist.png';
import chemist from '../../assets/chemist.png';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
  h1 {
    text-align: center;
    position: relative;
    svg {
      position: absolute;
      top: 2px;
      right: 0px;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 0%;
  cursor: pointer;
`;

const ImageBox = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 13px 20px;
  border-radius: 10px;
  color: ${(props) => (props.selected ? 'black' : 'var(--color-sub-2)')};
  box-shadow: ${(props) =>
    props.selected ? '1px 1px 4px 1px rgba(0,0,0,0.25)' : 'none'};
  margin-bottom: 10px;
  p {
    display: flex;
    justify-content: center;
  }
`;

let values: string[];
const SelectExpert = () => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const valuesString = queryParams.get('values');

    if (valuesString !== null) {
      try {
        values = JSON.parse(decodeURIComponent(valuesString));
      } catch (error) {
        console.error('Error parsing query string "values":', error);
      }
    } else {
      navigate('/select', { replace: true });
    }
  }, []);

  const onClickNext = () => {
    const data = {
      ...values,
      option: selected,
    };
    const newValues = encodeURIComponent(JSON.stringify(data));
    navigate(`/select/photo?values=${newValues}`);
  };

  const onClickImageBox = (value: string) => {
    setSelected(value);
  };
  return (
    <Wrapper>
      <Header>
        <BackIcon>
          <Back />
        </BackIcon>
        <Icon
          icon="smallLogo"
          color="var(--color-main)"
          size={42}
          height={20}
        />
      </Header>
      <section>
        <h1>
          누구에게 물어볼까요?
          <Icon icon="detail" size={22} color="var(--color-main)" />
        </h1>
        <ImageBox
          onClick={() => onClickImageBox('NUTRITIONIST')}
          selected={selected === 'NUTRITIONIST'}
        >
          <img src={nutritionist} />
          <p>영양사(식품)</p>
        </ImageBox>
        <ImageBox
          onClick={() => onClickImageBox('CHEMIST')}
          selected={selected === 'CHEMIST'}
        >
          <img src={chemist} />
          <p>약사(의약품)</p>
        </ImageBox>
      </section>
      <Button isDisabled={selected === ''} onClick={onClickNext}>
        다음
      </Button>
    </Wrapper>
  );
};

export default SelectExpert;
