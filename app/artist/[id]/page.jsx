"use client";
import { useState, useEffect } from "react";
import {
  fetchArtistOverview,
  fetchArtistGenre,
  fetchArtistAlbums,
} from "@/utils/fetchApi";
import Image from "next/image";
import AlbumCard from "@/components/AlbumCard";
const ArtistInfo = ({ params }) => {
  const [artist, setArtist] = useState({
    profile: { name: "", biography: { text: "" } },
    visuals: { avatarImage: { sources: [{ url: "" }] } },
    stats: { worldRank: 0, monthlyListeners: 0 },
  });

  const [artistGenres, setArtistGenres] = useState([]);

  const [artistAlbums, setArtistAlbums] = useState([
    { totalCount: 0, items: [] },
  ]);

  const [isReadMore, setIsReadMore] = useState(false);

  async function getArtistInfo() {
    const data = await fetchArtistOverview(params.id);
    setArtist(data);
  }
  async function getArtistGenre() {
    const data = await fetchArtistGenre(params.id);
    setArtistGenres(data);
  }

  async function getArtistAlbums() {
    const data = await fetchArtistAlbums(params.id);
    setArtistAlbums(data);
  }

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    getArtistInfo();
    setTimeout(() => {
      getArtistGenre();
      getArtistAlbums();
    }, 500);
  }, []);
  console.log(artist);
  console.log(artistGenres);
  console.log(artistAlbums);
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
          {artist.profile.biography.text.replace(/<\/?a[^>]*>/g, "").length <
          2000 ? (
            <p>{artist.profile.biography.text.replace(/<\/?a[^>]*>/g, "")}</p>
          ) : isReadMore ? (
            <p>
              {artist.profile.biography.text.replace(/<\/?a[^>]*>/g, "")}
              <span onClick={toggleReadMore} className="morebutton">
                {" x"}
              </span>
            </p>
          ) : (
            <p>
              {artist.profile.biography.text
                .replace(/<\/?a[^>]*>/g, "")
                .slice(0, 2000)}
              {"... "}
              <span onClick={toggleReadMore} className="morebutton">
                more
              </span>
            </p>
          )}

          <div>
            {"GENRE: "}
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
      <div className="row">
        <ul className="music_list">
          {artistAlbums.items ? (
            <>
              {artistAlbums.items.map((album) => (
                <AlbumCard
                  id={album.releases.items[0].id}
                  title={album.releases.items[0].name}
                  artist={album.releases.items[0].name}
                  cover={album.releases.items[0].coverArt.sources[0].url}
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

export default ArtistInfo;
