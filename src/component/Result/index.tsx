import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseItem } from '@/types/common';
import LoadingPage from '../Loading';
import Result from './Result';
import { getResult } from '@/api/getResult';

const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomStop = getRandomNumberInRange(50, 70);
const randomWait = getRandomNumberInRange(3000, 5000);
const randomTime = getRandomNumberInRange(350, 500);

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userDisease, setUserDisease] = useState<string[] | null>(null);
  const [resultData, setResultData] = useState<ResponseItem[]>();
  const [percentage, setPercentage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const valuesString = queryParams.get('values');
    if (valuesString !== null) {
      try {
        const values = JSON.parse(decodeURIComponent(valuesString));
        setUserDisease(values.disease);
        (async () => {
          try {
            const response = await getResult(values);
            if (response) setResultData(response);
          } catch (error) {
            console.error('API Error:', error);
            alert('결과 요청 실패');
            navigate(
              `/select/photo?values=${encodeURIComponent(
                JSON.stringify(values),
              )}`,
            );
          }
        })();
      } catch (error) {
        console.error(
          'Error parsing query string "values" in result page:',
          error,
        );
      }
    } else {
      navigate('/home', { replace: true });
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null;

    const incrementPercentage = () => {
      setPercentage((prev) => (prev < 100 ? prev + 1 : prev));
    };

    if (!isPaused && percentage < 100) {
      timer = setInterval(
        () => {
          if (percentage < randomStop) {
            incrementPercentage();
          } else if (percentage === randomStop && !isPaused && !resultData) {
            clearInterval(timer!);
            setIsPaused(true);
          } else if (percentage > randomStop && !isPaused && percentage < 90) {
            incrementPercentage();
          } else if (percentage < 90 && !resultData) {
            if (resultData && userDisease) {
              incrementPercentage();
            }
          } else if (resultData && userDisease && percentage < 100) {
            incrementPercentage();
          }
        },
        percentage >= 50 && percentage < randomStop && !resultData
          ? randomTime
          : 200,
      );
    }

    return () => clearInterval(timer!);
  }, [isPaused, percentage, resultData, userDisease]);

  useEffect(() => {
    if (!isPaused && percentage === randomStop) {
      setTimeout(() => {
        setPercentage(randomStop + 1);
        setIsPaused(false);
      }, randomWait);
    }
  }, [isPaused, percentage]);

  return (
    <>
      {percentage === 100 && resultData && userDisease ? (
        <Result userDisease={userDisease} resultData={resultData} />
      ) : (
        <LoadingPage percentage={percentage} />
      )}
    </>
  );
};

export default ResultPage;
