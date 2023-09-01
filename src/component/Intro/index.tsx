import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../common/Button';
import Big_Logo from '../../assets/Big_Logo.png';
import Intro from '../../assets/Intro.png';
import Intro1 from '../../assets/Intro1.png';
import Intro2 from '../../assets/Intro2.png';
import Intro3 from '../../assets/Intro3.png';
import search from '../../assets/search.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { useEffect } from 'react';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  padding-bottom: 35px;

  p {
    font-size: 1rem;
    font-weight: var(--font-regular);
    line-height: 1.3125rem;
    text-align: center;
    margin-bottom: 45px;
  }
`;

const ImgBox = styled.div`
  img {
    width: 80%;
    margin-bottom: 21px;
  }
`;

const Logo = styled.img`
  width: 80%;
  margin-top: 40px;
  margin-bottom: 34px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const HighlightBox = styled.div`
  width: 150%;
  height: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--color-main);
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
  p {
    font-size: 1.25rem;
    font-weight: var(--font-regular);
    line-height: 1.25rem;
    margin-bottom: 6px;
  }
  span {
    font-size: 1.25rem;
    font-weight: var(--font-bold);
    line-height: 1.25rem;
  }
  img {
    width: 21px;
    height: 21px;
    display: inline;
    margin: 0;
    padding-top: 5px;
    box-sizing: border-box;
  }
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 100%;
    margin-bottom: 27px;
  }
  p {
    font-size: 1rem;
    font-weight: var(--font-bold);
    line-height: 1.25rem;
    text-align: center;
  }
`;

const Warning = styled.span`
  font-size: 0.75rem;
  font-weight: var(--font-noraml);
  color: var(--color-danger);
  margin-top: 40px;
  margin-bottom: 26px;
`;

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('visited')) {
      navigate('/home');
    }
  }, [navigate]);

  const onClickBtn = () => {
    localStorage.setItem('visited', 'true');
    navigate('/home');
  };
  return (
    <Wrapper>
      <Logo src={Big_Logo} alt="Logo" />
      <ImgBox>
        <img src={Intro} alt="Intro Image" />
      </ImgBox>
      <p>
        질병, 알러지를 보유하고 있다면 <br /> 특정 음식을 먹어도 되는지, <br />
        먹는다면 얼만큼 먹는 것이 좋은지 <br /> 의문이 들 때가 있습니다.
      </p>
      <HighlightBox>
        <p>그럴 때,</p>
        <span>커넥션을 사용해보세요</span>
      </HighlightBox>
      <IconBox>
        <img src={arrowDown} />
      </IconBox>
      <p>
        커넥션은 사용자의 질병에 근거하여 <br />
        해당 식품의 적합성(위험도)을
        <br />
        알려드리는 역할을 하고 있습니다.
      </p>
      <IntroBox>
        <img src={Intro1} />
        <p>1. 보유 질환, 알러지를 선택하고</p>
      </IntroBox>
      <IntroBox>
        <img src={Intro2} />
        <p>2. 제품의 원재료명 사진을 올리면</p>
      </IntroBox>
      <IntroBox>
        <img src={Intro3} />
        <p>
          3. 첨단 ai가 영양소를 분석하여 <br />
          나에게 맞는 음식인지 알려드릴게요
        </p>
      </IntroBox>

      <HighlightBox>
        <p>나만의 AI 어시스턴트</p>
        <span>
          지금 사용해보세요
          <img src={search} />
        </span>
      </HighlightBox>
      <Warning>
        *AI 분석을 통해 도출된 결과이므로 <br />
        자세한 내용은 전문가와 상담하는 것을 권장합니다.
      </Warning>
      <Button isDisabled={false} onClick={onClickBtn}>
        검사하기
      </Button>
    </Wrapper>
  );
};

export default IntroPage;
