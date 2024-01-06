"use client";
import { fetchAlbumData, fetchAlbumTracks } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import MusicCard from "@/components/MusicCard";
import Image from "next/image";
import Link from "next/link";
const AlbumInfo = ({ params }) => {
  const [albumData, setAlbumData] = useState({
    name: "",
    coverArt: {
      extractedColors: { colorRaw: { hex: "#14181c" } },
      sources: [{ url: "" }, { url: "" }, { url: "" }],
    },
    artists: { items: [{ uri: "", profile: { name: "" } }] },
    date: { isoString: "" },
    tracks: { totalCount: "" },
    label: "",
    copyright: { items: [{ type: "", text: "" }] },
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
  // document.body.style.backgroundColor =
  //   albumData.coverArt.extractedColors.colorRaw.hex;
  console.log(albumData);
  console.log(albumTracks);
  console.log(params.id);
  return (
    <div>
      <div className="row info_container">
        <div className="album_image_cover_container">
          <Image
            className="album_image"
            src={albumData.coverArt.sources[2].url}
            height={500}
            width={500}
          />
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
            <h2>{"Album • " + albumData.tracks.totalCount + " Tracks"}</h2>
            <Link href={`/artist/${albumData.artists.items[0].uri.slice(15)}`}>
              <h2 className="artist_title">
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
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h1 className="titles artist_labels">Tracklist</h1>
          <ul className="music_list">
            {albumTracks.items ? (
              <>
                {albumTracks.items.map((track, i) => (
                  <MusicCard
                    id={track.track.uri.slice(15)}
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
    </div>
  );
};

export default AlbumInfo;
