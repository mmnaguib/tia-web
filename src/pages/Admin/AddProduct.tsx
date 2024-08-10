import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("AddProduct")}</h1>
      <form>
        <div className="form-group">
          <label htmlFor="productName">{t("productName")}</label>
          <input type="text" id="productName" className="inputForm" />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">{t("productDescription")}</label>
          <input type="text" id="productDescription" className="inputForm" />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">{t("productPrice")}</label>
          <input type="number" id="productPrice" className="inputForm" />
        </div>
        <div className="form-group">
          <label htmlFor="productBrand">{t("productBrand")}</label>
          <input type="string" id="productBrand" className="inputForm" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
