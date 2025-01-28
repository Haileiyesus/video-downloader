import { BiDownload } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { FallingLines } from "react-loader-spinner";
import { styled } from "@mui/material/styles";

const VideoDownloaderPage = ({ child }) => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [qualityOptions, setQualityOptions] = useState([]);
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [message, setMessage] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  // Handle URL input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Fetch video information when the URL is submitted
  const fetchVideoInfo = async () => {
    if (!url) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setVideoInfo(null);
    setQualityOptions([]);
    setMessage("");
    setIsSearch(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/get-video-info",
        { url, video: child === "video" ? 1 : 0 }
      );
      setVideoInfo(response.data.videoTitle);
      setQualityOptions(response.data.allQualityOption);
      setVideoThumbnail(response.data.thumbnail);
      console.log(response.data.thumbnail);
      setIsSearch(false);
    } catch (error) {
      console.error(error);
      setMessage("Error fetching video information.");
      setIsSearch(false);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // Handle the download action
  // Function to handle file download with renaming
  const handleDownload = async (fileUrl) => {
    setMessage("Downloading...");
    try {
      // Create a link element to trigger the download
      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = videoInfo; // Set the desired file name
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL
      document.body.removeChild(link);
      setMessage("Download complete.");
    } catch (error) {
      console.error("Error downloading the file:", error);
      setMessage("Error downloading the file.");
    }
  };

  return (
    <div className="App">
      <h1>{child === "subtitle" ? "Subtitle" : "Video"} Downloader</h1>

      <TextField
        className="mb-3"
        type="text"
        label={`Enter ${child === "subtitle" ? "Youtube" : "Video "} url`}
        value={url}
        onChange={handleUrlChange}
        size="small"
        sx={{
          width: { xs: "250px", sm: "300px", md: "400px", lg: "500px" },
          "& .MuiInputBase-root": {
            fontSize: {
              xs: "0.7rem",
              sm: "0.85rem",
              md: "0.9rem",
            },
            padding: {
              xs: "1px",
              sm: "2px",
              md: "3px",
              lg: "4px",
            },
          },
        }}
      />
      <Button
        disabled={isSearch}
        onClick={fetchVideoInfo}
        sx={{
          width: { xs: "100px", sm: "110px", md: "120px", lg: "150px" },
          borderColor: "error.main",

          padding: {
            xs: "2px",
            sm: "4px",
            md: "5px",
            lg: "5px",
          },
          "&:hover": {
            backgroundColor: "error.main",
            color: "white",
          },
        }}
        variant="outlined"
        color="error"
        type="submit"
      >
        <div className="row">
          <div className="col" style={{ marginLeft: "-30px" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.95rem",
                  md: "1rem",
                  lg: "20px",
                },
              }}
            >
              {" "}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.5 }}
                transition={{
                  duration: 4,

                  repeatType: "loop",
                }}
              >
                <BiSearchAlt />
              </motion.div>
            </Typography>
          </div>
          <div className="col-7">
            <h5
              style={{
                float: "left",
                marginLeft: "-20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.95rem",
                    md: "1rem",
                    lg: "1.1rem",
                  },
                }}
              >
                Search
              </Typography>
            </h5>
          </div>
        </div>
      </Button>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isSearch && (
          <div className="row">
            <div className="col-4">
              <FallingLines
                color="#009A44"
                width="50"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
            <div className="col-4">
              <FallingLines
                color="#FEDD00"
                width="50"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
            <div className="col-4">
              <FallingLines
                color="#EF3340"
                width="50"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
          </div>
        )}
      </div>

      {videoInfo && (
        <div>
          <Box
            sx={(themes) => ({
              boxShadow: "10px 10px 5px 1px rgba(0, 0, 0, 0.5)",
              ...themes.applyStyles("dark", {
                bgcolor: "#101010",
                color: "grey.300",
              }),
            })}
          >
            <div className="mb-4" style={{ border: "solid 3px red" }}></div>
          </Box>
          <div
            className="row mb-3"
            style={{
              maxWidth: "780px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-20px",
              marginRight: "-20px",
            }}
          >
            <div
              className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mr-2"
              style={{ maxWidth: "270px" }}
            >
              <Box>
                <img
                  src={`https://instagram.fadd2-1.fna.fbcdn.net/v/t51.29350-15/473888063_962360639187727_2140240550199077145_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDE5MjAuc2RyLmYyOTM1MC5kZWZhdWx0X2NvdmVyX2ZyYW1lIn0&_nc_ht=instagram.fadd2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=y7SqusDfz7wQ7kNvgG6siG1&_nc_gid=40a22b8871f8451b8a0cc76f6088c0ae&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AYBHhU-e3QvGIDbynpwyARJmDtoyw_6yPLAeuOBh6nTSzg&oe=6796AB83&_nc_sid=d885a2`}
                  alt="Video Thumbnail"
                  style={{
                    width: "250px",
                    height: "400px",
                    marginBottom: "20px",
                  }}
                />
              </Box>
              <h6>
                <b>{videoInfo}</b>
              </h6>
            </div>
            <div className="col " style={{ maxWidth: "500px" }}>
              <Box>
                <TableContainer
                  component={Paper}
                  style={{ maxHeight: "450px", overflow: "scroll" }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          File Type
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Quality
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Size&nbsp;(MB)
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Download
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualityOptions.map((option) => (
                        <StyledTableRow key={option.resolution}>
                          <StyledTableCell calign="center">
                            <strong>
                              {option.format.includes("kb") ? "Audio" : "Video"}
                            </strong>
                          </StyledTableCell>
                          <StyledTableCell calign="center">
                            {option.format.includes("kb")
                              ? option.format + " (.mp3)"
                              : option.format + " (.mp4)"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {option.filesize} MB
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              title={`Download ${
                                option.format.includes("kb") ? "Audio" : "Video"
                              }`}
                              onClick={() => handleDownload(option.url)}
                              sx={{
                                width: {
                                  xs: "20px",
                                  sm: "30px",
                                  md: "40px",
                                  lg: "50px",
                                },

                                borderColor: "transparent",
                                padding: "0",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                "&:hover": {
                                  backgroundColor: "error.main",
                                  color: "white",
                                },
                              }}
                              variant="outlined"
                              color="error"
                              type="submit"
                            >
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.95rem",
                                    md: "1rem",
                                    lg: "20px",
                                  },
                                }}
                              >
                                {" "}
                                <motion.div
                                  whileHover={{ scale: 1.75 }}
                                  transition={{
                                    duration: 2,

                                    repeatType: "loop",
                                  }}
                                >
                                  <BiDownload />
                                </motion.div>
                              </Typography>
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </div>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoDownloaderPage;
