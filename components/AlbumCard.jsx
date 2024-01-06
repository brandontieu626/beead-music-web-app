import Image from "next/image";
import Link from "next/link";
const AlbumCard = ({ id, title, cover, year }) => {
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
      <Link href={`/album/${id}`}>
        <div>
          {title.length < 25 ? (
            <h3 className="mc_artist_title">{title}</h3>
          ) : (
            <h3 className="mc_artist_title">{title.slice(0, 25) + "..."}</h3>
          )}
        </div>
      </Link>
      <h3 className="mc_year">{year}</h3>
    </li>
  );
};

export default AlbumCard;
