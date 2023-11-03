import { useCallback, useState } from "react";

export type useTimerProps = {
  sec?: number;
  onFinish?: () => void;
};

export const useTimer = ({
  sec = 60 * 3,
  onFinish = () => undefined,
}: useTimerProps = {}) => {
  const [defaultTime, setDefaultTime] = useState<number>(sec);
  const [time, setTime] = useState<number>(sec);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [state, setState] = useState<"start" | "pause" | "stop">("stop");

  // タイマーを再開する
  const unpauseTimer = useCallback(() => {
    setState("start");
    const id = setInterval(() => {
      console.log(id);
      setTime((t) => {
        const newTime = t - 1;
        if (newTime <= 0) {
          clearInterval(id);
          setTimerId(null);
          setTime(defaultTime);
          setState("stop");
          onFinish();
        }
        return newTime;
      });
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, [defaultTime, onFinish]);

  // タイマーを開始する
  const startTimer = useCallback(() => {
    setTime(defaultTime);
    unpauseTimer();
  }, [defaultTime, unpauseTimer]);

  // タイマーを一時停止する
  const pauseTimer = useCallback(() => {
    clearInterval(timerId ?? undefined);
    setTimerId(null);
    setState("pause");
  }, [timerId]);

  // タイマーを停止する
  const stopTimer = useCallback(() => {
    clearInterval(timerId ?? undefined);
    setTimerId(null);
    setTime(defaultTime);
    setState("stop");
  }, [defaultTime, timerId]);

  return {
    state,
    time,
    defaultTime,
    start: startTimer,
    stop: stopTimer,
    pause: pauseTimer,
    unpause: unpauseTimer,
    setTime,
    setDefaultTime,
  };
};
