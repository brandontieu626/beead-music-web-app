import axios from "axios";

const fetchPlaylistTracks = async (uri, off, lim) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
    params: {
      id: uri,
      offset: off,
      limit: lim,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.items;
};

const fetchTrack = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/tracks/",
    params: {
      ids: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.tracks[0];
};

const fetchTrackCredits = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/track_credits/",
    params: {
      id: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data;
};

const fetchTrackLyrics = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/track_lyrics/",
    params: {
      id: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.lyrics.lines;
};

const fetchArtistOverview = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artist_overview/",
    params: {
      id: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.data.artist;
};

const fetchArtistGenre = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artists/",
    params: {
      ids: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.artists[0].genres;
};

const fetchArtistAlbums = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artist_albums/",
    params: {
      id: id,
      offset: "0",
      limit: "100",
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);

  return response.data.data.artist.discography.albums;
};

const fetchAlbumData = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/album_metadata/",
    params: {
      id: id,
    },
    headers: {
      "X-RapidAPI-Key": "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);

  return response.data.data.album;
};

export {
  fetchPlaylistTracks,
  fetchTrack,
  fetchTrackCredits,
  fetchTrackLyrics,
  fetchArtistOverview,
  fetchArtistGenre,
  fetchArtistAlbums,
  fetchAlbumData,
};
