import Slider from "react-slick";
import team from "../assets/Transhumans - Astro.png";
import jacob from "../assets/jacobCropped.png";
import anthony from "../assets/anthonys pfp.jpg";
import trevor from "../assets/Trevor pic.jpg";
import paul from "../assets/paul_pick.jpg";
import alex from "../assets/alex_pfp.jpg";
import maria from "../assets/Maria pic.png";
import caleb from "../assets/caleb-profilepic.jpg";

function PauseOnHover() {
  const cardStyle = "w-[250px] p-0 rounded-2xl overflow-hidden";

  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div className={`${cardStyle} bg-purple-900`}>
            <img
              src={paul}
              alt=""
              className=" w-[250px] h-[320px] object-cover"
            />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Paul Vinueza</h3>
            <p className="text-gray-500">Project Manager</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle} bg-purple-900`}>
            <img
              src={alex}
              alt=""
              className="w-[250px] h-[320px] object-cover"
            />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Alex Leventis</h3>
            <p className="text-gray-500">Backend</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle} bg-purple-700`}>
            <img src={caleb} alt="" className="self-end  relative top-4" />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Caleb Mackenzie</h3>
            <p className="text-gray-500">Backend</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle} bg-purple-600`}>
            <img
              src={maria}
              alt=""
              className="w-[250px] h-[320px] object-cover"
            />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Maria Artur</h3>
            <p className="text-gray-500">Frontend</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle}`}>
            <img
              src={trevor}
              alt=""
              className="self-end relative w-[250px] h-[320px]"
            />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Trevor Mongar</h3>
            <p className="text-gray-500">Frontend</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle} bg-purple-400`}>
            <img src={jacob} alt="" className="w-[250px] h-[320px]" />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Jacob Spitler</h3>
            <p className="text-gray-500">Mobile</p>
          </div>
        </div>
        <div>
          <div className={`${cardStyle} bg-purple-300`}>
            <img src={anthony} alt="" className="w-[250px] h-[320px]" />
          </div>
          <div className="pt-2 pl-4 leading-3">
            <h3 className="text-2xl font-bold">Anthony Le</h3>
            <p className="text-gray-500">Database</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default PauseOnHover;
