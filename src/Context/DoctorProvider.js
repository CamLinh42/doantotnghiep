import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState([]);
  const getDoctor = async (bv) => {
    const all = [];
    let querySnapshot;
    if (bv) {
      const citiesRef = collection(db, "bacsi");
      const q = query(citiesRef, where("hospital", "==", bv));
      querySnapshot = await getDocs(q);
      console.log(querySnapshot, "querySnapshot");
    } else {
      querySnapshot = await getDocs(collection(db, "bacsi"));
    }
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setDoctor(all);
  };

  const getDoctorByHospital = async (bv) => {
    const allData = [];
    let querySnapshot;
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("hospital", "==", bv));
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      allData.push(doc.data());
    });
    setDoctor(allData);
  };

  const doctorInfo = { doctor, getDoctor, getDoctorByHospital };

  return (
    <DoctorContext.Provider value={doctorInfo}>
      {children}
    </DoctorContext.Provider>
  );
};
export default DoctorProvider;
