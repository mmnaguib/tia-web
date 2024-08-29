import { useState, useEffect } from "react";
import Axiosinstance from "../config/axiosInstanse";
import { IUser } from "../interfaces";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await Axiosinstance.get<IUser[]>("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { users, setUsers };
};

export default useUsers;
