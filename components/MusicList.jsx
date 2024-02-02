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
              artistId={song.track.artists[0].id}
              cover={song.track.album.images[0].url}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default MusicList;
