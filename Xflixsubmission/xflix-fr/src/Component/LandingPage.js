import Header from "./Header";
import GenrePanel from "./GenrePanel";
import Dashboard from "./Dashboard";
import axios from "axios";
import { config } from "../App";
import { useEffect, useState } from "react";
// import { useSnackbar } from "notistack";
const LandingPage = () => {
  
  // const { enqueueSnackbar } = useSnackbar();
  const [Data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  let [GenreList, setGenreList] = useState(["All"]);
  const [ContentRating, setContentRadting] = useState("Anyone");
  const [loading, setloading] = useState(false);
  const onLoadHandler = async () => {
    const url = `${config.endpoint}/videos`;
    const res = await getVideos(url);
    setData(res);
  };
  
  useEffect(() => {
    onLoadHandler();
    // eslint-disable-next-line
  }, []);

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

  const filter = async (value, GenreList, ContentRating) => {
    let URL = `${config.endpoint}/videos?`;
    if (value) {
      URL += `title=${value}`;
    }
    if (GenreList.length) {
      if (GenreList.length && !GenreList.includes("All")) {
        const param = GenreList.join(",");
        URL[URL.length - 1] === "?"
          ? (URL += `genres=${param}`)
          : (URL += `&genres=${param}`);
      }
    }
    if (ContentRating && ContentRating !== "Anyone") {
      URL[URL.length - 1] === "?"
        ? (URL += `contentRating=${ContentRating}`)
        : (URL += `&contentRating=${ContentRating}`);
    }
    getVideos(URL);
  };

  const performSearch = () => {
    filter(searchData.search, GenreList, ContentRating);
  };

  useEffect(() => {
    if (searchData === "") filter("", GenreList, ContentRating);
    else filter(searchData.search, GenreList, ContentRating);
    // eslint-disable-next-line
  }, [GenreList, ContentRating]);

  return (
    <div>
      <Header setSearchData={setSearchData} onLoadHandler={onLoadHandler} performSearch={performSearch} HiddenButtons/>
      <GenrePanel
        setData={setData}
        GenreList={GenreList}
        setGenreList={setGenreList}
        ContentRating={ContentRating}
        setContentRadting={setContentRadting}
      />
      <Dashboard Data={Data} loading={loading} />
    </div>
  );
};

export default LandingPage;
