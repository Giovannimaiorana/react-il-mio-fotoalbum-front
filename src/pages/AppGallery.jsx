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
          <div>
            <h2>{photos[centerCardIndex]?.title}</h2>
            <p>{photos[centerCardIndex]?.description}</p>
            <p>
              {photos[centerCardIndex]?.categories.map((category) => (
                <span key={category.id}>{category.name}</span>
              ))}
            </p>
          </div>

          <button onClick={() => handleShowPost(photos[centerCardIndex]?.slug)}>
            Show
          </button>
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
