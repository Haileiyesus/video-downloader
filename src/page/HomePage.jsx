import React from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import VideoDownloaderPage from "./VideoDownloaderPage";
const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 500, md: 769, lg: 1024, xl: 1440 } },
});
const HomePage = () => {
  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <ThemeProvider theme={theme}>
      <Typography
        sx={{
          fontSize: {
            xs: "13px",
            sm: "14px", //500
            md: "16px", //768
            lg: "18px", //1024
          },
        }}
      >
        <center>
          <Box
            sx={(themes) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 0 25px 5px rgba(0, 0, 0, 1)",
              width: { xs: "400px", sm: "500px", md: "650px", lg: "800px" },
              height: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
              bgcolor: "#fff",
              color: "grey.800",
              p: 2,
              m: 2,
              borderRadius: 4,
              ...themes.applyStyles("dark", {
                bgcolor: "#101010",
                color: "grey.300",
              }),
            })}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                width: "100%",
                backgroundColor: "red",
                color: "white",
                zIndex: 1000,
                borderRadius: "15px",
              }}
            >
              <nav className="m-3">
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    listStyleType: "none",
                    padding: 0,
                  }}
                >
                  {["Home", "Video", "Subtitle"].map((tab) => (
                    <li
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: activeTab === tab ? "red" : "white",
                        backgroundColor: activeTab === tab ? "white" : "red",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                    >
                      {tab}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mt-3 mb-2" style={{ overflow: "hidden" }}>
              {activeTab === "Video" && <VideoDownloaderPage child={"video"} />}
              {activeTab === "Subtitle" && (
                <VideoDownloaderPage child={"subtitle"} />
              )}
            </div>
          </Box>
        </center>
      </Typography>
    </ThemeProvider>
  );
};

export default HomePage;
