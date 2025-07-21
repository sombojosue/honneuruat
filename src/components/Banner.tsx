import { Carousel } from "react-bootstrap";
import sliderFour from "../assets/imgs/banner/banner-5.jpg";
//import sliderFive from "../assets/imgs/banner/banner-7.jpg";
import sliderOne from "../assets/imgs/slider/slider-1.jpg";
import sliderTwo from "../assets/imgs/slider/slider-2.jpg";
import sliderThree from "../assets/imgs/slider/slider-3.jpg";

const Banner = () => {
  const images = [
    {
      src: sliderOne,
      alt: "Shoe 1",
      caption: "",
    },
    {
      src: sliderTwo,
      alt: "Shoe 2",
      caption: "",
    },
    {
      src: sliderThree,
      alt: "Shoe 3",
      caption: "",
    },
  ];

  return (
    <>
      <Carousel fade className="col-lg-9">
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: "470px" }}
            />
            <Carousel.Caption>
              <h5>{img.caption}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="col-lg-3 d-md-none d-sm-none d-lg-block">
        <div className="banner-img banner-1">
          <img
            className="border-radius-10"
            src={sliderFour}
            alt="slide image"
            style={{ width: "100%", height: "459px" }}
          />
        </div>
        <div className="banner-img banner-2">
          {/*
          <img
            className="border-radius-10"
            src={sliderFive}
            alt="slide image"
          />
          */}
        </div>
      </div>
    </>
  );
};

export default Banner;
