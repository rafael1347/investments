import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Card from "../UI/Card";
import "../UI/Card.css";
import "../News/News.css";
const APIKey = "QJLVOX8Q4FCOITTM";

function News() {
  const [responseObj, setResponseObj] = useState({});
  const [newsArray, setNewsArray] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    console.log("i fire once");

    // Update the document title using the browser API
    fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit:10&apikey=${APIKey}`
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
        const theNewsArray = [];

        for (let i = 1; i < 5; i++) {
          const theNewsArray1 = {
            key: i,
            title: response.feed[i].title,
            image: response.feed[i].banner_image,
            summary: response.feed[i].summary,
          };
          theNewsArray.push(theNewsArray1);
        }
        console.log(theNewsArray);
        setNewsArray(theNewsArray);
        setloading(false);
        //console.log(response.feed[0].title);
      });
  }, []);

  if (loading) {
    return <>Still loading</>;
  }

  return (
    <ul>
      {newsArray.map((newsArray) => (
        <li>
          <div>
            <h3>{newsArray.title}</h3>
            <p>{newsArray.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default News;
