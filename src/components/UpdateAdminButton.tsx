import { useState } from "react";
import Axiosinstance from "../config/axiosInstanse";

interface makeAdmin {
  userId: number | string;
  currentIsAdmin: boolean;
}
const UpdateAdminButton = ({ userId, currentIsAdmin }: makeAdmin) => {
  const [isAdmin, setIsAdmin] = useState(currentIsAdmin);
  const [loading, setLoading] = useState(false);

  const handleToggleAdmin = async () => {
    setLoading(true);
    try {
      // Update the user's isAdmin status
      await Axiosinstance.put(
        `/users/${userId}/admin`,
        { isAdmin: !isAdmin },
        {
          headers: { token: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsAdmin(!isAdmin);
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

  return (
    <button onClick={handleToggleAdmin} disabled={loading}>
      {isAdmin ? "Revoke" : "Make"}
    </button>
  );
};

export default UpdateAdminButton;
