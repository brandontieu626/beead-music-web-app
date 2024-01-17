"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSearch } from "@/utils/fetchApi";
import AlbumCard from "@/components/AlbumCard";
import MusicCard from "@/components/MusicCard";
import ArtistCard from "@/components/ArtistCard";
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
            artists: { items: [{ uri: "", profile: { name: "" } }] },
            coverArt: { sources: [{ url: "" }, { url: "" }, { url: "" }] },
            date: { year: "" },
          },
        },
      ],
    },
    artists: {
      items: [
        {
          data: {
            uri: "",
            profile: { name: "" },
            visuals: { avatarImage: { sources: [{ url: "" }] } },
          },
        },
      ],
    },
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

  console.log(searchResults.artists);
  return (
    <div>
      <div className="container search_res_container">
        <h1>{"Showing results for " + `"${search}"`}</h1>
      </div>
      <div className="container">
        <div className="row">
          <h1 className="titles labels">Artists</h1>
          <ul className="music_list">
            {searchResults.artists.items ? (
              <>
                {searchResults.artists.items.map((artist) => (
                  <ArtistCard
                    id={artist.data.uri.slice(15)}
                    name={artist.data.profile.name}
                    avatar={
                      artist.data.visuals.avatarImage
                        ? artist.data.visuals.avatarImage.sources[0].url
                        : "/images/defaultpfp.jpg"
                    }
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
          <h1 className="titles labels"> Albums/Singles/EPS</h1>
          <ul className="music_list">
            {searchResults.albums.items ? (
              <>
                {searchResults.albums.items.map((album) => (
                  <AlbumCard
                    id={album.data.uri.slice(14)}
                    title={album.data.name}
                    artist={album.data.artists.items[0].profile.name}
                    artistId={album.data.artists.items[0].uri.slice(15)}
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
          <h1 className="titles labels">Tracks</h1>
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
