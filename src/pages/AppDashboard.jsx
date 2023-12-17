import React, { useState, useEffect } from "react";
import style from "../css/module/AppDashboard.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const handleDeleteClick = async (photo) => {
    try {
      await axios.delete(`http://localhost:3000/photo/${photo.slug}`);
      // Dopo aver eliminato la foto, aggiorna lo stato eliminando la foto dalla lista
      setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photo.id));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleFormSubmit = async (editedData) => {
    try {
      await axios.put(
        `http://localhost:3000/photo/${editPhoto.slug}`,
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
          <Link to="/AddPhoto">
            <p className="font-league text-2xl">Add Photo</p>
          </Link>
          <Link to="/lamiaposta">
            <p className="font-league text-2xl">Email in arrivo</p>
          </Link>
        </div>
        <div className={style.containerTitleDashboard}>
          <p className="font-sanchez text-sm">ADMIN</p>
          <p className="font-league text-5xl tracking-widest">DASHBOARD</p>
        </div>
      </div>

      <div className={style.PhotoGallery}>
        {photos.map((photo) => (
          <div key={photo.id} className={style.PhotoItem}>
            <div>
              <img
                className={style.imgStyle}
                src={`http://localhost:3000/${photo.image}`}
                alt={photo.title}
              />
            </div>
            <div>
              <p className="font-league text-4xl text-white tracking-widest mb-3">
                {photo.title}
              </p>
            </div>
            <div>
              <p className="text-white mb-3">{photo.description}</p>
            </div>
            <div>
              <p className="mb-3">
                {photo.categories.map((category) => (
                  <span
                    className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 "
                    key={category.id}
                  >
                    {category.name}{" "}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <button
                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                onClick={() => handleEditClick(photo)}
              >
                Edit
              </button>
              <button
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => handleDeleteClick(photo)}
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditFormVisible && (
        <div className={style.EditFormOverlay}>
          <div className={style.EditForm}>
            <h2 className="font-league text-5xl text-white tracking-widest mb-2">
              Edit Photo
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const editedData = Object.fromEntries(formData.entries());
                handleFormSubmit(editedData);
              }}
            >
              <div className={style.FormInput}>
                <label className="font-league text-2xl text-white tracking-widest">
                  Title
                </label>
                <input
                  className={style.inputStyle}
                  type="text"
                  name="title"
                  defaultValue={editPhoto.title}
                  required
                />
              </div>
              <div className={style.FormInput}>
                <label className="font-league text-2xl text-white tracking-widest">
                  Description
                </label>
                <textarea
                  className={style.inputStyle}
                  name="description"
                  defaultValue={editPhoto.description}
                  required
                ></textarea>
              </div>
              <div className={style.CategoryOrdine}>
                <label className="font-league text-2xl text-white tracking-widest mb-5">
                  Categories
                </label>
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
                    <label
                      className="font-sanchez text-sm text-white ml-2"
                      htmlFor={`category_${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className={style.FormInput}>
                <button
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 mt-5"
                  type="submit"
                >
                  Save
                </button>
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
