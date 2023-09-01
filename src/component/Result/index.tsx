import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseItem } from '@/types/common';
import LoadingPage from '../Loading';
import Result from './Result';
import { getResult } from '@/api/getResult';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userDisease, setUserDisease] = useState<string[] | null>(null);
  const [resultData, setResultData] = useState<ResponseItem[]>();

  const [percentage, setPercentage] = useState(0);
  const [intervalTime, setIntervalTime] = useState(250);

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
    const timer = setInterval(() => {
      if (percentage < 50) {
        setPercentage((prev) => prev + 1);
      } else if (percentage < 90) {
        setIntervalTime(200);
        setPercentage((prev) => prev + 1);
      } else if (resultData && userDisease && percentage < 100) {
        setIntervalTime(150);
        setPercentage((prev) => prev + 1);
      }
    }, intervalTime);

    return () => clearInterval(timer);
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
