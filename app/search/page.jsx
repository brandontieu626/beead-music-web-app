"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSearch } from "@/utils/fetchApi";
import AlbumCard from "@/components/AlbumCard";
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
    tracks: {},
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
  );
};

export default SearchPage;
