import Image from "next/image";
import Link from "next/link";
const ArtistCard = ({ id, name, avatar }) => {
  return (
    <li className="music_card">
      <Link href={`/artist/${id}`}>
        <div className="image_wrap">
          <Image
            className="cover_art"
            src={avatar}
            width={166.66}
            height={166.66}
          />
        </div>
        <h3 className="mc_artist_title">{name}</h3>
      </Link>
    </li>
  );
};

export default ArtistCard;
