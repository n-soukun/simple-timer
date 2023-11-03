import { Button } from "./components/Button";
import { TimerDisplay } from "./components/TimerDisplay";
import { useTimer } from "./hooks/useTimer";
import { HiPause, HiPlay, HiArrowUturnLeft } from "react-icons/hi2";

function App() {
  const timer = useTimer();

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full h-screen bg-slate-100">
      <TimerDisplay timer={timer} />
      <div className="flex gap-2">
        {timer.state === "start" ? (
          <Button
            startIcon={<HiPause />}
            variant="danger"
            size="lg"
            onClick={() => timer.pause()}
          >
            PAUSE
          </Button>
        ) : timer.state === "pause" ? (
          <Button
            startIcon={<HiPlay />}
            variant="secondary"
            size="lg"
            onClick={() => timer.unpause()}
          >
            RESUME
          </Button>
        ) : (
          <Button
            startIcon={<HiPlay />}
            size="lg"
            onClick={() => timer.start()}
          >
            START
          </Button>
        )}
        <Button
          startIcon={<HiArrowUturnLeft />}
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
