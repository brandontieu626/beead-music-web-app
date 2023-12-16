"use client";
import {
  fetchTrack,
  fetchTrackCredits,
  fetchTrackLyrics,
} from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Image from "next/image";
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
  ///lyrics: { lines: [{ words: "" }] }
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
    getTrackCredits();
    getTrackLyrics();
  }, []);
  console.log(trackData);
  console.log(trackCredits);
  console.log(trackLyrics);
  return (
    <div>
      <div className="track_info_container">
        <div>
          <Image src={trackData.album.images[0].url} height={464} width={464} />
          <ul className="track_stats_container">
            <li>Label:{" " + trackCredits.sourceNames[0]}</li>
            <li>Type:{" " + trackData.type.toUpperCase()}</li>
            <li>Popularity:{" " + trackData.popularity}</li>
          </ul>
          {/* <div>Popularity:{" " + trackData.popularity}</div>
          <div>{trackData.type.toUpperCase()}</div>
          <div>{trackCredits.sourceNames[0]}</div> */}
        </div>
        <div className="track_description_container">
          <h1>{trackData.name}</h1>
          {/* <h1>{trackData.artists[0].uri.slice(15)}</h1> */}
          <h2>{trackData.artists[0].name}</h2>
          <h2>{trackData.album.release_date.slice(0, 4)}</h2>
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
        </div>
      </div>
      <div>
        {trackLyrics.map((line) => (
          <div>{line.words}</div>
        ))}
      </div>
    </div>
  );
};

export default TrackInfo;
