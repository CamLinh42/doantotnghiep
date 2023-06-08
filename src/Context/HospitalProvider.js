import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const HospitalContext = createContext();

const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState([]);
  const [hospitalByName, setHospitalByName] = useState([]);
  const getHospital = async (name) => {
    let querySnapshot;
    const all = [];

    if (name) {
      const q = query(collection(db, "phongkham"), orderBy("name"), startAt(name));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(collection(db, "phongkham"));
    }
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setHospital(all);
  };
  const getHospitalByName = async (name) => {
    const allData = [];
    const q = query(collection(db, "phongkham"), where("name", "==", name));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      allData.push(doc.data());
    });
    setHospitalByName(allData);
  };

  const hospitalInfo = {
    hospital,
    getHospital,
    hospitalByName,
    getHospitalByName,
  };

  return (
    <HospitalContext.Provider value={hospitalInfo}>
      {children}
    </HospitalContext.Provider>
  );
};
export default HospitalProvider;
