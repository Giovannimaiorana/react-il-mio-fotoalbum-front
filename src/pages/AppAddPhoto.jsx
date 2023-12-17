import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/module/AppAddPhoto.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AppAddPhoto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    categories: [],
    published: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, categories: [...prevData.categories, value] };
      } else {
        return {
          ...prevData,
          categories: prevData.categories.filter((cat) => cat !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("published", formData.published);
    formData.categories.forEach((category) =>
      formDataToSubmit.append("categories", category)
    );

    try {
      await axios.post("http://localhost:3000/photo", formDataToSubmit);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  return (
    <div className={style.GeneralContainerAddPhoto}>
      <div class={style.ContainerHeader}>
        <Link to="/dashboard">
          <p className="font-league text-4xl text-white">Indietro</p>
        </Link>{" "}
        <div className={style.containerTitleDashboard}>
          <p className="font-sanchez text-sm">ADMIN</p>
          <p className="font-league text-5xl tracking-widest">DASHBOARD</p>
        </div>
      </div>

      <div className={style.formContainer}>
        <form className={style.formStyle} onSubmit={handleSubmit}>
          <div className={style.ContainerInput}>
            <label className="font-league text-3xl text-white tracking-widest">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className={style.InputStyle}
            />
          </div>
          <div className={style.ContainerInput}>
            <label className="font-league text-3xl text-white tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              className={style.InputStyle}
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className={style.ContainerInput}>
            <label className="font-league text-3xl text-white tracking-widest">
              Image
            </label>
            <input
              className={style.InputStyle}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className={style.ContainerInput}>
            <label className="font-league text-3xl text-white tracking-widest mb-3">
              Categories
            </label>
            {categories.map((category) => (
              <div className={style.CategoryOrdine} key={category.id}>
                <input
                  type="checkbox"
                  name={`category_${category.id}`}
                  value={category.id}
                  checked={formData.categories.includes(category.id.toString())}
                  onChange={handleCategoryChange}
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
          <div className={style.ContainerPublished}>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
            />
            <label className="font-league text-3xl text-white tracking-widest mb-3 ml-5">
              Published
            </label>
          </div>
          <div>
            <button
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              type="submit"
            >
              Add Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
