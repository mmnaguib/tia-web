import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProduct } from "../../interfaces";
import { onSubmitProduct } from "../../services/addProduct";
import { useNavigate } from "react-router-dom";
import { UseAppSelector } from "../../app/hooks";
import InputErrorMessage from "../../components/InputErrorMessage";
import "./admin.scss";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { colors, sizes } from "../../data";
import useCategories from "../../services/getAllCategories";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = UseAppSelector((state) => state.auth);
  const { categories } = useCategories();

  const addProductSchema = yup.object().shape({
    title: yup.string().required(t("Product Name is required")),
    description: yup.string().required(t("Product Image is required")),
    price: yup.number().required(t("Product price is required")),
    brand: yup.string().required(t("Product brand is required")),
    inStock: yup.number().required(t("Product quantity is required")),
    colors: yup
      .array()
      .of(yup.string())
      .required(t("Product colors are required")),
    category: yup.string().required(t("Product category is required")),
    sizes: yup.array().of(yup.string()).optional(),
    images: yup.mixed().required(t("Product Image is required")),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(addProductSchema),
    defaultValues: {
      colors: [], // Default to empty array
      sizes: [], // Default to empty array
      category: "", // Default to empty string
    },
  });

  const onSubmit = (data: IProduct) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("inStock", data.inStock.toString());
    formData.append("brand", data.brand);
    formData.append("colors", data.colors.join(","));
    formData.append("sizes", data.sizes ? data.sizes.join(",") : "");
    formData.append("category", data.category);
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }
    onSubmitProduct({
      data: formData,
      token,
      navigate,
    });

    Swal.fire("Added!", "Your category has been added.", "success");
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
            <input
              type="file"
              id="productImages"
              {...register("images")}
              multiple
            />

            {errors.images && <InputErrorMessage msg={errors.images.message} />}
          </div>

          <div className="form-group">
            <label htmlFor="productColors">{t("productColors")}</label>
            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="productColors"
                  options={colors}
                  isMulti
                  onChange={(selectedOptions) =>
                    field.onChange(
                      (
                        (selectedOptions as Array<{
                          value: string;
                          label: string;
                        }>) || []
                      ).map((option) => option.value)
                    )
                  }
                  value={colors.filter((option) =>
                    field.value.includes(option.value)
                  )}
                />
              )}
            />
            {errors.colors && <InputErrorMessage msg={errors.colors.message} />}
          </div>

          <div className="form-group">
            <label htmlFor="productSizes">{t("productSizes")}</label>
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <Select
                  id="productSizes"
                  options={sizes}
                  isMulti
                  onChange={(selectedOptions) =>
                    field.onChange(
                      (
                        (selectedOptions as Array<{
                          value: string;
                          label: string;
                        }>) || []
                      ).map((option) => option.value)
                    )
                  }
                  value={sizes.filter((option) =>
                    field.value
                      ? (field.value as string[]).includes(option.value)
                      : false
                  )}
                />
              )}
            />
            {errors.sizes && <InputErrorMessage msg={errors.sizes.message} />}
          </div>

          <div className="form-group">
            <label htmlFor="category">{t("category")}</label>
            <select className="productCategory" {...register("category")}>
              <option defaultValue={"select"} disabled>
                select ...
              </option>
              {categories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <InputErrorMessage msg={errors.category.message} />
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
