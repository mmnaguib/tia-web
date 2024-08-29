import UpdateAdminButton from "../../../components/UpdateAdminButton";
import useUsers from "../../../services/getAllUsers";

const UsersTable = () => {
  const { users } = useUsers();
  return (
    <div className="adminTable">
      <table className="productName">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الصورة</th>
            <th>الصلاحية</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.firstname + user.lastname}</td>
              <td>
                <img src={"http://localhost:3000/" + user.image} />
              </td>
              <td>
                <UpdateAdminButton
                  userId={user._id}
                  currentIsAdmin={user.isAdmin}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
