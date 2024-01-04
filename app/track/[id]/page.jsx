"use client";
import {
  fetchTrack,
  fetchTrackCredits,
  fetchTrackLyrics,
} from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
export const TrackInfo = ({ params }) => {
  const [trackData, setTrackData] = useState({
    name: "",
    artists: [{ name: "", uri: "" }],
    album: { images: [{ url: "" }], release_date: "" },
    type: "",
    popularity: "",
  });

  const [trackCredits, setTrackCredits] = useState({
    sourceNames: [""],
    roleCredits: [{ roleTitle: "", artists: [] }],
  });
  const [trackLyrics, setTrackLyrics] = useState([{ words: "" }]);

  async function getTrackInfo() {
    const data = await fetchTrack(params.id);
    setTrackData(data);
  }

  async function getTrackCredits() {
    const data = await fetchTrackCredits(params.id);
    setTrackCredits(data);
  }

  async function getTrackLyrics() {
    const data = await fetchTrackLyrics(params.id);
    setTrackLyrics(data);
  }
  useEffect(() => {
    getTrackInfo();
    setTimeout(() => {
      getTrackCredits();
      getTrackLyrics();
    }, 500);
  }, []);
  console.log(trackData);
  console.log(trackCredits);
  console.log(trackLyrics);
  return (
    <div>
      <div className="row info_container">
        <div className="image_cover_container">
          <Image
            className="track_image"
            src={trackData.album.images[0].url}
            height={400}
            width={400}
          />
          <ul className="track_stats_container">
            <li>Label:{" " + trackCredits.sourceNames[0]}</li>
            <li>Type:{" " + trackData.type.toUpperCase()}</li>
            <li>Popularity:{" " + trackData.popularity}</li>
          </ul>
        </div>
        <div className="description_container">
          <div>
            <h1 className="titles">{trackData.name}</h1>
            <Link href={`/artist/${trackData.artists[0].uri.slice(15)}`}>
              <h2 className="mc_artist_title">{trackData.artists[0].name}</h2>
            </Link>
            <h2>{trackData.album.release_date.slice(0, 4)}</h2>
          </div>
          <div>
            {trackCredits.roleCredits.map((role) => (
              <div>
                {role.roleTitle + ": "}
                {role.artists.map((artist, i, artists) =>
                  i + 1 == artists.length ? (
                    <span>{artist.name}</span>
                  ) : (
                    <span>{artist.name + ", "}</span>
                  )
                )}
              </div>
            ))}
          </div>
          <div>
            <iframe
              styles="border-radius:12px"
              src={
                "https://open.spotify.com/embed/track/" +
                params.id +
                "?utm_source=generator"
              }
              width="100%"
              height="164"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="row track_lyrics_container">
        {trackLyrics.map((line) => (
          <div>{line.words}</div>
        ))}
      </div>
    </div>
  );
};

export default TrackInfo;
