import { useState } from 'react';
import { Howl } from 'howler';

// repurposed this library https://github.com/amrlabib/react-timer-hook
import { Time, Validate } from './react-timer-utils';
import { useInterval } from './react-timer-hooks';

const DEFAULT_DELAY = 1000;
function getDelayFromExpiryTimestamp(expiryTimestamp) {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }

  return DEFAULT_DELAY;
}

export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart = true, expiryCondition = (x) => (x <= 0) }) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(getDelayFromExpiryTimestamp(expiryTimestamp));
  const [playing, setPlaying] = useState(false);
  // note: audio needs to be in the public folder
  var alarm = new Howl({
    src: ['soundbytes/alarmbyteTestBaker.mp3'],
    onend: () => setPlaying(false),
    volume: 0.5
  });
  
  function playAlarm() {
    if (playing || !isRunning) {
      return;
    }

    setPlaying(true);
    alarm.play();
  }

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setDelay(null);
  }

  function pause() {
    setIsRunning(false);
  }

  function restart(newExpiryTimestamp, newAutoStart = true) {
    
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }

  function resume() {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + (seconds * 1000));
    restart(time);
  }

  function start() {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }

  useInterval(() => {
    if (delay !== DEFAULT_DELAY) {
      setDelay(DEFAULT_DELAY);
    }
    
    const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
    setSeconds(secondsValue);
    if (expiryCondition(secondsValue)) {
      handleExpire();
    }

    if (secondsValue < 0) {
      playAlarm();
    }

  }, isRunning ? delay : null);
  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
