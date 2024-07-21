import { useEffect, useState } from "react";
import { AnalogClock } from "../AnalogClock/AnalogClock";
import "./style.css";

interface GreenWich {
  locationName: string;
  cityName: string;
  timeZoneOffset: string;
}

export const WatchCard = ({
  locationName,
  cityName,
  timeZoneOffset,
}: GreenWich) => {
  if (!timeZoneOffset) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timeZoneOffset = timeZone;
  }

  const now = new Date();
  const utcDate = now.toLocaleString("en-US", {
    timeZone: `${timeZoneOffset}`,
  });

  const [time, setTime] = useState(utcDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-US", {
          timeZone: `${timeZoneOffset}`,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  let parts = time.split(/[\/, :]/);

  let month = parseInt(parts[0], 10);
  let day = parseInt(parts[1], 10);
  let year = parseInt(parts[2], 10);
  let hours = parseInt(parts[4], 10);
  let minutes = parseInt(parts[5], 10);
  let seconds = parseInt(parts[6], 10);
  let ampm = parts[7];

  return (
    <div className="greenwich-wrapper">
      <div className="greenwich-wrapper__inner">
        <div className="greenwich-wrapper__watch">
          <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
        </div>
        <div className="greenwich-wrapper__timer-wrapper">
          <span>{`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</span>
          <span className="greenwich-wrapper__ampm">{ampm}</span>
        </div>
        <p className="greenwich-wrapper__location-name">{locationName}</p>
        <h2 className="greenwich-wrapper__country-name">
          {cityName || timeZoneOffset.split("/")[1].toUpperCase()}
        </h2>
        <div className="greenwich-wrapper__data-wrapper">
          <span>{day}</span>
          <span>/</span>
          <span>{month}</span>
          <span>/</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
};
