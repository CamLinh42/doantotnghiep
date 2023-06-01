import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState([])
    const getDoctor = async (bv) => {
      const all = [];
      let querySnapshot
      if(bv){
        const citiesRef = collection(db, "bacsi");
        const q = query(citiesRef, where("hospital", "==", bv));
        querySnapshot = await getDocs(q);
        console.log(querySnapshot, "querySnapshot")
      } else {
        querySnapshot = await getDocs(collection(db, "bacsi"));
      }
        querySnapshot.docs.forEach((item) => {
          const row = item.data();
          row.id = item.id;
          all.push(row);
        });
        setDoctor(all)
      }

  const doctorInfo = { doctor, getDoctor };

  return (
    <DoctorContext.Provider value={doctorInfo}>
      {children}
    </DoctorContext.Provider>
  );
};
export default DoctorProvider;
