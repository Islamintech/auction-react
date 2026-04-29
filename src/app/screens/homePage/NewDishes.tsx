import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { retrieveNewDishes } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/car";
import { ProductCollection } from "../../../lib/enums/car.enum";

const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ newDishes })
);

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + " size";
                  return (
                    <Card key={product._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className={"product-detail"}>
                        {/* Single row: [name | price] on left, [views 👁] on right */}
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          className={"info"}
                        >
                          {/* Left: name + divider + price */}
                          <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            sx={{ overflow: "hidden", minWidth: 0 }}
                          >
                            <Typography
                              className={"title"}
                              sx={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"} sx={{ whiteSpace: "nowrap" }}>
                              {product.productPrice}
                            </Typography>
                          </Stack>

                          {/* Right: views + eye icon */}
                          <Typography
                            className={"views"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              whiteSpace: "nowrap",
                              ml: 1,
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>New products are not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}