import React, { useState } from "react";
import {
  Container,
  Arrow,
  Wrapper,
  ImgContainer,
  InfoContainer,
  Image,
  Slide,
  Title,
  Description,
  Button,
} from "../styles/Slider.styles";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (params) => {
    if (params === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  const sliderMapped = sliderItems.map((data, index) => {
    return (
      <Slide key={index} bg={data.bg}>
        <ImgContainer>
          <Image src={data.img}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{data.title}</Title>
          <Description>{data.desc}</Description>
          <Button>SHOP NOW</Button>
        </InfoContainer>
      </Slide>
    );
  });

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideTransform={slideIndex}>{sliderMapped}</Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
