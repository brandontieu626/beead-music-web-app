"use client";
import { useState, useEffect } from "react";
import MusicList from "@/components/MusicList";
import { fetchPlaylistTracks } from "@/utils/fetchApi";

export const Home = () => {
  const [songs, setSongs] = useState([]);
  async function getPopularTracks() {
    const tracks = await fetchPlaylistTracks(
      "37i9dQZEVXbLRQDuF5jeBp",
      "0",
      "6"
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
        <h1>Popular Tracks in USA</h1>
        <MusicList props={songs} />
      </div>
    </div>
  );
};

export default Home;
