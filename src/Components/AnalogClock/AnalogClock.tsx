import "./style.css";

interface AlnalogClock {
  hours: number;
  minutes: number;
  seconds: number;
}

export const AnalogClock = ({ hours, minutes, seconds }: AlnalogClock) => {
  let arrayOfHours = [];
  let arrayOfMinutes = [];

  const amountOfHours = 12;
  const amountOfMinutes = 60;

  for (let i = 1; i <= amountOfHours; i++) {
    arrayOfHours.push(i);
  }

  for (let i = 1; i <= amountOfMinutes; i++) {
    arrayOfMinutes.push(i);
  }

  return (
    <div className="clock-wrapper">
      <div className="number-hours">
        {arrayOfHours.map((item, index) => (
          <span
            key={index}
            style={{ transform: `rotate(${(index + 1) * 30}deg)` }} // 360deg / 12 = 30deg
          >
            <p style={{ transform: `rotate(${(index + 1) * -30}deg)` }}></p>
          </span>
        ))}
      </div>
      <div className="bar-seconds">
        {arrayOfMinutes.map((item, index) => (
          <span
            key={index}
            style={{ transform: `rotate(${(index + 1) * 6}deg)` }} // 360deg / 60 = 6deg
          >
            <p></p>
          </span>
        ))}
      </div>
      <div className="hands-box">
        <div
          className="hand hours"
          style={{ transform: `rotate(${hours * 30 + minutes / 2}deg)` }}
        >
          <i></i>
        </div>
        <div
          className="hand minutes"
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        >
          <i></i>
        </div>
        <div
          className="hand seconds"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        >
          <i></i>
        </div>
      </div>
    </div>
  );
};
