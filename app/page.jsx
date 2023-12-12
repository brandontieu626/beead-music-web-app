"use client";
import { useState, useEffect } from "react";
import MusicList from "@/components/MusicList";
import { fetchTracks } from "@/utils/fetchApi";

export const Home = () => {
  const [songs, setSongs] = useState([]);
  async function getPopularTracks() {
    const tracks = await fetchTracks("37i9dQZEVXbLRQDuF5jeBp", "0", "6");
    setSongs(tracks);
  }
  useEffect(() => {
    getPopularTracks();
  }, []);

  console.log(songs);
  return (
    <div className="home_container">
      <div className="popular_usa_container">
        <h1>Popular Tracks in USA</h1>
        <MusicList props={songs} />
      </div>
    </div>
  );
};

export default Home;
