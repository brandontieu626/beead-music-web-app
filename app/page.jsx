"use client";
import { useState, useEffect } from "react";
import MusicCard from "@/components/MusicCard";
import { fetchPlaylistTracks } from "@/utils/fetchApi";

export const Home = () => {
  const [songs, setSongs] = useState([]);
  async function getPopularTracks() {
    const tracks = await fetchPlaylistTracks(
      "37i9dQZEVXbLRQDuF5jeBp",
      "0",
      "50"
    );

    setSongs(tracks);
  }
  useEffect(() => {
    getPopularTracks();
  }, []);

  console.log(songs);
  return (
    <div className="container">
      <div className="row">
        <h1 className="titles labels">Top 50 USA</h1>
        <ul className="toptrack_list">
          {songs.map((song) => (
            <MusicCard
              key={song.track.id}
              id={song.track.id}
              title={song.track.name}
              artist={song.track.artists[0].name}
              artistId={song.track.artists[0].id}
              cover={song.track.album.images[0].url}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
