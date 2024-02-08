"use client";
import { fetchNewsArticles, fetchTopNews } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Article from "@/components/Article";
const News = () => {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState([]);
  async function getNews() {
    const data = await fetchNewsArticles();
    setNews(data);
  }

  async function getTopNews() {
    const data = await fetchTopNews();
    setTopNews(data);
  }

  useEffect(() => {
    setTimeout(() => {
      // getNews();
      getTopNews();
    }, 500);
  }, []);

  console.log(topNews);
  return (
    <div className="container">
      <div className="row">
        {topNews.length != 0 ? (
          <ul className="article_list">
            {topNews.map((article, i) => (
              <Article
                key={i}
                title={article.title}
                desc={article.description}
                publisher={article.source.name}
                published={article.publishedAt}
                link={article.url}
                cover={
                  article.image ? article.image : "/images/defaultarticle.jpg"
                }
              />
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default News;
