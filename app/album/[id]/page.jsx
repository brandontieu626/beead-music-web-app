"use client";
import { fetchAlbumData } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const AlbumInfo = ({ params }) => {
  const [albumData, setAlbumData] = useState({
    name: "",
    coverArt: {
      sources: [{ url: "" }],
    },
    artists: { items: [{ uri: "", profile: { name: "" } }] },
  });
  async function getAlbumData() {
    const data = await fetchAlbumData(params.id);
    setAlbumData(data);
  }
  useEffect(() => {
    getAlbumData();
  }, []);
  console.log(albumData);
  console.log(params.id);
  return (
    <div>
      <div className="row info_container">
        <div className="image_cover_container">
          <Image
            className="track_image"
            src={albumData.coverArt.sources[0].url}
            height={400}
            width={400}
          />
        </div>
        <div className="description_container">
          <div>
            <h1 className="titles album_title">{albumData.name}</h1>
            <Link href={`/artist/${albumData.artists.items[0].uri.slice(15)}`}>
              <h2 className="mc_artist_title">
                {albumData.artists.items[0].profile.name}
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
