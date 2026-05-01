import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
            <Box className="sns-context" style={{ marginTop: 20, display: "flex", gap: 12 }}>
              <img src="/icons/facebook.svg" alt="facebook" />
              <img src="/icons/twitter.svg" alt="twitter" />
              <img src="/icons/instagram.svg" alt="instagram" />
              <img src="/icons/youtube.svg" alt="youtube" />
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
                <div>Tashkent · Seoul</div>
                <div>+998 71 ••• 4781</div>
                <div>hello@auction.uz</div>
                <div>Mon–Sat · 09:00–19:00</div>
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
