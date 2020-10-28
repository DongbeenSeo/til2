import React, { useState, useCallback } from "react";
import { Icon } from "antd";
import ImagesZoom from "./ImagesZoom";
import Const from '../const'

const PostImages = ({ images }) => {
  const imageSource = (path) => {
    return `http://localhost:${Const.port}/${path}`;
  };
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <div style={{ maxWidth: "300px", height: "auto", margin: "0 auto" }}>
          <img
            src={imageSource(images[0].src)}
            style={{ width: "100%", height: "auto" }}
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img
            src={imageSource(images[0].src)}
            style={{ width: "50%" }}
            onClick={onZoom}
          />
          <img
            src={imageSource(images[1].src)}
            style={{ width: "50%" }}
            onClick={onZoom}
          />
        </div>

        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <img src={imageSource(images[0].src)} style={{ widh: "50%" }} />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}>
          <Icon type="plus" />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>

      {showImagesZoom && (
        <ImagesZoom key={`images`} images={images} onClose={onClose} />
      )}
    </>
  );
};

export default PostImages;
