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

  async function handleSubmit(country) {
    console.log(country);
    const query = "?country=" + country + "&limit=24";

    const data = await getNewReleases(query);
  }
  useEffect(() => {
    getNewReleases("?country=US&limit=24");
  }, []);
  console.log(process.env.CLIENT_ID);
  console.log(process.env.CLIENT_SECRET);
  return (
    <div className="container">
      <div className="row">
        <h1 className="titles labels select_country_container">
          New Releases{" "}
          <select
            id="filter_country"
            className="select_country"
            onChange={(event) => handleSubmit(event.target.value)}
            defaultValue="US"
          >
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="BR">Brazil</option>
            <option value="GB">UK</option>
            <option value="JP">Japan</option>
            <option value="KR">Korea</option>
          </select>
        </h1>
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
