import React from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const image1 = "https://images.unsplash.com/photo-1570215778372-2a5b29c18fc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80"
const image2 = "https://images.unsplash.com/photo-1517940310602-26535839fe84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
const image3 = "https://images.unsplash.com/photo-1613309440822-38f3fb0d5477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
const image4 = "https://images.unsplash.com/photo-1526816619231-e426e697193e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"

const imageArray = [image1, image2, image3, image4]; 

const Hero = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  return (
    <Carousel
    infiniteLoop
    showThumbs={false}
    showIndicators={false}
    showStatus={false}
    renderArrowPrev={(onClickHandler, hasPrev, label) => (
      <IconButton
        onClick={onClickHandler}
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          color: "white",
          padding: "5px",
          zIndex: "10",
        }}
      >
        <NavigateBeforeIcon sx={{ fontSize: 40 }} />
      </IconButton>
    )}
    renderArrowNext={(onClickHandler, hasNext, label) => (
      <IconButton
        onClick={onClickHandler}
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          color: "white",
          padding: "5px",
          zIndex: "10",
        }}
      >
        <NavigateNextIcon sx={{ fontSize: 40 }} />
      </IconButton>
    )}
  >
    {imageArray.map((texture, index) => (
      <Box key={`carousel-image-${index}`}>
        <img
          src={texture}
          alt={`carousel-${index}`}
          style={{
            width: "100%",
            height: "700px",
            objectFit: "cover",
            backgroundAttachment: "fixed",
          }}
        />
        <Box
        sx={{
          color:"white",
          padding:"20px",
          borderRadius:"1px",
          textAlign:"left",
          backgroundColor:"rgb(0, 0, 0, 0.4)",
          position:"absolute",
          top:"46%"
        }}
          left={isNonMobile ? "10%" : "0"}
          right={isNonMobile ? undefined : "0"}
          margin={isNonMobile ? undefined : "0 auto"}
          maxWidth={isNonMobile ? undefined : "240px"}
        >
          <Typography color="secondary.200">-- NEW ITEMS</Typography>
          <Typography variant="h1">Summer Sale</Typography>
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
          >
            Discover More
          </Typography>
        </Box>
      </Box>
    ))}
  </Carousel>
  );
};

export default Hero;
