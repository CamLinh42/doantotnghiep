import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const HospitalContext = createContext();

const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState([]);
  const getHospital = async (name) => {
    let querySnapshot;
    const all = [];

    if (name) {
      const q = query(collection(db, "benhvien"), orderBy("name"), startAt(name));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(collection(db, "benhvien"));
    }
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setHospital(all);
  };

  const hospitalInfo = { hospital, getHospital };

  return (
    <HospitalContext.Provider value={hospitalInfo}>
      {children}
    </HospitalContext.Provider>
  );
};
export default HospitalProvider;
