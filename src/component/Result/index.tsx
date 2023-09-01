import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseItem } from '@/types/common';
import LoadingPage from '../Loading';
import Result from './Result';
import { getResult } from '@/api/getResult';

const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userDisease, setUserDisease] = useState<string[] | null>(null);
  const [resultData, setResultData] = useState<ResponseItem[]>();
  const [percentage, setPercentage] = useState(0);
  const [intervalTime, setIntervalTime] = useState(350);

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
    const randomStop = getRandomNumberInRange(50, 70);
    let requestId: number;

    const updatePercentage = () => {
      if (percentage < 50) {
        setPercentage((prev) => prev + 1);
      } else if (percentage >= 50 && percentage < randomStop) {
        setIntervalTime(getRandomNumberInRange(200, 500));
        setPercentage((prev) => prev + 1);
      } else if (percentage === randomStop) {
        setTimeout(() => {
          setPercentage((prev) => prev + 1);
        }, getRandomNumberInRange(1000, 5000));
      } else if (resultData && userDisease && percentage < 100) {
        setIntervalTime(150);
        setPercentage((prev) => prev + 1);
      }

      if (percentage < 100) {
        requestId = requestAnimationFrame(updatePercentage);
      } else {
        cancelAnimationFrame(requestId);
      }
    };

    updatePercentage();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [percentage, resultData, userDisease, intervalTime]);

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
