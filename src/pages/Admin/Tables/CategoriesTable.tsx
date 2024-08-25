import { Link } from "react-router-dom";

const CategoriesTable = () => {
  return (
    <div>
      <Link to="add-category">Add Category</Link>
      <table>
        <thead>
          <tr>
            <th>3</th>
            <th>2</th>
            <th>1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
