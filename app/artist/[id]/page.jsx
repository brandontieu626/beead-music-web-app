"use client";
import { useState, useEffect } from "react";
import { fetchArtistOverview, fetchArtistGenre } from "@/utils/fetchApi";
import Image from "next/image";
const ArtistInfo = ({ params }) => {
  const [artist, setArtist] = useState({
    profile: { name: "", biography: { text: "" } },
    visuals: { avatarImage: { sources: [{ url: "" }] } },
    stats: { worldRank: 0, monthlyListeners: 0 },
  });

  const [artistGenres, setArtistGenres] = useState([]);
  async function getArtistInfo() {
    const data = await fetchArtistOverview(params.id);
    setArtist(data);
  }
  async function getArtistGenre() {
    const data = await fetchArtistGenre(params.id);
    setArtistGenres(data);
  }
  useEffect(() => {
    getArtistInfo();
    getArtistGenre();
  }, []);
  console.log(artist);
  console.log(artistGenres);
  return (
    <div>
      <div className="row artist_info_container">
        <div className="artist_cover_container">
          <Image
            className="artist_image"
            src={artist.visuals.avatarImage.sources[0].url}
            width={400}
            height={500}
          />
          <ul className="artist_stats_container">
            <li>{"Rank: " + artist.stats.worldRank}</li>
            <li>
              {"Monthly Listeners: " +
                Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(artist.stats.monthlyListeners)}
            </li>
          </ul>
        </div>
        <div className="artist_description_container">
          <h1>{artist.profile.name}</h1>
          <p>{artist.profile.biography.text.replace(/<\/?a[^>]*>/g, "")}</p>
          <div>
            {"Genre: "}
            {artistGenres.map((genre, i, artistGenres) =>
              i + 1 == artistGenres.length ? (
                <span>{genre[0].toUpperCase() + genre.slice(1)}</span>
              ) : (
                <span>{genre[0].toUpperCase() + genre.slice(1) + "/"}</span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
