import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const uniqueDates = new Set();

  return (
    <div
      style={{
        backgroundColor: "DeepSkyBlue",
        color: "black",
        borderRadius: "0.5rem",
        width: "300px",
        paddingLeft: "15px",
        paddingRight: '15px',
        paddingTop: "15px",
        paddingBottom: "5px",
      }}
    >
      {forecastData.list.filter(item => {
        const date = formatDate(item.dt_txt);
        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          return true;
        }
        return false;
      }).slice(0, 5).map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {Math.round(item.main.temp)}°C
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {formatDate(item.dt_txt)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px" }}>
              {item.weather[0].description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
