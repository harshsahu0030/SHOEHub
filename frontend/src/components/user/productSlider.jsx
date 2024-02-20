import { useEffect, useState } from "react";

export default function ProductSlider(imagesData) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setImages(imagesData.imagesData);
  }, [imagesData]);

  return (
    <div className="productSlider_container">
      <div className="circle-indicators">
        {images && images.length
          ? images.map((item, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator active-indicator"
                    : "current-indicator"
                }
                onMouseEnter={() => setCurrentSlide(index)}
              >
                <img src={item.url} alt="item.download_url" />
              </button>
            ))
          : null}
      </div>
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.url}
              alt={imageItem.url}
              src={imageItem.url}
              className={
                currentSlide === index
                  ? "current-image fade"
                  : "current-image hide-current-image fade"
              }
            />
          ))
        : null}
    </div>
  );
}
