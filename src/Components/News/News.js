import { useEffect, useState } from "react";
import "../UI/Card.css";
import "../News/News.css";
const APIKey = "QJLVOX8Q4FCOITTM";

function News() {
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
    <div style={{ position: "relative", overflow: "hidden" }}>
      {newsArray.map((newsArray, index) => (
        <a className="News" key={index}>
          <div className="title">{newsArray.title}</div>
          <div className="description">{newsArray.summary}</div>
        </a>
      ))}
    </div>
  );
}

export default News;
