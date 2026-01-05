import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountBalanceWalletIcon
              sx={{
                color: "#667eea",
                fontSize: 20,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Splitify
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.8rem",
            }}
          >
            © 2022 Made with
            <FavoriteIcon sx={{ fontSize: 14, color: "#ef4444" }} />
            for easy expense splitting
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
