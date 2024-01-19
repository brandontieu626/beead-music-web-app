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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.lyrics.lines;
  } catch (error) {
    console.error(error);
  }
};

const fetchArtistOverview = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artist_overview/",
    params: {
      id: id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
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
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const response = await axios.request(options);

  return response.data.data.album;
};

const fetchAlbumTracks = async (id) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/album_tracks/",
    params: {
      id: id,
      offset: "0",
      limit: "300",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const response = await axios.request(options);

  return response.data.data.album.tracks;
};

const fetchSearch = async (query) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: query,
      type: "multi",
      offset: "0",
      limit: "12",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  const response = await axios.request(options);

  return response.data;
};

const fetchNewReleases = async (query) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID);
  params.append("client_secret", process.env.NEXT_PUBLIC_CLIENT_SECRET);

  const resp1 = await axios.post(
    "https://accounts.spotify.com/api/token",
    params
  );

  const accessToken = resp1.data.access_token;

  const url = "https://api.spotify.com/v1/browse/new-releases" + query;

  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return response.data.albums;
};

const fetchNewsArticles = async () => {
  const url =
    "https://newsapi.org/v2/everything?" +
    "q=music&" +
    "sortBy=relevancy&" +
    "pageSize=25&" +
    "apiKey=" +
    process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const response = await axios.get(url);

  return response.data.articles;
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
  fetchAlbumTracks,
  fetchSearch,
  fetchNewReleases,
  fetchNewsArticles,
};
