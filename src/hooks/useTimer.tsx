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
  const [timmerId, setTimmerId] = useState<number | null>(null);
  const [state, setState] = useState<"start" | "pause" | "stop">("stop");

  const pauseTimer = useCallback(() => {
    setState("pause");
    if (timmerId) {
      clearInterval(timmerId);
      setTimmerId(null);
    }
  }, [timmerId]);

  const stopTimer = useCallback(() => {
    pauseTimer();
    setTime(defaultTime);
    setState("stop");
  }, [defaultTime, pauseTimer]);

  const finishTimer = useCallback(() => {
    stopTimer();
    onFinish();
  }, [onFinish, stopTimer]);

  const unpauseTimer = useCallback(() => {
    setState("start");
    const id = setInterval(() => {
      setTime((t) => {
        const newTime = t - 1;
        if (newTime <= 0) finishTimer();
        return newTime;
      });
    }, 1000);
    setTimmerId(id);
    return () => clearInterval(id);
  }, [finishTimer]);

  const startTimer = useCallback(() => {
    setTime(defaultTime);
    unpauseTimer();
  }, [defaultTime, unpauseTimer]);

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
