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

export { fetchPlaylistTracks, fetchTrack };
