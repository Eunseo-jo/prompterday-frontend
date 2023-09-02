import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseItem } from '@/types/common';
import LoadingPage from '../Loading';
import Result from './Result';
import { getResult } from '@/api/getResult';

const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomStop = getRandomNumberInRange(50, 70);
const randomWait = getRandomNumberInRange(3000, 6000);
const randomTime = getRandomNumberInRange(200, 500);

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userDisease, setUserDisease] = useState<string[] | null>(null);
  const [resultData, setResultData] = useState<ResponseItem[]>();
  const [percentage, setPercentage] = useState(0);
  //const [intervalTime, setIntervalTime] = useState(350);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const valuesString = queryParams.get('values');
    if (valuesString !== null) {
      try {
        const values = JSON.parse(decodeURIComponent(valuesString));
        setUserDisease(values.disease);
        (async () => {
          const response = await getResult(values);
          setResultData(response);
        })();
      } catch (error) {
        console.error(
          'Error parsing query string "values" in result page:',
          error,
        );
      }
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null;

    if (!isPaused && percentage < 100) {
      timer = setInterval(
        () => {
          if (percentage < randomStop) {
            setPercentage((prev) => (prev < randomStop ? prev + 1 : prev));
          } else if (percentage === randomStop && !isPaused) {
            setIsPaused(true);
            clearInterval(timer!);

            setTimeout(() => {
              setIsPaused(false);
            }, randomWait);
          } else if (percentage >= randomStop && !isPaused && percentage < 90) {
            setPercentage((prev) => (prev < 100 ? prev + 1 : prev));
          } else if (percentage < 90) {
            if (resultData && userDisease) {
              setPercentage((prev) => (prev < 100 ? prev + 1 : prev));
            }
          } else if (resultData && userDisease && percentage < 100) {
            setPercentage((prev) => (prev < 100 ? prev + 1 : prev));
          }
        },
        percentage >= 50 && percentage < randomStop ? randomTime : 150,
      );
    }

    return () => clearInterval(timer!);
  }, [isPaused, percentage, resultData, userDisease]);

  useEffect(() => {
    if (!isPaused && percentage === randomStop) {
      setPercentage(randomStop + 1);
    }
  }, [isPaused]);

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
