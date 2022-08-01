import { Search, Upload } from "@mui/icons-material";
import "./Header.css";
import { Box, Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import UploadModal from "./UploadModal";
const Header = ({ setSearchData, performSearch, onLoadHandler, HiddenButtons }) => {
  const history = useHistory();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchData((search) => ({ ...search, [name]: value }));
  };
  const Goback = () => {
    history.push("/", { from: "Header" });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <UploadModal
        onLoadHandler={onLoadHandler}
        handleClose={handleClose}
        open={open}
        handleOpen={handleOpen}
      />
      <Box className="header">
        <Box
          className="title"
          onClick={() => Goback()}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <span className="red">X</span>Flix
        </Box>
        {HiddenButtons && (
          <>
            <Box
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              className="search search-desktop"
              width="40vw"
            >
              <TextField
                sx={{
                  backgroundColor: "#121212",
                  width: "100%",
                  input: {
                    borderRadius: "2px 0px 0px 2px",
                    border: "1px solid #444D56",
                    color: "#ffffff",
                    "&::placeholder": {
                      color: "#606060",
                    },
                    "&::-webkit-input-placeholder": {
                      color: "#606060",
                    },
                  },
                }}
                onChange={handleChange}
                variant="outlined"
                id="outlined-basic"
                size="small"
                placeholder="Search"
                name="search"
              />
              <Button
                size="large"
                sx={{
                  boxShadow: "none",
                  backgroundColor: "#313131",
                  border: "1px solid #444D56",
                  borderRadius: "0px 2px 2px 0px",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: "#545454",
                    border: "1px solid #444D56",
                  },
                  "&:active": {
                    boxShadow: "none",
                    backgroundColor: "#545454",
                    border: "1px solid #444D56",
                  },
                }}
                onClick={() => performSearch()}
                variant="contained"
                endIcon={<Search sx={{ color: "#606060" }} />}
              ></Button>
            </Box>

            <Box>
              <Button
                className="upload"
                variant="outlined"
                startIcon={<Upload />}
                onClick={handleOpen}
              >
                Upload
              </Button>
            </Box>
          </>
        )}
      </Box>
      {HiddenButtons && (
        <Box
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          className="search search-mobile"
          fullwidth
        >
          <TextField
            sx={{
              backgroundColor: "#121212",
              width: "100%",
              input: {
                borderRadius: "2px 0px 0px 2px",
                border: "1px solid #444D56",
                color: "#ffffff",
                "&::placeholder": {
                  color: "#606060",
                },
                "&::-webkit-input-placeholder": {
                  color: "#606060",
                },
              },
            }}
            onChange={handleChange}
            variant="outlined"
            id="outlined-basic"
            size="small"
            placeholder="Search"
            name="search"
          />
          <Button
            size="large"
            sx={{
              boxShadow: "none",
              backgroundColor: "#313131",
              border: "1px solid #444D56",
              borderRadius: "0px 2px 2px 0px",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "#545454",
                border: "1px solid #444D56",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#545454",
                border: "1px solid #444D56",
              },
            }}
            onClick={() => performSearch()}
            variant="contained"
            endIcon={<Search sx={{ color: "#606060" }} />}
          ></Button>
        </Box>
      )}
    </>
  );
};
export default Header;
