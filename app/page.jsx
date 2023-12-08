"use client";
import { useState, useEffect } from "react";
import MusicCard from "@/components/MusicCard";
import axios from "axios";

export const Home = () => {
  const [songs, setSongs] = useState([]);
  async function getPopularTracks() {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
      params: {
        id: "37i9dQZEVXbLRQDuF5jeBp",
        offset: "0",
        limit: "5",
      },
      headers: {
        "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    setSongs(response.data.items);
  }
  useEffect(() => {
    getPopularTracks();
  }, []);

  console.log(songs);
  return (
    <div className="home_container">
      <h1>Beead Music</h1>
      <div className="popular_usa_container">
        <ul className="music_list">
          {songs ? (
            <>
              {songs.map((song) => (
                <MusicCard
                  key={song.track.id}
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
      </div>
    </div>
  );
};

export default Home;
