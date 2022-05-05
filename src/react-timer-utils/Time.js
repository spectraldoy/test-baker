function round(val) {
  // rounding that accounts for negative numbers
  return Math.sign(val) * Math.round(Math.abs(val))
}

function floor(val) {
  return Math.sign(val) * Math.floor(Math.abs(val))
}

export default class Time {
  static getTimeFromSeconds(secs) {
    const totalSeconds = round(secs)
    const days = floor(totalSeconds / (60 * 60 * 24));
    const hours = floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = floor((totalSeconds % (60 * 60)) / 60);
    const seconds = floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getSecondsFromExpiry(expiry, shouldRound) {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    const val = milliSecondsDistance / 1000;
    return shouldRound ? round(val) : val;
  }

  static getSecondsFromPrevTime(prevTime, shouldRound) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? round(val) : val;
    }
    return 0;
  }

  static getSecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = (now.getTimezoneOffset() * 60);
    return (currentTimestamp / 1000) - offset;
  }

  static getFormattedTimeFromSeconds(totalSeconds, format) {
    const { seconds: secondsValue, minutes, hours } = Time.getTimeFromSeconds(totalSeconds);
    let ampm = '';
    let hoursValue = hours;

    if (format === '12-hour') {
      ampm = hours >= 12 ? 'pm' : 'am';
      hoursValue = hours % 12;
    }

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }
}
