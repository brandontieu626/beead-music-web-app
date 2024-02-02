"use client";
import { useState, useEffect } from "react";
import {
  fetchArtistOverview,
  fetchArtistGenre,
  fetchArtistAlbums,
} from "@/utils/fetchApi";
import Image from "next/image";
import AlbumCard from "@/components/AlbumCard";
import MusicCard from "@/components/MusicCard";
const ArtistInfo = ({ params }) => {
  const [artist, setArtist] = useState({
    profile: { name: "", biography: { text: "" } },
    visuals: { avatarImage: { sources: [{ url: "" }] } },
    discography: { topTracks: { items: [] } },
    stats: { worldRank: 0, monthlyListeners: 0 },
  });

  const [artistGenres, setArtistGenres] = useState(["N/A"]);

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
    setTimeout(() => {
      getArtistInfo();
    }, 500);
    setTimeout(() => {
      getArtistGenre();
    }, 1200);
    setTimeout(() => {
      getArtistAlbums();
    }, 1200);
  }, []);

  return (
    <div>
      <div className="row info_container">
        <div className="image_cover_container">
          {artist.visuals.avatarImage.sources[0].url != "" ? (
            <>
              <Image
                className="artist_image"
                src={
                  artist.visuals.avatarImage
                    ? artist.visuals.avatarImage.sources[0].url
                    : "/images/defaultpfp.jpg"
                }
                width={400}
                height={500}
                alt="Artist Image"
              />
            </>
          ) : (
            <></>
          )}

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
        <div className="description_container">
          <h1 className="titles">{artist.profile.name}</h1>
          {artist.profile.biography.text ? (
            artist.profile.biography.text
              .replace(/<\/?a[^>]*>/g, "")
              .replaceAll("&#39;", "'")
              .replaceAll("&#34;", '"')
              .replaceAll("&amp;", "&")
              .replaceAll("&quot;", '"')
              .replaceAll("&#43;", "+").length < 2000 ? (
              <p>
                {artist.profile.biography.text
                  .replace(/<\/?a[^>]*>/g, "")
                  .replaceAll("&#39;", "'")
                  .replaceAll("&#34;", '"')
                  .replaceAll("&amp;", "&")
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#43;", "+")}
              </p>
            ) : isReadMore ? (
              <p>
                {artist.profile.biography.text
                  .replace(/<\/?a[^>]*>/g, "")
                  .replaceAll("&#39;", "'")
                  .replaceAll("&#34;", '"')
                  .replaceAll("&amp;", "&")
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#43;", "+")}
                <span onClick={toggleReadMore} className="morebutton">
                  {" x"}
                </span>
              </p>
            ) : (
              <p>
                {artist.profile.biography.text
                  .replace(/<\/?a[^>]*>/g, "")
                  .replaceAll("&#39;", "'")
                  .replaceAll("&#34;", '"')
                  .replaceAll("&amp;", "&")
                  .replaceAll("&quot;", '"')
                  .replaceAll("&#43;", "+")
                  .slice(0, 2000)}
                {"... "}
                <span onClick={toggleReadMore} className="morebutton">
                  more
                </span>
              </p>
            )
          ) : (
            <>We don't know much about them but we're sure they're great!</>
          )}

          <div>
            {"GENRE: "}
            {artistGenres.length != 0 ? (
              <>
                {artistGenres.map((genre, i, artistGenres) =>
                  i + 1 == artistGenres.length ? (
                    <span key={i}>
                      {genre[0].toUpperCase() + genre.slice(1)}
                    </span>
                  ) : (
                    <span key={i}>
                      {genre[0].toUpperCase() + genre.slice(1) + "/"}
                    </span>
                  )
                )}
              </>
            ) : (
              <>N/A</>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {artistAlbums.totalCount != 0 ? (
            <h1 className="titles labels">ALBUMS</h1>
          ) : (
            <></>
          )}
          <ul className="music_list">
            {artistAlbums.items ? (
              <>
                {artistAlbums.items.map((album) => (
                  <AlbumCard
                    key={album.releases.items[0].id}
                    id={album.releases.items[0].id}
                    title={album.releases.items[0].name}
                    cover={album.releases.items[0].coverArt.sources[0].url}
                    year={album.releases.items[0].date.year}
                  />
                ))}
              </>
            ) : (
              <span></span>
            )}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {artist.discography.topTracks.items.length != 0 ? (
            <h1 className="titles labels">TOP TRACKS</h1>
          ) : (
            <></>
          )}
          <ul className="toptrack_list">
            {artist.discography.topTracks.items ? (
              <>
                {artist.discography.topTracks.items.map((track) => (
                  <MusicCard
                    key={track.track.id}
                    id={track.track.id}
                    title={track.track.name}
                    artist={""}
                    cover={track.track.album.coverArt.sources[0].url}
                  />
                ))}
              </>
            ) : (
              <span></span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
