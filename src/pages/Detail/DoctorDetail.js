import { useContext, useEffect } from "react";
import { HospitalContext } from "../../Context/HospitalProvider";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorProvider";

export default function DoctorDetail() {
  const { getHospitalByName, hospitalByName } = useContext(HospitalContext);
  const { doctor, getDoctorByHospital } = useContext(DoctorContext);
  const { phongkham } = useParams();
  return <div></div>;
}
