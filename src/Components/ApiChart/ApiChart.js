import { useEffect } from "react";
import { Chart } from "react-google-charts";
import Card from "../UI/Card";
import "../UI/Card.css";
export const options = {
  legend: "none",
  backgroundColor: "transparent",
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
  fontColor: "white",
};
export const data = [];
const Notdata = [];
let dateArray = [];
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
function formatDateArray(responseObj) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  let formattedDate = formatDate(currentDate);
  let i = 1;
  //console.log(formattedDate);
  //console.log(currentDate);
  //console.log("type " + Object.keys(responseObj).length);
  //console.log(responseObj["Time Series (Daily)"]);
  while (
    dateArray.length != 7 &&
    Object.keys(responseObj).length > 0 &&
    i < 50
  ) {
    formattedDate = formatDate(currentDate);
    let currentApiCall = responseObj["Time Series (Daily)"][formattedDate];
    if (
      typeof currentApiCall !== "undefined" &&
      dateArray.includes(formattedDate) == false
    ) {
      dateArray.push(formattedDate);
    }
    currentDate.setDate(currentDate.getDate() - 1);
    i++;
  }
  //console.log("finished loop");
  //console.log(dateArray.includes(formattedDate));
  //dateArray.push(formattedDate);
  //console.log(JSON.stringify(responseObj));
  //console.log(dateArray);
}

function formatChart(responseObj, dateArray) {
  if (Object.keys(responseObj).length > 0) {
    data.push(["Day", "Low", "Open", "Close", "High"]);
    for (let i = dateArray.length - 1; i >= 0; i--) {
      let Low = parseInt(
        responseObj["Time Series (Daily)"][dateArray[i]]["3. low"]
      );
      let Open = parseInt(
        responseObj["Time Series (Daily)"][dateArray[i]]["1. open"]
      );
      let Close = parseInt(
        responseObj["Time Series (Daily)"][dateArray[i]]["4. close"]
      );
      let High = parseInt(
        responseObj["Time Series (Daily)"][dateArray[i]]["2. high"]
      );
      if (data.includes([dateArray[i], Low, Open, Close, High]) == false) {
        data.push([dateArray[i], Low, Open, Close, High]);
      }
    }
    //console.log(data);
  }
}
function ApiChart(props) {
  formatDateArray(props.responseObj);
  formatChart(props.responseObj, dateArray);
  //console.log("apiChart");
  //console.log(props.responseObj);
  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default ApiChart;
