"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSearch } from "@/utils/fetchApi";
import AlbumCard from "@/components/AlbumCard";
import MusicCard from "@/components/MusicCard";
const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [searchResults, setSearchResults] = useState({
    albums: {
      items: [
        {
          data: {
            uri: "",
            name: "",
            artists: { items: [{ profile: { name: "" } }] },
            coverArt: { sources: [{ url: "" }, { url: "" }, { url: "" }] },
            date: { year: "" },
          },
        },
      ],
    },
    artists: {},
    tracks: {
      items: [
        {
          data: {
            id: "",
            name: "",
            albumOfTrack: {
              coverArt: { sources: [{ url: "" }, { url: "" }, { url: "" }] },
            },
            artists: {
              items: [{ uri: "", profile: { name: "" } }],
            },
          },
        },
      ],
    },
  });
  async function getSearchResults() {
    const data = await fetchSearch(search);
    setSearchResults(data);
  }

  useEffect(() => {
    getSearchResults();
  }, []);

  console.log(searchResults);
  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="titles artist_labels"> ALBUMS/SINGLES/EPS</h1>
          <ul className="music_list">
            {searchResults.albums.items ? (
              <>
                {searchResults.albums.items.map((album) => (
                  <AlbumCard
                    id={album.data.uri.slice(14)}
                    title={album.data.name}
                    artist={album.data.artists.items[0].profile.name}
                    cover={album.data.coverArt.sources[2].url}
                    year={album.data.date.year}
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
          <h1 className="titles artist_labels">TRACKS</h1>
          <ul className="music_list">
            {searchResults.tracks.items ? (
              <>
                {searchResults.tracks.items.map((track) => (
                  <MusicCard
                    id={track.data.id}
                    title={track.data.name}
                    artist={track.data.artists.items[0].profile.name}
                    artistId={track.data.artists.items[0].uri.slice(15)}
                    cover={track.data.albumOfTrack.coverArt.sources[2].url}
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

export default SearchPage;
