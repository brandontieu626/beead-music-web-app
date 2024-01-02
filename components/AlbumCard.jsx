import Image from "next/image";
const AlbumCard = ({ id, title, cover }) => {
  return (
    <li className="music_card">
      <div className="image_wrap">
        <Image
          className="cover_art"
          src={cover}
          width={166.66}
          height={166.66}
        />
      </div>
      <h3 className="mc_title">
        {title.length < 25 ? (
          <span>{title}</span>
        ) : (
          <span>{title.slice(0, 26) + "..."}</span>
        )}
      </h3>
    </li>
  );
};

export default AlbumCard;
