"use client";
import { fetchAlbumData, fetchAlbumTracks } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import MusicCard from "@/components/MusicCard";
import Image from "next/image";
import Link from "next/link";
import AlbumCard from "@/components/AlbumCard";
const AlbumInfo = ({ params }) => {
  const [albumData, setAlbumData] = useState({
    name: "",
    type: "",
    coverArt: {
      extractedColors: { colorRaw: { hex: "#14181c" } },
      sources: [{ url: "" }, { url: "" }, { url: "" }],
    },
    artists: { items: [{ uri: "", profile: { name: "" } }] },
    date: { isoString: "" },
    tracks: { totalCount: "" },
    label: "",
    copyright: { items: [{ type: "", text: "" }] },
    moreAlbumsByArtist: {
      items: [
        {
          discography: {
            popularReleases: {
              items: [
                {
                  releases: {
                    items: [
                      {
                        id: "",
                        name: "",
                        date: { year: "" },
                        coverArt: {
                          sources: [{ url: "" }, { url: "" }, { url: "" }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      ],
    },
  });

  const [albumTracks, setAlbumTracks] = useState({
    items: [{ track: { name: "", uri: "" } }],
    totalCount: 0,
  });

  const releaseDate = new Date(albumData.date.isoString);
  async function getAlbumData() {
    const data = await fetchAlbumData(params.id);
    setAlbumData(data);
  }
  async function getAlbumTracks() {
    const data = await fetchAlbumTracks(params.id);
    setAlbumTracks(data);
  }
  useEffect(() => {
    getAlbumData();
    getAlbumTracks();
  }, []);
  console.log(albumData);
  console.log(albumTracks);

  return (
    <div>
      <div className="row info_container">
        <div className="album_image_cover_container">
          {albumData.coverArt.sources[2].url != "" ? (
            <>
              <Image
                className="album_image"
                src={albumData.coverArt.sources[2].url}
                height={500}
                width={500}
                alt="Album Cover art"
              />
            </>
          ) : (
            <></>
          )}

          <ul className="artist_stats_container">
            <li>Label: {albumData.label}</li>
            <li>
              {albumData.copyright.items[0].type +
                albumData.copyright.items[0].text}
            </li>
          </ul>
        </div>
        <div className="description_container">
          <div>
            <h1 className="titles album_title">{albumData.name}</h1>
            <h2>
              {albumData.type.charAt(0) +
                albumData.type.slice(1).toLowerCase() +
                " • " +
                albumData.tracks.totalCount +
                " Tracks"}
            </h2>
            <Link href={`/artist/${albumData.artists.items[0].uri.slice(15)}`}>
              <h2 className="artist_page_name">
                {albumData.artists.items[0].profile.name}
              </h2>
            </Link>
            <h4>
              {releaseDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
          </div>
          <div>
            <iframe
              styles="border-radius:12px"
              src={
                "https://open.spotify.com/embed/album/" +
                params.id +
                "?utm_source=generator"
              }
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h1 className="titles labels">Tracklist</h1>
          <ul className="music_list">
            {albumTracks.items ? (
              <>
                {albumTracks.items.map((track, i) => (
                  <MusicCard
                    key={track.track.uri.slice(14)}
                    id={track.track.uri.slice(14)}
                    title={i + 1 + ". " + track.track.name}
                    cover={albumData.coverArt.sources[2].url}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h1 className="titles labels">
            More by {albumData.artists.items[0].profile.name}
          </h1>
          <ul className="toptrack_list">
            {albumData.moreAlbumsByArtist.items[0].discography.popularReleases
              .items ? (
              <>
                {albumData.moreAlbumsByArtist.items[0].discography.popularReleases.items.map(
                  (album) => (
                    <AlbumCard
                      key={album.releases.items[0].id}
                      id={album.releases.items[0].id}
                      title={album.releases.items[0].name}
                      cover={album.releases.items[0].coverArt.sources[2].url}
                      year={album.releases.items[0].date.year}
                    />
                  )
                )}
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
