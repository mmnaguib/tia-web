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
  const { categories } = useCategories(); // Ensure this hook is working and returning categories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openEditModal = () => setIsEditModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleDelete = async (id: string) => {
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
        await onDeleteCategory({ id, token, navigate });
        window.location.reload();
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
                    onClick={() => openEditModal()}
                    className="btn btn-info  btn-sm"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  {isEditModalOpen && (
                    <EditCategory
                      _id={String(category._id)}
                      isOpen={isEditModalOpen}
                      closeEditModal={closeEditModal}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Alert variant="warning">No Categories Add, Add New One"</Alert>
      )}

      {isModalOpen && (
        <AddCategory isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default CategoriesTable;
