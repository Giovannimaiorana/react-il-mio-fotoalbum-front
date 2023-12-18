import React, { useState, useEffect } from "react";
import style from "../css/module/AppGallery.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AppGallery() {
  const [photos, setPhotos] = useState([]);
  const [centerCardIndex, setCenterCardIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/photo");
      console.log("Data from backend:", response.data);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleShowPost = (slug) => {};

  const handleNextCard = () => {
    setCenterCardIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevCard = () => {
    setCenterCardIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <div className={style.generalContainerGalley}>
      <div className={style.carouselContainer}>
        <div className={style.sideCard} onClick={handlePrevCard}>
          <img
            src={`http://localhost:3000/${
              photos[(centerCardIndex - 1 + photos.length) % photos.length]
                ?.image
            }`}
            alt={
              photos[(centerCardIndex - 1 + photos.length) % photos.length]
                ?.title
            }
          />
        </div>

        <div className={style.galleryCard} key={photos[centerCardIndex]?.id}>
          <img
            src={`http://localhost:3000/${photos[centerCardIndex]?.image}`}
            alt={photos[centerCardIndex]?.title}
          />
          <div className={style.containerInfoImg}>
            <h2 className="font-league text-5xl tracking-widest text-white">
              {photos[centerCardIndex]?.title}
            </h2>
            <p className="font-sanchez text-sm text-white">
              {photos[centerCardIndex]?.description}
            </p>
            <p className="font-sanchez text-sm text-white">
              {photos[centerCardIndex]?.categories.map((category) => (
                <span key={category.id}>{category.name}</span>
              ))}
            </p>
          </div>
          <div className={style.containerShow}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className={style.sideCard} onClick={handleNextCard}>
          <img
            src={`http://localhost:3000/${
              photos[(centerCardIndex + 1) % photos.length]?.image
            }`}
            alt={photos[(centerCardIndex + 1) % photos.length]?.title}
          />
        </div>
      </div>
    </div>
  );
}
