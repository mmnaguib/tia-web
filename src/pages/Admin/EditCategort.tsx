import { useTranslation } from "react-i18next";
import InputErrorMessage from "../../components/InputErrorMessage";
import { useNavigate } from "react-router-dom";
import { UseAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { ICategory } from "../../interfaces";
import Axiosinstance from "../../config/axiosInstanse";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onEditCategory } from "../../services/editCategory";
import Modal from "../../components/Modal/Modal";
import * as yup from "yup";

interface EditCategoryProps {
  isOpen: boolean;
  closeEditModal: () => void;
  _id: string;
}

const EditCategory = ({ isOpen, closeEditModal, _id }: EditCategoryProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = UseAppSelector((state) => state.auth);
  const [category, setCategory] = useState<ICategory>();

  const editCategorySchema = yup.object().shape({
    name: yup.string().required(t("Category Name is required")),
    image: yup.mixed().required(t("Category Image is required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICategory>({
    resolver: yupResolver(editCategorySchema),
  });

  const fetchData = async () => {
    try {
      const response = await Axiosinstance.get(`/categories/${_id}`);
      setCategory(response.data);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  useEffect(() => {
    if (isOpen && _id) {
      fetchData();
    }
  }, [isOpen, _id]);

  useEffect(() => {
    if (category) {
      // Set values directly
      setValue("name", category.name);
      // Use `setValue` with care for file inputs
      // setValue("image", category.image);
    }
  }, [category, setValue]);

  const onSubmit = async (data: ICategory) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await onEditCategory({
        data: formData,
        token,
        navigate,
        closeEditModal,
        _id,
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeEditModal}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12 form-group">
          <label className="col-md-12" htmlFor="name">
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            className="inputForm col-md-12"
            {...register("name")}
          />
          {errors.name && <InputErrorMessage msg={errors.name.message} />}
        </div>
        <br />
        <div className="col-md-12 form-group">
          <label className="col-md-12" htmlFor="image">
            {t("categoryImage")}
          </label>
          <input
            type="file"
            id="image"
            className="col-md-12"
            {...register("image")}
          />
          {errors.image && <InputErrorMessage msg={errors.image.message} />}
        </div>
        {category?.image && (
          <img src={`http://localhost:3000/` + category.image} width={150} />
        )}
        <br />
        <button type="submit" className="col-md-12 btn btn-primary">
          {t("Edit")}
        </button>
      </form>
    </Modal>
  );
};

export default EditCategory;
