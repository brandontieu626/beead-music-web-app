"use client";
import { fetchTrack } from "@/utils/fetchApi";
import { useState, useEffect } from "react";
import Image from "next/image";
export const TrackInfo = ({ params }) => {
  const [trackData, setTrackData] = useState({
    name: "",
    artists: [{ name: "" }],
    album: { images: [{ url: "" }] },
  });
  async function getTrackInfo() {
    const data = await fetchTrack(params.id);
    setTrackData(data);
  }
  useEffect(() => {
    getTrackInfo();
  }, []);
  console.log(trackData);

  return (
    <div>
      <div className="track_info_container">
        <div>
          <Image src={trackData.album.images[0].url} height={640} width={640} />
        </div>
        <div>
          <h1>{trackData.name}</h1>
          <h2>{trackData.artists[0].name}</h2>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
