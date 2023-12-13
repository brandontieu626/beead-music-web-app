import React from "react";
import MusicCard from "./MusicCard";
const MusicList = ({ props }) => {
  return (
    <ul className="music_list">
      {props ? (
        <>
          {props.map((song) => (
            <MusicCard
              id={song.track.id}
              title={song.track.name}
              artist={song.track.artists[0].name}
              cover={song.track.album.images[0].url}
            />
          ))}
        </>
      ) : (
        <span></span>
      )}
    </ul>
  );
};

export default MusicList;
