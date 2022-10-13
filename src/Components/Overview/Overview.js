import { useEffect, useState } from "react";
import "../UI/Card.css";
import "../Overview/Overview.css";
const APIKey = "QJLVOX8Q4FCOITTM";

function Overview() {
  const [responseObj, setResponseObj] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    console.log("i fire once");

    // Update the document title using the browser API
    fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=${APIKey}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
        setloading(false);
        console.log(response);
      });
  }, []);

  if (loading) {
    return <>Still loading</>;
  }

  return (
    <div className="main">
      <div className="overviewTitle">Company Overview</div>

      <div className="info">
        <span className="spanInfo">Industry: </span>
        <span className="spanInfo">{responseObj.Industry}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Market Cap: </span>
        <span className="spanInfo">{responseObj.MarketCapitalization}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Total Shares Outstanding: </span>
        <span className="spanInfo">{responseObj.SharesOutstanding}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Earnings Per Share: </span>
        <span className="spanInfo">{responseObj.EPS}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Price to Revenue: </span>
        <span className="spanInfo">{responseObj.MarketCapitalization}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Price to book (FY): </span>
        <span className="spanInfo">{responseObj.PriceToBookRatio}</span>
      </div>
      <div className="info">
        <span className="spanInfo">Price to sales (FY): </span>
        <span className="spanInfo">{responseObj.PriceToSalesRatioTTM}</span>
      </div>
    </div>
  );
}

export default Overview;
