import Header from "./Header";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../App";
import Dashboard from "./Dashboard";
import VideoPlayer from "./VideoPlayer";
//import { useSnackbar } from "notistack";


const VideoPage = () => {
  const params = useParams();
  const videoid = params.id;

  useEffect(() => {
    const onLoadHandler = async () => {
      const url = `${config.endpoint}/videos`;
      const res = await getVideos(url);
      setData(res);
    };
    onLoadHandler();
    // eslint-disable-next-line
  }, []);
  
  //const { enqueueSnackbar } = useSnackbar();
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const getVideos = async (url) => {
    try {
      setloading(true);
      const res = await axios.get(url);
      setData(res.data);
      setloading(false);
      return res.data;
    } catch (e) {
      setloading(true);
      if (e.response && e.response.data.message) {
        console.log(e.response.data.message, { variant: "error" });
        setloading(false);
        return null;
      } else {
        console.log("Something went wrong", { variant: "error" });
        setloading(false);
        return null;
      }
    }
  };

  return (
    <>
      <Header />
      <VideoPlayer videoid={videoid} />
      <Dashboard Data={Data} loading={loading} videoid={videoid} />
    </>
  );
};
export default VideoPage;
