import "./GenrePanel.css";
import { ToggleButton, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { config } from "../App";
import axios from "axios";
// import { useSnackbar } from "notistack";
export const Genres = [
  { label: "All Genre", value: "All" },
  { label: "Education", value: "Education" },
  { label: "Sports", value: "Sports" },
  { label: "Comedy", value: "Comedy" },
  { label: "Lifestyle", value: "Lifestyle" },
  { label: "Movies", value: "Movies" },
];

export const ContentRatings = [
  { label: "Any Age Group", value: "Anyone" },
  { label: "7+", value: "7%2B" },
  { label: "12+", value: "12%2B" },
  { label: "16+", value: "16%2B" },
  { label: "18+", value: "18%2B" },
];
const GenrePanel = ({
  setData,
  GenreList,
  setGenreList,
  ContentRating,
  setContentRadting,
}) => {
  // const { alert } = useSnackbar();
  const CustomSelect = styled(Select)({
    backgroundColor: "#ffffff",
    height: "2.2rem",
    borderRadius: "16px",
    "&:focus": {
      borderColor: "#606060",
      border: "nOne",
    },
  });
 

  const ColorButton = styled(ToggleButton)({
    textTransform: "capitalize",
    color: "#ffffff",
    fontsize: "1.5rem",
    background: "none",
    border: "none",
    height: "2rem",
    borderRadius: "16px",
    boxShadow: "none",
    fontWeight: "400",
    "&.Mui-selected:hover": {
      backgroundColor: "#ededed",
      color: "#586069",
      borderRadius: "16px",
    },
    "&.Mui-selected": {
      backgroundColor: "#ffffff",
      color: "#586069",
      borderRadius: "16px",
    },
    "&:focus": {
      backgroundColor: "#ffffff",
      color: "#586069",
      borderRadius: "16px",
    },
  });

  const [sort, setsort] = useState("releaseDate");
  const handleChange = (event) => {
    setsort(event.target.value);
    Sort(event.target.value);
  };

  const Sort = async (sort) => {
    try {
      const res = await axios.get(`${config.endpoint}/videos?sortBy=${sort}`);
      setData(res.data);
      return res.data;
    } catch (e) {
      if (e.response && e.response.data.message) {
        console.log(e.response.data.message, { variant: "error" });
      } else {
        console.log("Something went wrong", { variant: "error" });
      }
    }
  };

  const handleGenre = (event) => {
    GenreListHandler(event.target.value);
  };

  const GenreListHandler = (SelectedGenre) => {
    if (SelectedGenre === "All") {
      setGenreList(["All"]);
    } else {
      GenreList = GenreList.filter((item) => item !== "All");
      if (GenreList.includes(SelectedGenre)) {
        GenreList = GenreList.filter((e) => e !== SelectedGenre);
        setGenreList(GenreList);
      } else {
        GenreList.push(SelectedGenre);
        setGenreList(GenreList);
      }
      if (GenreList.length === 0) {
        setGenreList(["All"]);
      }
    }
  };

  const ContentRatingHandler = (event) => {
    setContentRadting(event.target.value);
    if (ContentRating === event.target.value) {
      setContentRadting("Anyone");
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="GenrePanels"
    >
      <Grid
        container
        direction="row"
        justifyContent={{xs:"space-evenly",md:"center"}}
        alignItems="center"
        spacing={{xs:0,md:5}}
      >
        {Genres.map((Genre) => (
          <Grid item mt={1} className="bfont" key={Genre.value}>
            <ColorButton
              variant="contained"
              selected={GenreList.includes(Genre.value) ? true : false}
              value={Genre.value}
              onClick={handleGenre}
            >
              {Genre.label}
            </ColorButton>
          </Grid>
        ))}

        <Grid item mt={1}>
          <CustomSelect
            className="icon"
            value={sort}
            defaultValue={"releaseDate"}
            onChange={handleChange}
            IconComponent={""}
          >
            <MenuItem value={"releaseDate"}>Release Date</MenuItem>
            <MenuItem value={"viewCount"}>View Count</MenuItem>
          </CustomSelect>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent={{xs:"space-evenly",md:"center"}}
        alignItems="center"
        spacing={{xs:0,md:5}}
      >
        {ContentRatings.map((Rating) => (
          <Grid item mt={2} key={Rating.value}>
            <ColorButton
              value={Rating.value}
              selected={ContentRating === Rating.value ? true : false}
              onClick={ContentRatingHandler}
              variant="contained"
            >
              {Rating.label}
            </ColorButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default GenrePanel;
