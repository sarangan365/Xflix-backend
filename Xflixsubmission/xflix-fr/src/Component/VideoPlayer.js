import { Grid, Box, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
//import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../App";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "./VideoPlayer.css";
import CircleIcon from "@mui/icons-material/Circle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Divider from "@mui/material/Divider";

const VideoPlayer = ({ videoid }) => {
  const ColorButton = styled(Button)({
    textTransform: "capitalize",
    color: "#ffffff",
    fontsize: "1.5rem",
    backgroundColor: "#313131",
    border: "1px solid #444D56",
    borderRadius: "16px",
    boxShadow: "none",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: "#545454",
      color: "#ffffff",
      borderRadius: "16px",
    },
    "&:active": {
      backgroundColor: "#545454",
      color: "#ffffff",
      borderRadius: "16px",
    },
    "&:focus": {
      backgroundColor: "#545454",
      color: "#ffffff",
      borderRadius: "16px",
    },
  });
  //const { enqueueSnackbar } = useSnackbar();
  const [Video, setVideo] = useState([]);
  const [votes, setVotes] = useState({
    upVote: false,
    downVote: false,
  });

  useEffect(() => {
    onupdate(videoid);
    // eslint-disable-next-line
  }, [videoid]);
  const onupdate = async (videoid) => {
    const url = `${config.endpoint}/videos/${videoid}`;
    const res = await getVideo(url);
    setVideo(res);
  };

  const getVideo = async (url) => {
    try {
      const res = await axios.get(url);
      setVideo(res.data);
      return res.data;
    } catch (e) {
      if (e.response && e.response.data.message) {
        console.log(e.response.data.message, { variant: "error" });
        return null;
      } else {
        console.log("Something went wrong", { variant: "error" });
        return null;
      }
    }
  };

  const performPatchCall = async (URL, data = {}) => {
    try {
      if (data) {
        await axios.patch(URL, data);
      } else {
        await axios.patch(URL);
      }
      return true;
    } catch (e) {
      if (e.response && e.response.data.message) {
        console.log(e.response.data.message, { variant: "error" });
      } else {
        console.log("Something went wrong", { variant: "error" });
      }
    }
  };

  const updateVote = async (name, id) => {
    const URL = `${config.endpoint}/videos/${id}/votes`;
    const data = {
      vote: name,
      change: "increase",
    };
    let response = await performPatchCall(URL, data);
    if (response) {
      setVotes({ ...votes, [name]: true });
      onupdate(id);
    }
  };

  const increaseViewCount = async (id) => {
    const URL = `${config.endpoint}/videos/${id}/views`;
    await performPatchCall(URL);
  };

  useEffect(() => {
    increaseViewCount(videoid);
    // eslint-disable-next-line
  }, [videoid]);
  return (
    <>
      {Video && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
          pl={{ xs: 2, md: 8, lg: 16 }}
          pr={{ xs: 2, md: 8, lg: 16 }}
        >
          <Grid container direction="row" alignItems="center" pl={1}>
            <Grid item xs={12} md={12}>
              <Box className="video-responsive" component="div">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.${Video.videoLink}`}
                  frameBorder=""
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            display={{ xs: "flex", md: "none" }}
            alignItems="center"
            pl={2}
          >
            <Grid item xs={12} sx={{ color: "#ffffff" }}>
              <Typography fontSize={{ xs: "1.2rem", md: "2rem" }}>
                {Video.title}
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center" pl={2}>
            <Grid item xs={6} sx={{ color: "#ffffff" }}>
              <Stack spacing={1}>
                <Typography
                  display={{ xs: "none", md: "flex" }}
                  fontSize={{ xs: "1.2rem", md: "2rem" }}
                >
                  {Video.title}
                </Typography>
                <Typography
                  fontSize={{ xs: "0.8rem", md: "1rem" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid container direction="row" alignItems="center">
                    <Grid item pr={1}>{Video.viewCount} Views {" "}</Grid>
                    <Grid item pr={1}>
                      <CircleIcon sx={{ fontSize: "0.5rem" }} /> {Video.genre}{" "}
                    </Grid>
                    <Grid item>
                      <CircleIcon sx={{ fontSize: "0.5rem" }} />{" "}
                      {moment(Video.releaseDate).fromNow()}
                    </Grid>
                  </Grid>
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack
                justifyContent="flex-end"
                direction="row"
                alignItems="flex-end"
                spacing={2}
              >
                <ColorButton
                  variant="contained"
                  startIcon={<ThumbUpIcon />}
                  onClick={(e) => {
                    updateVote("upVote", videoid);
                  }}
                >
                  {Video.votes && Video.votes.upVotes}
                </ColorButton>
                <ColorButton
                  variant="contained"
                  startIcon={<ThumbDownIcon />}
                  onClick={(e) => {
                    updateVote("downVote", videoid);
                  }}
                >
                  {Video.votes && Video.votes.downVotes}
                </ColorButton>
              </Stack>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={12} mt={2}>
              <Divider sx={{ borderColor: "rgba(216, 216, 216, 0.5)" }} />
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};
export default VideoPlayer;
