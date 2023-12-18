import React, { useState, useEffect } from "react";
import style from "../css/module/AppDashboard.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AppDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [editPhoto, setEditPhoto] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noImagesMessage, setNoImagesMessage] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/photo?title=${searchTerm}`
        );

        if (response.data.length === 0) {
          setPhotos([]);
          setNoImagesMessage("Nessuna immagine con questo titolo");
        } else {
          setPhotos(response.data);
          setNoImagesMessage("");
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
    fetchCategory();
  }, [searchTerm]);

  const fetchCategory = async () => {
    try {
      const responseCategories = await axios.get(
        "http://localhost:3000/category"
      );
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
      setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photo.id));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setEditPhoto((prevEditPhoto) => ({
      ...prevEditPhoto,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (editedData) => {
    try {
      const publishedValue = editedData.published ? true : false;
      console.log(editedData);

      await axios.put(
        `http://localhost:3000/photo/${editPhoto.slug}`,
        { ...editedData, published: publishedValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
        <div>
          <input
            type="text"
            placeholder="Inserisci il Titolo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.SearchImg}
          />
        </div>
        <div className={style.containerTitleDashboard}>
          <p className="font-sanchez text-sm">ADMIN</p>
          <p className="font-league text-5xl tracking-widest">DASHBOARD</p>
        </div>
      </div>

      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <div className={style.PhotoGallery}>
          {photos.length > 0 ? (
            photos.map((photo) => (
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
                    className={style.ButtonSubmit}
                    onClick={() => handleEditClick(photo)}
                  >
                    Edit
                  </button>
                  <button
                    className={style.ButtonSubmit}
                    onClick={() => handleDeleteClick(photo)}
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="ml-5 text-3xl tracking-widest text-white">
              {noImagesMessage}
            </p>
          )}
        </div>
      )}

      {isEditFormVisible && (
        <div className={style.EditFormOverlay}>
          <div className={style.EditForm}>
            <h2 className="font-league text-5xl text-white tracking-widest mb-2">
              Edit Photo
            </h2>
            <form
              onSubmit={(e) => {
                console.log(editPhoto);
                e.preventDefault();
                if (editPhoto) {
                  handleFormSubmit(editPhoto);
                }
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
                  value={editPhoto.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
                  value={editPhoto.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
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
                      onChange={(e) =>
                        handleInputChange(
                          "categories",
                          e.target.checked
                            ? [...editPhoto.categories, category]
                            : editPhoto.categories.filter(
                                (cat) => cat.id !== category.id
                              )
                        )
                      }
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
                <label className="font-league text-2xl text-white tracking-widest">
                  Published
                </label>
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  defaultChecked={editPhoto.published}
                  onChange={(e) =>
                    handleInputChange("published", e.target.checked)
                  }
                />
              </div>

              <div className={style.FormInput}>
                <button className={style.ButtonSubmit} type="submit">
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
};

export default AppDashboard;
