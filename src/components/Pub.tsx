import "../assets/css/main.css";
import banner from "../assets/imgs/banner/banner-4.jpg";

function Pub() {
  return (
    <>
      <section className="banner-2 section-padding pb-0">
        <div className="container">
          <div className="banner-img banner-big wow fadeIn animated f-none animated animated">
            <img src={banner} alt="banner image for software" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Pub;
