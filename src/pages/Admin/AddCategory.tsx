import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { ICategory } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { UseAppSelector } from "../../app/hooks";
import Modal from "../../components/Modal/Modal";
import { onSubmitCategory } from "../../services/addCategory";
import InputErrorMessage from "../../components/InputErrorMessage";
import Swal from "sweetalert2";

interface AddCategoryProps {
  isOpen: boolean;
  closeModal: () => void;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const AddCategory = ({
  isOpen,
  closeModal,
  setCategories,
}: AddCategoryProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = UseAppSelector((state) => state.auth);

  const addCategorySchema = yup.object().shape({
    name: yup.string().required(t("Category Name is required")),
    image: yup.mixed().required(t("Category Image is required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(addCategorySchema),
  });

  const onSubmit = async (data: ICategory) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    await onSubmitCategory({
      data: formData,
      token,
      navigate,
      closeModal,
    });

    // Update the categories state
    setCategories((prevCategories) => [
      ...prevCategories,
      { ...data, _id: new Date().toISOString() }, // Example: adding new category
    ]);

    Swal.fire("Added!", "Your category has been added.", "success");
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
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
        <br />
        <button type="submit" className="col-md-12 btn btn-primary">
          {t("add")}
        </button>
      </form>
    </Modal>
  );
};

export default AddCategory;
