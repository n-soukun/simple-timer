import { useCallback, useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import clsx from "clsx";

function secToTime(sec: number) {
  const s = sec % 60;
  const min = Math.floor(sec / 60) % 60;
  const hour = Math.floor(sec / 3600);

  const z = (n: number) => String(n).padStart(2, "0");

  let text: string;
  if (hour > 0) {
    text = `${hour}:${z(min)}:${z(s)}`;
  } else if (min > 0 && !hour) {
    text = `${min}:${z(s)}`;
  } else {
    text = `${s}`;
  }

  return text;
}

function textToSec(text: string) {
  const [sec = 0, min = 0, hour = 0] = text.split(":").map(Number).reverse();
  const result = sec + min * 60 + hour * 3600;
  return result;
}

export type TimerDisplayProps = {
  timer: ReturnType<typeof useTimer>;
};

export const TimerDisplay = ({ timer }: TimerDisplayProps) => {
  const [timerText, setTimerText] = useState<string>("0");

  useEffect(() => {
    if (timer.state === "stop") {
      setTimerText(secToTime(timer.defaultTime));
    } else if (timer.state === "pause") {
      setTimerText(secToTime(timer.time));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.state]);

  useEffect(() => {
    // ローカルストレージからデフォルトタイムを取得
    const defaultTime = localStorage.getItem("defaultTime");
    if (defaultTime !== null) {
      const sec = Number(defaultTime);
      setTimerText(secToTime(sec));
      timer.setDefaultTime(sec);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      // ローカルストレージにデフォルトタイムを保存
      localStorage.setItem("defaultTime", String(timer.defaultTime));
      if (timer.state === "start") {
        e.preventDefault();
        e.returnValue = "";
      }
      return undefined;
    },
    [timer.defaultTime, timer.state]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.defaultTime, timer.state]);

  // タイマーの状態によって表示するテキストを変更
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerText(e.target.value);
    if (timer.state === "stop") {
      timer.setDefaultTime(textToSec(e.target.value));
    } else if (timer.state === "pause") {
      timer.setTime(textToSec(e.target.value));
    }
  };

  return (
    <div
      className={clsx(
        "text-8xl text-slate-950 font-bold md:text-[9rem] lg:text-[12rem] drop-shadow-lg transition-colors",
        {
          "bg-gradient-to-br from-yellow-400 to-red-500 bg-clip-text text-transparent":
            timer.state !== "stop"
              ? timer.time >= 10 && timer.time < 60
              : false,
        },
        {
          "bg-gradient-to-br from-red-500 to-pink-800 bg-clip-text text-transparent":
            timer.state !== "stop" ? timer.time < 10 : false,
        }
      )}
    >
      {timer.state === "start" ? (
        secToTime(timer.time)
      ) : (
        <input
          className="bg-transparent text-center w-auto h-24 md:h-36 lg:h-48 focus:outline-none"
          type="text"
          value={timerText}
          onChange={onChangeTime}
        />
      )}
    </div>
  );
};
