import React, { useEffect, useState } from "react";
import "./NewsCards.css";
import axios from "axios";
import { newsApi } from "../functions/constants";
import toast from "react-hot-toast";

const NewsCards = () => {
  const [data, setData] = useState<any[]>([]);

  const getNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsApi}`
      );
      setData(response.data.articles);
      toast.success("News Updated");
    } catch (error) {
      console.error("Error fetching news", error);
      toast.error("Error fetching news");
    }
  };

  useEffect(()=>{
    getNews();
    let waitTime = 30 * 60 * 1000;
    setInterval(() => {
      getNews();
    }, waitTime);
  },[])

  return (
    <div>
      <div className="container">
        {data?.map((item, index) => (
          <>
            <a href={item.url} target="_blank" rel="noreferrer" className="card" key={index}>
              <div className="card__header">
                <img
                  src={item.urlToImage?item.urlToImage:"https://www.newscaststudio.com/wp-content/uploads/2024/03/bbc-news-logo-new.jpg"}
                  alt="card__image"
                  className="card__image"
                  width="600"
                />
              </div>
              <div className="card__body">
                <span className="tag tag-blue">News</span>
                <h4 style={{
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  display: "-webkit-box"
                }}>{item.title}</h4>
                <p style={{
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  display: "-webkit-box"
                }}>
                  {item.description}
                </p>
              </div>
              <div className="card__footer">
                <div className="user">
                  <img
                    src="https://cdn.icon-icons.com/icons2/70/PNG/512/bbc_news_14062.png"
                    alt="user__image"
                    className="user__image"
                    width="50"
                  />
                  <div className="user__info">
                    <h5>{item.author}</h5>
                    <small>{new Date(item.publishedAt).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            </a>
          </>
        ))}
      </div>
    </div>
  );
};

export default NewsCards;
