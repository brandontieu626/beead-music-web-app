import Image from "next/image";
import Link from "next/link";
const Article = ({ id, title, desc, author, cover, published, link }) => {
  const publishDate = new Date(published);
  return (
    <li className="article">
      <Link href={link}>
        <div className="article_image_wrap">
          <Image className="cover_art" src={cover} width={720} height={360} />
        </div>

        <h1 className="titles article_title">{title}</h1>
        <h3 className="article_description">{desc}</h3>
        <h5>By: {author}</h5>
        <h5>
          {publishDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h5>
      </Link>
    </li>
  );
};

export default Article;
