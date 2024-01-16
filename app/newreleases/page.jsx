"use client";
import { fetchNewReleases } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import AlbumCard from "@/components/AlbumCard";
const NewReleases = () => {
  const [newReleases, setNewReleases] = useState({ items: [] });
  async function getNewReleases() {
    const data = await fetchNewReleases();
    setNewReleases(data);
  }
  useEffect(() => {
    getNewReleases();
  }, []);
  console.log(process.env.CLIENT_ID);
  console.log(process.env.CLIENT_SECRET);
  return (
    <div className="container">
      <div className="row">
        <h1>New Releases</h1>
        {newReleases.items ? (
          <ul className="music_list">
            {newReleases.items.map((music) => (
              <AlbumCard
                id={music.id}
                title={music.name}
                cover={music.images[0].url}
                year={music.release_date}
                artist={music.artists[0].name}
                artistId={music.artists[0].id}
              />
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NewReleases;
