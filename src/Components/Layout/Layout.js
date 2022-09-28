import Navbar from "./Navbar";
import "../Layout/Layout.css";
import Card from "../UI/Card";
import "../UI/Card.css";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import News from "../News/News";
import ApiChart from "../ApiChart/ApiChart";
import Overview from "../Overview/Overview";

const APIKey = "QJLVOX8Q4FCOITTM";

function Layout() {
  const [responseObj, setResponseObj] = useState({});
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("i fire once");

    // Update the document title using the browser API
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${APIKey}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
        //console.log(response);
        setTitle(response["Meta Data"]["2. Symbol"]);
      });
    //setTitle(responseObj["Meta Data"]["2. Symbol"]);

    setLoading(false);
  }, []);
  // console.log(responseObj);
  if (loading) {
    return <>still loading...</>;
  }
  return (
    <div>
      <div className="background">
        <Navbar />
      </div>
      <div className="layout">
        <div className="title">{title} (Seven Day Chart)</div>
        <Card
          cardType="chart"
          content={<ApiChart responseObj={responseObj} />}
        />
        <Card cardType="card" content={<Overview />} />
        <Card cardType="card" content={<News />} />
      </div>
    </div>
  );
}

export default Layout;
