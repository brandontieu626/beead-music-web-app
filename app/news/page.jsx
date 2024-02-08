"use client";
import { fetchNewsArticles } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Article from "@/components/Article";
const News = () => {
  const [news, setNews] = useState([]);
  async function getNews() {
    const data = await fetchNewsArticles();
    setNews(data);
  }

  useEffect(() => {
    setTimeout(() => {
      getNews();
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {news.length != 0 ? (
          <ul className="article_list">
            {news.map((article, i) => (
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
