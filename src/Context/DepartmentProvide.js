import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
    const [department, setDepartment] = useState([])
    const getDepartment = async () => {
        const all = [];
        const querySnapshot = await getDocs(collection(db, "phongkhoa"));
        querySnapshot.docs.forEach((item) => {
          const row = item.data();
          row.id = item.id;
          all.push(row);
        });
        setDepartment(all)
      }

  const departmentInfo = { department, getDepartment };

  return (
    <DepartmentContext.Provider value={departmentInfo}>
      {children}
    </DepartmentContext.Provider>
  );
};
export default DepartmentProvider;
