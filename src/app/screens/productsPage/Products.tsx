import { Box, Button, Container, Stack, useRadioGroup } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/car";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/car.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const ProductsRetriever = createSelector(
   retrieveProducts,
   (products) => ({
    products
 }));

export default function Products() {
  const {setProducts} = actionDispatch(useDispatch());
  const {products} = useSelector(ProductsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(()=> {
    const product = new ProductService();
    product.getProducts(productSearch)
    .then((data)=> setProducts(data))
    .catch((err)=> console.log(err));
  }, [productSearch]);

/** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
  }

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({...productSearch}) 
  }

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({...productSearch});
  }

  useEffect(()=> {
    if(searchText === ""){
      productSearch.search = "";
      setProductSearch({...productSearch});
    }
  }, [searchText]);

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`)
  }

  return (
    <div>
      <div className="products">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Stack className="avatar-big-box">
              <Box className={"title"}>Bumarak Restaurant</Box>
              <Box className={"single-search-big-box"}>
                <input
                  type="search"
                  className="single-search-input"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e)=> {
                    if(e.key === "Enter") searchProductHandler();
                  }}
                  />
                <Button
                  className="single-search-button"
                  variant="contained"
                  color={"primary"}
                  endIcon = {<SearchIcon />}
                  onClick={searchProductHandler}
                  >
                  Search
                </Button>
              </Box>
            </Stack>
            <Stack className="dishes-filter-section">
              <Stack className="dishes-filter-box">
                <Button 
                    variant="contained" 
                    className="order"
                    color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                    onClick={()=> searchOrderHandler("createdAt")}
                    >
                  NEW
                </Button>
                <Button
                  variant="contained"
                  className="order"
                  color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                  onClick={()=> searchOrderHandler("productPrice")}
                  >
                  PRICE
                </Button>
                <Button
                  variant="contained"
                  className="order"
                  color={productSearch.order === "productViews" ? "primary" : "secondary"}
                  onClick={()=> searchOrderHandler("productViews")}
                  >
                  VIEW
                </Button>
              </Stack>
            </Stack>
            
            <Stack className="list-category-section">
              <Stack className="product-category">
                <Stack className="category-main">
                  <Button 
                      variant={"contained"} 
                      color={productSearch.productCollection === ProductCollection.OTHER
                        ? "primary" 
                        : "secondary"}
                      onClick={() => searchCollectionHandler(ProductCollection.OTHER)} >
                    OTHER
                  </Button>
                  <Button 
                      variant="contained" 
                     color={productSearch.productCollection === ProductCollection.DESSERT
                        ? "primary" 
                        : "secondary"}
                      onClick={() => searchCollectionHandler(ProductCollection.DESSERT)} >
                    DESSESRT
                  </Button>
                  <Button 
                      variant="contained" 
                      color={productSearch.productCollection === ProductCollection.DRINK
                        ? "primary" 
                        : "secondary"}
                       onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                    DRINK
                  </Button>
                  <Button 
                      variant="contained" 
                      color={productSearch.productCollection === ProductCollection.SALAD
                        ? "primary" 
                        : "secondary"}
                      onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                    SALAD
                  </Button>
                  <Button 
                      variant="contained" 
                      color={productSearch.productCollection === ProductCollection.DISH 
                        ? "primary" 
                        : "secondary"}
                       onClick={() => searchCollectionHandler(ProductCollection.DISH)} >
                    DISH
                  </Button>
                </Stack>
              </Stack>
              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =  product.productCollection === ProductCollection.DRINK 
                    ? product.productVolume + 'l' 
                    : product.productSize + " size"
                    return (
                      <Stack key={product._id} className={"product-card"} onClick={()=>{chooseDishHandler(product._id)}}>
                        <Stack
                          className={"product-image"}
                          sx={{ backgroundImage: `url(${imagePath})` }}>
                          <div className="product-sale">{sizeVolume}</div>
                          <Button className="view-btn" sx={{ right: "36px" }}>
                            <Badge badgeContent={product.productViews} color="secondary">
                              <RemoveRedEyeIcon
                                sx={{
                                  color: product.productViews === 0 ? "gray" : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className={"product-desc"}>
                          <span className="product-title">
                            {product.productName}
                          </span>
                          <span className="product-price">
                            <MonetizationOnIcon />
                            {product.productPrice}
                          </span>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className={"no-data"}>Products are not available!</Box>
                )}
              </Stack>
            </Stack>
            <Stack className="pagination-section">
              <Pagination
                count={products.length !== 0 
                  ? productSearch.page + 1 
                  : productSearch.page
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color="secondary"
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="brands-logo">
        <Container>
          <Stack className="main">
            <Box className="title">Our Family Brands</Box>
            <Stack className="brand-cards">
              <Box className="brand-card">
                <img src="/img/gurme.webp" alt="" />
              </Box>
              <Box className="brand-card">
                <img src="/img/seafood.webp" alt="" />
              </Box>
              <Box className="brand-card">
                <img src="/img/sweets.webp" alt="" />
              </Box>
              <Box className="brand-card">
                <img src="/img/doner.webp" alt="" />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-main">
            <Box className="title">Our adress</Box>
            <iframe
              style={{ marginTop: "60px" }}
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2949374162613!2d55.27812477436027!3d25.193274331861527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6955cdc0a649%3A0xf08ece466df23124!2sCZN%20Burak%20Dubai!5e0!3m2!1sen!2skr!4v1771656536526!5m2!1sen!2skr"
              width="1320"
              height="500"
              title="map-frame"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}
