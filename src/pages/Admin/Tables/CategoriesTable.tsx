import { useState } from "react";
import useCategories from "../../../services/getAllCategories";
import AddCategory from "../AddCategory";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UseAppSelector } from "../../../app/hooks";
import { onDeleteCategory } from "../../../services/deleteCategory";
import { Alert } from "react-bootstrap";
import EditCategory from "../EditCategort";

const CategoriesTable = () => {
  const navigate = useNavigate();
  const { token } = UseAppSelector((state) => state.auth);
  const { categories, setCategories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const openModal = () => setIsModalOpen(true);
  const openEditModal = (id: string) => {
    setSelectedCategoryId(id);
    setIsEditModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDelete = async (_id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await onDeleteCategory({ _id, token, navigate });
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== _id)
        );
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error deleting the category.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="adminTable">
      <button className="btn btn-primary" onClick={openModal}>
        Add Category
      </button>
      {categories.length > 0 ? (
        <table className="categoryName">
          <thead>
            <tr>
              <th>م</th>
              <th>القسم</th>
              <th>الصورة</th>
              <th>الحركات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <img
                    src={"http://localhost:3000/" + category.image}
                    alt={category.name}
                    width={150}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(String(category._id))}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  &nbsp; &nbsp;
                  <button
                    onClick={() => openEditModal(String(category._id))}
                    className="btn btn-info btn-sm"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Alert variant="warning">No Categories Add, Add New One"</Alert>
      )}

      {isModalOpen && (
        <AddCategory
          setCategories={setCategories}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}

      {isEditModalOpen && selectedCategoryId && (
        <EditCategory
          setCategories={setCategories}
          _id={selectedCategoryId}
          isOpen={isEditModalOpen}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
