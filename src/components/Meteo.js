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
              <div className="tempIn">{tempIn} °</div>
              {tempIn > 10.0 ? (
                <img
                  className="tempInUp"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"tempUp.png"}
                />
              ) : (
                <img
                  className="tempInDown"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"tempDown.png"}
                />
              )}
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Температура снаружи</div>
              <div className="tempOut">{tempOut} °</div>
              {tempOut > 10.0 ? (
                <img
                  className="tempOutUp"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"sm-sun.png"}
                />
              ) : (
                <img
                  className="tempOutDown"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"sad-sun.png"}
                />
              )}
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Влажность</div>
              <div className="humidity">{humidity} %</div>
              {humidity > 60 ? (
                <img
                  className="highHum"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"wet.png"}
                />
              ) : (
                <img
                  className="lowHum"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"dry.png"}
                />
              )}
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Давление</div>
              <div className="barPressure">{barPressure} Hg</div>
              {barPressure > 760 ? (
                <img
                  className="highPres"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"high-pres.png"}
                />
              ) : (
                <img
                  className="lowPres"
                  style={{ paddingLeft: "80px", paddingTop: "50px" }}
                  src={"low-pres.png"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Meteo };
