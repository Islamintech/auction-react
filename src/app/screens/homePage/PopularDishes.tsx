import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePopularDishes } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/car";

/** REDUX SLICE & SELECTOR **/
const PopularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(PopularDishesRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      {/* Image */}
                      <CardCover>
                        <img src={imagePath} alt="" />
                      </CardCover>

                      {/* Dark gradient overlay */}
                      <CardCover className={"card-cover"} />

                      {/* Bottom of image: name (left) + views + eye icon (right) */}
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          mb={1}
                        >
                          <Typography level="h2" fontSize="lg" textColor="#fff">
                            {product.productName}
                          </Typography>

                          <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={0.5}
                          >
                            <Typography fontSize="sm" textColor="#fff">
                              {product.productViews}
                            </Typography>
                            <VisibilityIcon sx={{ fontSize: 20, color: "#fff" }} />
                          </Stack>
                        </Stack>
                      </CardContent>

                      {/* Footer bar: description only */}
                      <CardOverflow
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 1,
                          py: 1,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid rgba(255,255,255,0.15)",
                          bgcolor: "rgba(0,0,0,0.55)",
                          minHeight: "48px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon sx={{ fontSize: 18 }} />}
                          textColor="neutral.300"
                          fontSize="sm"
                          sx={{
                            flex: 1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular dishes are not available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}