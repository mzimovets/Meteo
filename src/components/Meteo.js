const Meteo = () => {
  return (
    <>
      <div className="font-serif">
        <div className="border-container">
          <div className="title">Домашняя метеостанция</div>
          <div style={{ display: "flex" }}>
            <div className="indicators-cards">
              <div className="cards-title">Температура внутри</div>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Температура снаружи</div>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Влажность</div>
              <img src="bublic/dry.png"></img>
            </div>
            <div className="indicators-cards">
              <div className="cards-title">Давление</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Meteo };
