import { useState } from "react";
import { WatchCard } from "../WatchCard/Watch";
import "./style.css";

export const Layout = () => {
  const [localCity, setLocalCity] = useState("");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Используем сервис реверсной геокодировки для получения города
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
          );
          let res = await response.json();
          // console.log(res.locality)
          setLocalCity(res.locality);
        } catch (err) {
          console.error("Ошибка при получении города:", err);
        }
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Пользователь запретил доступ к геолокации");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Информация о местоположении недоступна");
            break;
          case error.TIMEOUT:
            console.error(
              "Превышено время ожидания запроса на получение местоположения"
            );
            break;
          default:
            console.error(
              "Произошла ошибка при получении местоположения:",
              error.message
            );
        }
      }
    );
  } else {
    console.error("Геолокация не поддерживается вашим браузером");
  }

  const title = "Secret meeting of the Masons".toUpperCase();

  // Так можно все тайм зоны посмотреть
  // console.log(Intl.supportedValuesOf('timeZone'))
  const timeZones = {
    moscow: {
      timeZoneOffset: "Europe/Moscow",
      locationName: `PUTIN VODKA`,
      cityName: "MOSCOW",
    },
    berlin: {
      timeZoneOffset: "Europe/Berlin",
      locationName: `ORGANIZERS' LOCAL TIME`,
      cityName: "BERLIN",
    },

    local: {
      timeZoneOffset: "",
      locationName: "YOUR LOCAL TIME",
      cityName: `${localCity}`,
    },
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="main-title">{title}</h1>
        <div></div>

        <div className="row watches-container">
          {/* <WatchCard
            timeZoneOffset={timeZones.moscow.timeZoneOffset}
            locationName={timeZones.moscow.locationName}
            cityName={timeZones.moscow.cityName}
          /> */}
          <WatchCard
            timeZoneOffset={timeZones.berlin.timeZoneOffset}
            locationName={timeZones.berlin.locationName}
            cityName={timeZones.berlin.cityName}
          />
          <WatchCard
            timeZoneOffset={timeZones.local.timeZoneOffset}
            locationName={timeZones.local.locationName}
            cityName={timeZones.local.cityName}
          />
        </div>
      </div>
    </div>
  );
};
