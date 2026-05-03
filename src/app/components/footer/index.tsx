import React from "react";
import { Box, Container, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Footers = styled.div`
  width: 100%;
  background: var(--footer-bg, #0b0c0e);
  color: var(--footer-text, #d8d6cf);
  padding: 64px 0 32px;
  transition: background-color 0.2s ease, color 0.2s ease;
`;

export default function Footer() {
  return (
    <Footers>
      <Container>
        <Stack flexDirection="row" flexWrap="wrap" gap="64px">
          <Stack flexDirection="column" style={{ width: "340px" }}>
            <Box className="brand-wordmark" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", color: "var(--footer-heading)" }}>
              AUCTION.UZ
            </Box>
            <Box className="foot-desc-txt" style={{ marginTop: 16, lineHeight: 1.6, opacity: 0.7 }}>
              Korean cars at fixed prices, shipped door-to-door across Central Asia and the Caucasus.
              Inspected, insured, and customs-cleared by us.
            </Box>
            <Box className="sns-context" style={{ marginTop: 20, display: "flex", gap: 4 }}>
              <IconButton
                size="small"
                component="a"
                href="#https://t.me/hmauctionuz"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", opacity: 0.8, "&:hover": { opacity: 1 } }}
                aria-label="telegram"
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="https://x.com/your_handle"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", opacity: 0.8, "&:hover": { opacity: 1 } }}
                aria-label="x"
              >
                <XIcon />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="https://instagram.com/auctionuz_kr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", opacity: 0.8, "&:hover": { opacity: 1 } }}
                aria-label="instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="https://youtube.com/@your_channel"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", opacity: 0.8, "&:hover": { opacity: 1 } }}
                aria-label="youtube"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Stack>
          <Stack flexDirection="row" gap="100px">
            <Stack>
              <Box className="foot-category-title" style={{ color: "var(--footer-heading)", fontWeight: 600, marginBottom: 16 }}>
                Marketplace
              </Box>
              <Box className="foot-category-link" style={{ display: "flex", flexDirection: "column", gap: 10, opacity: 0.75 }}>
                <Link to="/" style={{ color: "inherit" }}>Home</Link>
                <Link to="/products" style={{ color: "inherit" }}>Browse cars</Link>
                <Link to="/member-page" style={{ color: "inherit" }}>My account</Link>
                <Link to="/help" style={{ color: "inherit" }}>Help & FAQ</Link>
              </Box>
            </Stack>
            <Stack>
              <Box className="foot-category-title" style={{ color: "var(--footer-heading)", fontWeight: 600, marginBottom: 16 }}>
                Find us
              </Box>
              <Box className="foot-category-link" style={{ display: "flex", flexDirection: "column", gap: 10, opacity: 0.75 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon fontSize="small" /> Tashkent · Seoul
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" /> +998 71 ••• 4781
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" /> auction@gmail.com
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack style={{ borderTop: "1px solid var(--footer-rule)", marginTop: 60, paddingTop: 20 }}>
          <Stack className="copyright-txt" style={{ opacity: 0.5, fontSize: 12 }}>
            © {new Date().getFullYear()} Auction.uz. Korean cars, fixed-price, door delivered.
          </Stack>
        </Stack>
      </Container>
    </Footers>
  );
}
