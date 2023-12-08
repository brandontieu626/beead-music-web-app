import Image from "next/image";
const MusicCard = ({ title, artist, cover }) => {
  return (
    <li className="music_card">
      <Image src={cover} width={166.66} height={166.66} />
      <h3>{artist}</h3>
      <h3>{title}</h3>
    </li>
  );
};

export default MusicCard;
