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
    getNews();
  }, []);
  console.log(news);
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
                author={article.author}
                published={article.publishedAt}
                link={article.url}
                cover={
                  article.urlToImage
                    ? article.urlToImage
                    : "/images/defaultarticle.jpg"
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
