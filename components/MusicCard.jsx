import Image from "next/image";
import Link from "next/link";
const MusicCard = ({ id, title, artist, artistId, cover }) => {
  return (
    <li className="music_card">
      <div className="image_wrap">
        <Link href={`/track/${id}`}>
          <Image
            className="cover_art"
            src={cover}
            width={166.66}
            height={166.66}
          />
        </Link>
      </div>
      <Link href={`/track/${id}`}>
        <h3 className="mc_artist_title">{title}</h3>
      </Link>
      {artist ? (
        <Link href={`/artist/${artistId}`}>
          <h3 className="mc_year">{artist}</h3>
        </Link>
      ) : (
        <></>
      )}
    </li>
  );
};

export default MusicCard;
