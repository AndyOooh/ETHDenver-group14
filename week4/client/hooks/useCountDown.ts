import {useEffect, useState} from 'react';

type CountDown = {
  totalSecondsLeft: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const useCountDown = (deadline: Date | undefined): CountDown | null => {
  console.log('🚀  file: useCountDown.ts:11  deadline', deadline);
  const [time, setTime] = useState<CountDown | null>(null);

  useEffect(() => {
    // console.log('useEffect');
    const timer = setTimeout(() => {
      if (!deadline) return; // satisfy TS
      setTime(calculateTimeLeft(deadline));
    }, 1000);
    if (time?.totalSecondsLeft && time.totalSecondsLeft <= 0) {
      clearTimeout(timer);
    }
    return (): void => clearTimeout(timer);
  });

  const calculateTimeLeft = (_deadline: Date): CountDown | null => {
    // console.log('calculateTimeLeft');
    const secondsLeft = new Date(_deadline).getTime() - Date.now();
    // console.log('🚀  file: useCountDown.ts:27  secondsLeft', secondsLeft);
    let timeLeft = null;

    // if (secondsLeft > 0) {
    timeLeft = {
      totalSecondsLeft: secondsLeft,
      days: Math.floor(secondsLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((secondsLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((secondsLeft / 1000 / 60) % 60),
      seconds: Math.floor((secondsLeft / 1000) % 60)
    };
    // }
    return timeLeft;
  };

  console.log('returning...');

  return time ? time : null;
};
