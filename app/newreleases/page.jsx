"use client";
import { fetchNewReleases } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import AlbumCard from "@/components/AlbumCard";
const NewReleases = () => {
  const [newReleases, setNewReleases] = useState({ items: [] });
  async function getNewReleases(query) {
    const data = await fetchNewReleases(query);
    setNewReleases(data);
  }

  useEffect(() => {
    setTimeout(() => {
      getNewReleases("?limit=24");
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="titles labels select_country_container">New Releases</h1>
        {newReleases.items ? (
          <ul className="music_list">
            {newReleases.items.map((music) => (
              <AlbumCard
                key={music.id}
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
