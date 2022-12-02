import {useEffect, useState} from 'react';

type returnValues = [number, number, number, number, number];

export const useCountdown = (targetDate: Date, isBetsopen: boolean): returnValues => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [countDownDate]);
  if (!isBetsopen) return [0, 0, 0, 0, 0];

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): returnValues => {
  // calculate time left
  const totalSecondsLeft = countDown;
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [totalSecondsLeft, days, hours, minutes, seconds];
};
