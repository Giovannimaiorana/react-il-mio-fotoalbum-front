import React, { useState, useEffect } from "react";
import style from "../css/module/AppDashboard.module.css";
import axios from "axios";

export default function AppDashboard() {
  const [photos, setPhotos] = useState([]);
  const [editPhoto, setEditPhoto] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/photo");
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const responseCategories = await axios.get(
        "http://localhost:3000/category"
      );
      console.log("CategoryFromBack:", responseCategories);
      setCategories(responseCategories.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditClick = (photo) => {
    setEditPhoto(photo);
    setIsEditFormVisible(true);
  };

  const handleFormSubmit = async (editedData) => {
    try {
      await axios.put(
        `http://localhost:3000/photo/${editPhoto.id}`,
        editedData
      );
      const updatedPhotos = photos.map((photo) =>
        photo.id === editPhoto.id ? { ...photo, ...editedData } : photo
      );
      setPhotos(updatedPhotos);
      closeEditForm();
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const closeEditForm = () => {
    setIsEditFormVisible(false);
    setEditPhoto(null);
  };

  return (
    <div className={style.ContainerGeneralDashboard}>
      <div className={style.HeaderDashboard}>
        <div className={style.containerAdd}>
          <p className="font-league text-xl text-sm">Add Photo</p>
        </div>
        <div className={style.containerTitleDashboard}>
          <p className="font-sanchez text-sm">ADMIN</p>
          <p className="font-league text-5xl tracking-widest">DASHBOARD</p>
        </div>
      </div>

      <div className={style.PhotoGallery}>
        {photos.map((photo) => (
          <div key={photo.id} className={style.PhotoItem}>
            <img
              className={style.imgStyle}
              src={`http://localhost:3000/${photo.image}`}
              alt={photo.title}
            />
            <p>{photo.title}</p>
            <p>{photo.description}</p>
            <p>
              Categories:{" "}
              {photo.categories.map((category) => (
                <span key={category.id}>{category.name}, </span>
              ))}
            </p>
            <button onClick={() => handleEditClick(photo)}>Edit</button>
          </div>
        ))}
      </div>

      {isEditFormVisible && (
        <div className={style.EditFormOverlay}>
          <div className={style.EditForm}>
            <h2>Edit Photo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const editedData = Object.fromEntries(formData.entries());
                handleFormSubmit(editedData);
              }}
            >
              <div className={style.FormInput}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editPhoto.title}
                  required
                />
              </div>
              <div className={style.FormInput}>
                <label>Description:</label>
                <textarea
                  name="description"
                  defaultValue={editPhoto.description}
                  required
                ></textarea>
              </div>
              <div>
                <label>Categories:</label>
                {categories.map((category) => (
                  <div key={category.id}>
                    <input
                      type="checkbox"
                      id={`category_${category.id}`}
                      name="categories"
                      value={category.id}
                      defaultChecked={editPhoto.categories.some(
                        (cat) => cat.id === category.id
                      )}
                    />
                    <label htmlFor={`category_${category.id}`}>
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <button type="submit">Save</button>
              </div>
            </form>
            <button className={style.EscButton} onClick={closeEditForm}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
