import Image from "next/image";
import Link from "next/link";
const MusicCard = ({ id, title, artist, cover }) => {
  return (
    <li className="music_card">
      <Link href={`/track/${id}`}>
        <Image src={cover} width={166.66} height={166.66} />
        <div className="mc_artist_title">
          <h3 className="mc_artist">{artist}</h3>
          <h3 className="mc_title">{title}</h3>
        </div>
      </Link>
    </li>
  );
};

export default MusicCard;
