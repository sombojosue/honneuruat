import { Carousel } from "react-bootstrap";

const Banner = () => {
  const images = [
    {
      src: "https://inovsell.com/assets/imgs/slider/slider-1.jpg",
      alt: "Shoe 1",
      caption: "",
    },
    {
      src: "https://inovsell.com/assets/imgs/slider/slider-2.jpg",
      alt: "Shoe 2",
      caption: "",
    },
    {
      src: "https://inovsell.com/assets/imgs/slider/slider-3.jpg",
      alt: "Shoe 3",
      caption: "",
    },
  ];

  return (
    <Carousel fade className="container my-3">
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
  );
};

export default Banner;
