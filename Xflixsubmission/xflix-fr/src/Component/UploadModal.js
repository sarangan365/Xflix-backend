import { useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Genres } from "./GenrePanel";
import axios from "axios";
import { config } from "../App";
import { ContentRatings } from "./GenrePanel";
import moment from "moment";
// import { useSnackbar } from "notistack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #121212",
  boxShadow:
    " 0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
  p: 4,
};
const CustomTextField = styled(TextField)({
  "& label": {
    color: "#bfbfbf",
  },
  "& label.Mui-focused": {
    color: "#bfbfbf",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ebebeb",
  },
  "& .MuiFormHelperText-root": {
    color: "#bfbfbf",
  },
  "& .MuiOutlinedInput-root": {
    color: "#ffffff",
    "& fieldset": {
      borderColor: "#bfbfbf",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ebebeb",
    },
  },
});
export default function UploadModal({
  handleClose,
  open,
  onLoadHandler,
}) {
  // const { alert } = useSnackbar();
  const RawData = {
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  };
  const [inputs, setInputs] = useState(RawData);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const UploadData = async (Data) => {
    const postData = {
      ...Data,
      releaseDate: moment(Data.releaseDate).format("DD MMM YYYY"),
    };
    validateInput(postData);
    try {
      console.log(postData);
      const res = await axios.post(`${config.endpoint}/videos`, postData);
      if (res.status === 201) {
        console.log("Video Uploaded Successfully", { variant: "success" });
        setInputs(RawData);
        handleClose();
        onLoadHandler();
      }
    } catch (e) {
      if (e && e.response && e.response.data) {
        console.log(e.response.data.message, { variant: "error" });
      } else {
        console.log("Something went wrong", { variant: "error" });
      }
    }
  };
  const validateInput = (data) => {
    let validData = { ...data };

    if (!validData.videoLink) {
      console.log("Video link is required!", {
        variant: "warning",
      });
      return false;
    }
    if (!validData.title) {
      console.log("Title is required!", {
        variant: "warning",
      });
      return false;
    }
    if (!validData.genre) {
      console.log("Genre is required!", {
        variant: "warning",
      });
      return false;
    }
    if (!validData.contentRating) {
      console.log("Age group is required!", {
        variant: "warning",
      });
      return false;
    }
    if (!validData.releaseDate) {
      console.log("Upload and Publish date is required!", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{ color: "#ffffff" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>Upload</Box>
            <ClearIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleClose}
            />
          </Stack>
          <Stack spacing={2} mt={3}>
            <CustomTextField
              required
              name="videoLink"
              label="Video Link"
              helperText="This link will be used to derive the video"
              value={inputs.videoLink}
              onChange={handleChange}
              fullWidth
            />
            <CustomTextField
              required
              name="previewImage"
              label="Thumbnail Image Link"
              value={inputs.previewImage}
              onChange={handleChange}
              helperText="This link will be used to preview the thumbnail image"
              fullWidth
            />
            <CustomTextField
              required
              name="title"
              label="Title"
              value={inputs.title}
              onChange={handleChange}
              helperText="This title will be the representative text for video"
              fullWidth
            />
            <CustomTextField
              select
              required
              name="genre"
              label="Genre"
              value={inputs.genre}
              onChange={handleChange}
              helperText="Genre will help in categorizing your videos"
            >
              {Genres.map((Genre) => {
                return (
                  <MenuItem key={Genre.value} value={Genre.value}>
                    {Genre.label}
                  </MenuItem>
                );
              })}
            </CustomTextField>
            <CustomTextField
              select
              required
              name="contentRating"
              value={inputs.contentRating}
              onChange={handleChange}
              label="Suitable age group for the clip"
              helperText="This will be used to filter videos on age group suitability"
            >
              {ContentRatings.map((Rating) => {
                return (
                  <MenuItem key={Rating.label} value={Rating.label}>
                    {Rating.label}
                  </MenuItem>
                );
              })}
            </CustomTextField>
            <CustomTextField
              type="date"
              name="releaseDate"
              label="Release date"
              helperText="This will be used to sort videos"
              InputLabelProps={{
                shrink: true,
              }}
              value={inputs.releaseDate}
              onChange={handleChange}
            ></CustomTextField>
          </Stack>
          <Stack
            mt={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => UploadData(inputs)}
            >
              Upload Video
            </Button>
            <Button
              variant="text"
              sx={{ color: "#ffffff" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
