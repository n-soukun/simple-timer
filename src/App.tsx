import { Button } from "./components/Button";
import { TimerDisplay } from "./components/TimerDisplay";
import { useTimer } from "./hooks/useTimer";
import { MdPause, MdPlayArrow, MdReplay } from "react-icons/md";

import alarmSound from "./assets/alarm.mp3";

function App() {
  const timer = useTimer({
    onFinish: () => {
      // ./assets/alarm.mp3を再生
      const audio = new Audio(alarmSound);
      audio.play();
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full h-screen bg-slate-100">
      <TimerDisplay timer={timer} />
      <div className="flex gap-2">
        {timer.state === "start" ? (
          <Button
            startIcon={<MdPause />}
            variant="danger"
            size="lg"
            onClick={() => timer.pause()}
          >
            PAUSE
          </Button>
        ) : timer.state === "pause" ? (
          <Button
            startIcon={<MdPlayArrow />}
            variant="secondary"
            size="lg"
            onClick={() => timer.unpause()}
          >
            RESUME
          </Button>
        ) : (
          <Button
            startIcon={<MdPlayArrow />}
            size="lg"
            onClick={() => timer.start()}
          >
            START
          </Button>
        )}
        <Button
          startIcon={<MdReplay />}
          variant="inverse"
          size="lg"
          onClick={() => timer.stop()}
        >
          RESET
        </Button>
      </div>
    </div>
  );
}

export default App;
