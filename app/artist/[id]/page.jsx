"use client";
import { useState, useEffect } from "react";
import { fetchArtist } from "@/utils/fetchApi";
import Image from "next/image";
const ArtistInfo = ({ params }) => {
  const [artist, setArtist] = useState({ name: "", images: [{ url: "" }] });
  async function getArtistInfo() {
    const data = await fetchArtist(params.id);
    setArtist(data);
  }
  useEffect(() => {
    getArtistInfo();
  }, []);
  console.log(artist);
  return (
    <div>
      <div className="row artist_info_container">
        <div className="artist_cover_container">
          <Image
            className="artist_image"
            src={artist.images[0].url}
            width={400}
            height={500}
          />
        </div>
        <div className="artist_description_container">
          <h1>{artist.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
