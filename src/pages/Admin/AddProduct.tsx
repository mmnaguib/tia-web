import { useTranslation } from "react-i18next";
import useCategories from "../../services/getAllCategories";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProduct } from "../../interfaces";
import { onSubmitProduct } from "../../services/addProduct";
import { useNavigate } from "react-router-dom";
import { UseAppSelector } from "../../app/hooks";
import InputErrorMessage from "../../components/InputErrorMessage";
import "./admin.scss";
const AddProduct = () => {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const { token } = UseAppSelector((state) => state.auth);

  const addProductSchema = yup.object().shape({
    title: yup.string().required(t("Product Name is required")),
    description: yup.string().required(t("Product Image is required")),
    price: yup.number().required(t("Product price is required")),
    brand: yup.string().required(t("Product brand is required")),
    inStock: yup.number().required(t("Product qunatity is required")),
    colors: yup.string().required(t("Product colors is required")),
    category: yup.string().required(t("Product is required")),
    sizes: yup.string().notRequired().optional(),
    images: yup.mixed().required(t("Product Image is required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(addProductSchema),
  });
  const onSubmit = (data: IProduct) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("inStock", data.inStock.toString());
    formData.append("brand", data.brand);
    formData.append("colors", data.colors[0]);
    formData.append("size", data.sizes?.[0]?.toString() || "");
    formData.append("category", data.category.name);
    if (data.images && data.images[0]) {
      formData.append("images", data.images[0][0]);
    }

    onSubmitProduct({
      data: formData,
      token,
      navigate,
    });
  };
  return (
    <div>
      <h1>{t("AddProduct")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="addProductDiv d-flex justify-content-center flex-wrap">
          <div className="form-group">
            <label className="" htmlFor="productName">
              {t("productName")}
            </label>
            <input
              type="text"
              id="productName"
              className="inputForm"
              {...register("title")}
            />
            {errors.title && <InputErrorMessage msg={errors.title.message} />}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productDescription">
              {t("productDescription")}
            </label>
            <input
              type="text"
              id="productDescription"
              className="inputForm"
              {...register("description")}
            />
            {errors.description && (
              <InputErrorMessage msg={errors.description.message} />
            )}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productPrice">
              {t("productPrice")}
            </label>
            <input
              type="number"
              id="productPrice"
              className="inputForm"
              {...register("price")}
            />
            {errors.price && <InputErrorMessage msg={errors.price.message} />}
          </div>

          <div className="form-group">
            <label className="" htmlFor="productBrand">
              {t("productBrand")}
            </label>
            <input
              type="string"
              id="productBrand"
              className="inputForm"
              {...register("brand")}
            />

            {errors.brand && <InputErrorMessage msg={errors.brand.message} />}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productInStock">
              {t("productInStock")}
            </label>
            <input
              type="number"
              id="productInStock"
              className="inputForm"
              {...register("inStock")}
            />
            {errors.inStock && (
              <InputErrorMessage msg={errors.inStock.message} />
            )}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productImages">
              {t("productImages")}
            </label>
            <input type="file" id="productImages" {...register("images")} />

            {errors.images && <InputErrorMessage msg={errors.images.message} />}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productColors">
              {t("productColors")}
            </label>
            <input
              type="text"
              id="productColors"
              className="inputForm"
              {...register("colors")}
            />
            {errors.colors && <InputErrorMessage msg={errors.colors.message} />}
          </div>
          <div className="form-group">
            <label className="" htmlFor="productSizes">
              {t("productSizes")}
            </label>
            <input
              type="text"
              id="productSizes"
              className="inputForm"
              {...register("sizes")}
            />
            {errors.sizes && <InputErrorMessage msg={errors.sizes.message} />}
          </div>
          <div className="form-group">
            <label className="" htmlFor="category">
              {t("category")}
            </label>
            <select className="inputForm" {...register("category")}>
              {categories.map((category) => (
                <option>{category.name}</option>
              ))}
            </select>
            {errors.category?.name && (
              <InputErrorMessage msg={errors.category.name.message} />
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
