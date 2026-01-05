import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        background: "#f5f5f7",
        borderTop: "1px solid rgba(0, 0, 0, 0.04)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {/* Copyright */}
          <Typography
            variant="caption"
            sx={{
              color: "#86868b",
              fontSize: "0.75rem",
            }}
          >
            © {currentYear} Splitify
          </Typography>

          {/* Made by */}
          <Typography
            variant="caption"
            sx={{
              color: "#86868b",
              fontSize: "0.75rem",
            }}
          >
            Made by Aman
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
