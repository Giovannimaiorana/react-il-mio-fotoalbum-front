import React, { useState, useEffect } from "react";
import style from "../css/module/TheCarousel.module.css";
import img1 from "../assets/fotouno.jpg";
import img2 from "../assets/fotodue.jpg";
import img3 from "../assets/fototre.jpg";
import img4 from "../assets/fotoquattro.jpg";
import instaLogo from "../assets/instaLogo.svg";
import pinterestLogo from "../assets/pinterestLogo.svg";
import fbLogo from "../assets/fbLogo.svg";

const slides = [
  {
    image: img1,
    text: "SAMU MA",
    index: 1,
  },
  {
    image: img2,
    text: "SECONDO",
  },
  {
    image: img3,
    text: "TE",
  },
  {
    image: img4,
    text: "ENTRA?",
  },
];

export default function AppHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className={style.containerGeneral}>
        <div className={style.overlay}></div>
        <div className={style.carouselContainer}>
          <div className={style.carouselElement}>
            <img
              className={style.imgStyle}
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
            />
            <button className={style.buttonPrev} onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                style={{ width: "60px", height: "60px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div className={style.bulletsContainer}>
              {[currentSlide].map((index) => (
                <div
                  className={`${style.activeBullet} ${style.animatingBullet}`}
                  key={index}
                  onClick={() => goToSlide(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <button className={style.buttonNext} onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6s h-6"
                style={{ width: "60px", height: "60px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <div className={style.containerSlogan}>
              <div>
                <p className="text-white font-league text-9xl">PHOTO TIME</p>
                <p className="text-white font-sanchez text-sm -mt-3 flex">
                  Capturing Moments, Creating Memories
                </p>
              </div>
            </div>
            <div className={style.containerSocial}>
              <div className="mr-3">
                <img src={instaLogo} alt="" />
              </div>
              <div className="mr-3">
                <img src={pinterestLogo} alt="" />
              </div>
              <div className="mr-3">
                <img src={fbLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
