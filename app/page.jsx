"use client";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getMusicDetails = async () => {
      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
        params: {
          id: "37i9dQZEVXbLRQDuF5jeBp",
          offset: "0",
          limit: "100",
        },
        headers: {
          "X-RapidAPI-Key":
            "9da0c30f96msh6c9c58d42112a06p1bea7djsn913e5690fa24",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMusicDetails();
  }, []);
  console.log("THE");
  console.log(data);
  return (
    <div className="home_container">
      <h1>Beead Music</h1>
      <span>{data.items[0].track.name}</span>
    </div>
  );
};

export default Home;
