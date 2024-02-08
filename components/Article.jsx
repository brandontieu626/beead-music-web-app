import Image from "next/image";
import Link from "next/link";
const Article = ({ title, desc, publisher, cover, published, link }) => {
  const publishDate = new Date(published);
  return (
    <li className="article">
      <div onClick={() => window.open(link)}>
        <div className="article_image_wrap">
          {cover ? (
            <>
              <Image
                className="cover_art"
                src={cover}
                width={720}
                height={360}
                alt="Article Image"
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <h1 className="titles article_title">{title}</h1>
        <h3 className="article_description">{desc}</h3>
        <h5>{publisher}</h5>
        <h5 className="article_date">
          {publishDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h5>
      </div>
    </li>
  );
};

export default Article;
