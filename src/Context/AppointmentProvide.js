import { collection, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../Firebase/Firebase.config";

export const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
    const [appointment, setAppointment] = useState([])
    const getAppointment = async (email, bv, bs) => {
        const all = [];
        let querySnapshot
        if(email){
          const citiesRef = collection(db, "lichkhambenh");
          const q = query(citiesRef, where("email", "==", email));
          querySnapshot = await getDocs(q);
        }else if (bs){
          const citiesRef = collection(db, "lichkhambenh");
          const q = query(citiesRef, where("doctor", "==", bs));
          querySnapshot = await getDocs(q);
        }else if( bv ) {
          const citiesRef = collection(db, "lichkhambenh");
          const q = query(citiesRef, where("hospital", "==", bv));
          querySnapshot = await getDocs(q);
        }
        querySnapshot.docs.forEach((item) => {
          const row = item.data();
          row.id = item.id;
          all.push(row);
        });
        setAppointment(all)
      }

  const appointmentInfo = { appointment, getAppointment };

  return (
    <AppointmentContext.Provider value={appointmentInfo}>
      {children}
    </AppointmentContext.Provider>
  );
};
export default AppointmentProvider;
