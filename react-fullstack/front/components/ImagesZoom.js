import React, { useState } from "react";
import Slick from "react-slick";
import { Icon } from "antd";
import styled from "styled-components";

import Const from "../const";

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: #fff;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

const ImgWrapper = styled.div`
  text-align: center;
  & img {
    max-width: 750px;
    height: auto;
    margin: 0 auto;
    padding: 30px;
  }
`;

const CloseButton = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #9d9d9d;
    display: inline-block;
    text-align: center;
    color: #fff;
    font-size: 15px;
  }
`;

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (slide) => {
      setCurrentSlide(slide);
    },
  };

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton type="close" onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Slick {...settings}>
          {images.map((value, index) => {
            return (
              <ImgWrapper key={index}>
                <img src={`http://localhost:${Const.port}/${value.src}`} />
              </ImgWrapper>
            );
          })}
        </Slick>
        <Indicator>
          <div>
            {currentSlide + 1} / {images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImagesZoom;
