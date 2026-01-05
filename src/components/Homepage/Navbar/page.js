import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 48, sm: 52 }, py: 0.5 }}>
          {/* Logo & Brand */}
          <Box
            onClick={handleHomeClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "opacity 150ms ease",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 600,
                color: "#1d1d1f",
                letterSpacing: "-0.02em",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Splitify
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {location.pathname !== "/" && (
              <Tooltip title="Home">
                <IconButton
                  onClick={handleHomeClick}
                  size="small"
                  sx={{
                    color: "#1d1d1f",
                    transition: "all 150ms ease",
                    "&:hover": {
                      background: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <HomeIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
