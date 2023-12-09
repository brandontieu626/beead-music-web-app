import Image from "next/image";
const MusicCard = ({ title, artist, cover }) => {
  return (
    <li className="music_card">
      <Image src={cover} width={166.66} height={166.66} />
      <div className="mc_artist_title">
        <h3 className="mc_artist">{artist}</h3>
        <h3 className="mc_title">{title}</h3>
      </div>
    </li>
  );
};

export default MusicCard;
