import { useEffect, useState } from "react";

const Meteo = (props) => {
  const [tempIn, setTempIn] = useState("-");
  const [tempOut, setTempOut] = useState("-");
  const [humidity, setHumidity] = useState("-");
  const [barPressure, setBarPressure] = useState("-");

  useEffect(() => {
    prepareMqttData();
  }, [props.mqttData]);

  const prepareMqttData = () => {
    const paramValue = props.mqttData?.split(" ");
    if (paramValue?.length === 2) {
      if (paramValue[0] === "ti") {
        setTempIn(paramValue[1]);
      } else if (paramValue[0] === "to") {
        setTempOut(paramValue[1]);
      } else if (paramValue[0] === "hi") {
        setHumidity(paramValue[1]);
      } else {
        setBarPressure(paramValue[1]);
      }
    }
  };

  return (
    <>
      <div className="font-serif">
        <div className="border-container">
          <div className="title">Домашняя метеостанция</div>
          <div style={{ display: "flex" }}>
            <div className="indicators-cards">
              <div className="cards-title">Температура внутри</div>
              <div>{tempIn}°</div>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Температура снаружи</div>
              <div>{tempOut}°</div>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Влажность</div>
              <div>{humidity}%</div>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Давление</div>
              <div>{barPressure}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Meteo };
